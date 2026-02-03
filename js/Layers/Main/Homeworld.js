addLayer("Homeworld", {
    name: "Homeworld", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌎", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(50deg, #8CC4FF, #8CFF99)",
            'border': '2px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Homeworld<br>――――――――――――――<br> <font size='2'></span>"
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
    layerShown(){return (hasUpgrade("Research", 2))},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
    },
    buyables: {
      1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Hunter-Gatherers</b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Population</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(1);
                return cost;
              },
            effect() {
                let eff = getBuyableAmount('Homeworld', 1).mul(1).plus(1)
                if (hasUpgrade("Workshop", 1)) eff = eff.times(1.05)
                if (hasUpgrade("Workshop", 5)) eff = eff.times(1.20)
                return eff
            },
            effect2() {
                let eff = getBuyableAmount('Homeworld', 1).mul(0.25).plus(1)
                if (hasUpgrade("Workshop", 2)) eff = eff.times(1.25)
                if (hasUpgrade("Workshop", 3)) eff = eff.times(1.25)
                return eff
            },
            effect3() {
                let eff = getBuyableAmount('Homeworld', 1).mul(0.05).plus(1)
                return eff
            },       
            canAfford() { if (player.Population.populationPoints.gte(this.cost())) {return true}},
            buy() {
                player.Population.populationPoints = player.Population.populationPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Population.populationPoints.div(this.cost(0)).add(1).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 1))) setBuyableAmount('Homeworld', 1, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Research', 6)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
                if (hasUpgrade('Research', 6) && !hasUpgrade('Research', 12)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food and Wood gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Food, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x to Wood</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
                if (hasUpgrade('Research', 12)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food, Wood, and Mineral gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Food, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x to Wood, ` +format(tmp[this.layer].buyables[this.id].effect3) + `x to Minerals</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 4))},
    
        },
        100: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Huts</b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Wood</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 100).mul(0.25).plus(1)
                if (hasUpgrade("Research", 9)) eff = eff.times(1.40)
                if (hasUpgrade("Workshop", 4)) eff = eff.times(1.25)
                return eff
            },
            consumption() {
                let eff = getBuyableAmount('Homeworld', 100).mul(0.05).plus(1)
                if (hasUpgrade("Research", 9)) eff = eff.times(1.167)
                if (hasUpgrade("Workshop", 4)) eff = eff.times(1.35)
                return eff
            },
            canAfford() { if (player.Wood.woodPoints.gte(this.cost())) {return true}},
            buy() {
                player.Wood.woodPoints = player.Wood.woodPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Wood.woodPoints.div(this.cost(0)).add(1).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 100))) setBuyableAmount('Homeworld', 100, max.add(1).floor())
            },
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Huts</span><br>――――――――――――<br><span style='font-size:11px'>Each Hut boosts Population gain, but slightly reduces Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Population, /` +format(tmp[this.layer].buyables[this.id].consumption) + ` to Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#A35F00', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#A35F00', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 7))},
        },
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: {
        "Civilization": {
        content: [
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '('+format(player.Population.populationPoints)+' Population)'}, {"color": "#FFF5C7", "font-size": "25px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '(+' + format(player.Population.populationGain.mul(1)) + '/s)'}, {"color": "#FFF5C7", "font-size": "20px"}],
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 2)) return '('+format(player.Food.foodPoints)+' Food)'}, {"color": "#8ED47F", "font-size": "18px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 2)) return "(+" + format(player.Food.foodGain.mul(1)) + "/s)"}, {"color": "#8ED47F", "font-size": "15px"}],
            "blank",
            ["raw-html", function() {if (hasUpgrade('Research', 5)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "18px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 5)) return '(+' + format(player.Wood.woodGain.mul(1)) + '/s)'}, {"color": "#A35F00", "font-size": "15px"}],
        "blank",
        ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "18px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 11)) return '(+' + format(player.Minerals.mineralGain.mul(1)) + '/s)'}, {"color": "#8C8888", "font-size": "15px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "EssenceTabs"],

                ]
            
        },
    },
        microtabs: {
            EssenceTabs: {
                "Buildings": {
                    unlocked() { return hasUpgrade('Research', 7) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        ["column", [ ["row", [ ["buyable", 100],]]]],
                      ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],

                    ]
                },
                "Jobs": {
                    unlocked() { return hasUpgrade('Research', 4) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        ["column", [ ["row", [ ["buyable", 1],]]]],
                      ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ]
                },
            }
        },
})