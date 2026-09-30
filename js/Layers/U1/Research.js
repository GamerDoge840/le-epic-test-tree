addLayer("r", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return player.r.researchResetAmount.gte('1') || (hasUpgrade('p', 25))},
		research: new Decimal(0),
        researchToGet: new Decimal(0),
        researchResetAmount: new Decimal(0),
    }},
    color: "#CAE1E3",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    branches: ["p"],
    tooltip() {
        let tooltip = "<font size='3'>Research<br>――――――――――――――<br> <font size='2'><span style='color:#E5FDFF'> " +formatWhole(player.r.research)+" Research</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.r.researchResetAmount.gte('1') || (hasUpgrade('p', 25))},
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    update(delta) {
        let onepersec = new Decimal(1)
        
        //Base Research Gain
        player.r.researchToGet = player.points.div(10000).pow(0.4)
        //Buyables
        //player.Money.moneyToGet = player.Money.moneyToGet.mul(buyableEffect("Money", 3))
    },
    researchReset()
    {
     player.points = new Decimal(0)
          
    for (let i in player.p.buyables) {
         player.p.buyables[i] = new Decimal(0)
    }
    
    for (let i in player.p.upgrades) {
         player.p.upgrades[i] = new Decimal(0)
    }

    },
    milestones: {
    },
    upgrades: {        
    },
    buyables: {
         1: {
            display() {return `<font size="2"><b>[R01] Begin Researching</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Boosts Point gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Research`}, 
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("r", 1).mul(1).add(1)
                return eff
            },     
            getAmount(){
                let amnt = getBuyableAmount(this.layer, this.id)
                return amnt
            },
            canAfford() { if (player.r.research.gte(this.cost())) {return true}},
            buy() {
                player.r.research = player.r.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1)
                return cap
            },
            buyMax() {
                let max = player.r.research.div(this.cost(0)).add(1).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('r', 1))) setBuyableAmount('r', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Begin Researching</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase boosts point gain by 100%."},
            style() {
                if (tmp.r.buyables[this.layer, this.id].getAmount.gte(tmp.r.buyables[this.layer, this.id].purchaseLimit)) {  
                    return{            
                    'background-color': '#649190',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
                else if(!this.canAfford()){return {
                'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

               else if(this.canAfford()){return {
                'background-color': '#A1FFFD',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00',}}
            },
            unlocked() {return player.r.researchResetAmount.gte('1')},
    
        },
        2: {
            display() {return `<font size="2"><b>[R02] First-Three Research</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Boosts P01, P02 and P03 by ` +format(tmp[this.layer].buyables[this.id].effect) + `x.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Research`}, 
            cost(x) {
                let base = new Decimal(5);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("r", 2).mul(2).add(1)
                return eff
            },     
            getAmount(){
                let amnt = getBuyableAmount(this.layer, this.id)
                return amnt
            },
            canAfford() { if (player.r.research.gte(this.cost())) {return true}},
            buy() {
                player.r.research = player.r.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(3)
                return cap
            },
            buyMax() {
                let max = player.r.research.div(this.cost(0)).add(1).log(5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('r', 2))) setBuyableAmount('r', 2, max.add(1).floor())
            },
            branches: [1],
            tooltip() {return "<span style='color:#ffffff'>First-Three Research</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase boosts the first three point upgrades by 200%."},
            style() {
                if (tmp.r.buyables[this.layer, this.id].getAmount.gte(tmp.r.buyables[this.layer, this.id].purchaseLimit)) {  
                    return{            
                    'background-color': '#649190',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
                else if(!this.canAfford()){return {
                'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

               else if(this.canAfford()){return {
                'background-color': '#A1FFFD',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00',}}
            },
            unlocked() {return getBuyableAmount("r", 1).gte(1)},
    
        },
        3: {
            display() {return `<font size="2"><b>[R03] Point-Adder Research</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Add +` +format(tmp[this.layer].buyables[this.id].effect) + ` to Point gain.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Research`}, 
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("r", 3).div(2)
                return eff
            },     
            getAmount(){
                let amnt = getBuyableAmount(this.layer, this.id)
                return amnt
            },
            canAfford() { if (player.r.research.gte(this.cost())) {return true}},
            buy() {
                player.r.research = player.r.research.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.r.research.div(this.cost(0)).add(1).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('r', 3))) setBuyableAmount('r', 3, max.add(1).floor())
            },
            branches: [1],
            tooltip() {return "<span style='color:#ffffff'>Point-Adder Research</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase adds 0.5 to Point gain."},
            style() {
                if (tmp.r.buyables[this.layer, this.id].getAmount.gte(tmp.r.buyables[this.layer, this.id].purchaseLimit)) {  
                    return{            
                    'background-color': '#649190',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
                else if(!this.canAfford()){return {
                'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

               else if(this.canAfford()){return {
                'background-color': '#A1FFFD',
                    "width": "155px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00',}}
            },
            unlocked() {return getBuyableAmount("r", 1).gte(1)},
    
        },
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Research your Points.<br><font size='4'>(Requires 10,000 Points)" },
            canClick() { return player.r.researchToGet.gte(1) && player.points.gte(10000)},
            unlocked() { return (hasUpgrade('p', 25))},
            onClick() {
                layers.r.researchReset()
                player.r.research = player.r.research.add(player.r.researchToGet)
                player.r.researchResetAmount = player.r.researchResetAmount.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
    },
     tabFormat: {
        "Research": {
        style() {return  {'background-color': '#151C1C'}},
        content: [
        ["display-text",
            function() {return ''+format(player.r.research)+' Research'},
            {"color": "#E5FDFF", "font-size": "30px"}],
            ["raw-html", function() {if (player.points.gte(10000)) return "(+" + format(player.r.researchToGet) + ")"}, {"color": "#E5FDFF", "font-size": "20px"}],
            //["raw-html", function() {if (getBuyableAmount("Gold", 5).gte(1) && player.points.gte(250)) return "(+" + format(player.Money.moneyToGet.mul(buyableEffect("Gold", 5))) + "$/s)"}, {"color": "#1B9E2A", "font-size": "20px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],
                    ["row", [["clickable", 1]]],                    
                    ["raw-html", function() {if (!hasUpgrade("p", 25)) return "(You need P25 to do a Research reset)"}, {"color": "#FFFFFF", "font-size": "20px"}],
                   ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],
                           ["microtabs", "ResearchTabs"],

                ]
            
        },
    },
        microtabs: {
            ResearchTabs: {
                "Info": {
                    content: [
                        ["display-text",
                    function() {return "――――――Layer 1 Reset――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],
                    ["display-text",
                    function() {return "Research resets Points, Point Upgrades and Point Buyables in exchange for Research, used to buy new upgrades which will allow you to get back to where you were faster than before."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],                        
                    ]
                },
                "Researches": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],  
                        ["column", [ ["row", [ ["buyable", 2],]]]],
                    "blank",
                    ["column", [ ["row", [ ["buyable", 1],]]]],
                    "blank",
                    ["column", [ ["row", [ ["buyable", 3],]]]],
                     ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#E5FDFF", "font-size": "32px"}],   
                    ]
                },
            }
        },
})