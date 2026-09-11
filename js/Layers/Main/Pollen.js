addLayer("p", {
    name: "Pollen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("0.1"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    autoPrestige: true,
    canBuyMax: true,
    resetDescription: "Reset Essence, but gain Prestige.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>White Pollen<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFFF'> " +formatWhole(player.p.points)+" White Pollen</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        //Buyables
        mult = mult.dividedBy(buyableEffect('p', 3))
        mult = mult.dividedBy(buyableEffect('h', 2))

        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp 
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    automate() {
        if(hasMilestone('h', 4)) buyMaxBuyable('p', 1)
        if(hasMilestone('h', 6)) buyMaxBuyable('p', 2)
        if(hasMilestone('h', 9)) buyMaxBuyable('p', 3)
    },
gpBoost() {
        //Effect Base
         let eff = player.p.points.div(90).add(1)
         
        //Buyables
        eff = eff.times(buyableEffect('p', 5))

         return eff
    },
     bars: {
        pollenbar: {
            unlocked() { return true},
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {
                return player.points.div(tmp.p.nextAt)
            },
            display() {
                return "<h5>" + format(player.points) + "/" + format(tmp.p.nextAt) + "<h5> GP to next White Pollen</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#87919C' },
       },
    },
    milestones: {
    },
    upgrades: { 
    },
    buyables: {
          1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Allium</b>
                <font size="2">Which boost GP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` GP</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(0.100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 1).mul(1.00).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 1))) setBuyableAmount('p', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Allium</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Gathering Power gain by 100% every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return true},
    
        },
        2: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>White Roses</b>
                <font size="2">Which boost Honey gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` GP</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(0.500);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 2).mul(0.35).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.500).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 2))) setBuyableAmount('p', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>White Roses</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Honey gain by 35% every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 1))},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Angelonia</b>
                <font size="2">Which divide White Pollen requirement by /` +format(tmp[this.layer].buyables[this.id].effect) + `</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` GP</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(0.3);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 3).mul(0.35).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.3).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 3))) setBuyableAmount('p', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Angelonia</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase divides White Pollen's GP requirement by 35%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 2))},
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Camellia</b>
                <font size="2">Which multiply GP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` GP</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(1.5);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 4).mul(0.15).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(1.5).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 4))) setBuyableAmount('p', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Camellia</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts GP gain by 15%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 5))},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Angel's Trumpets</b>
                <font size="2">Which boost the first White Pollen effect by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` GP</b><br><b>`},
            cost(x) {
                let base = new Decimal(3);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 5).mul(0.10).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(5).log(3) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 5))) setBuyableAmount('p', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Angel's Trumpets</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts White Pollen's GP boost by 10%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "130px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 10))},
    
        },
    },
     tabFormat: {
        "Pollen": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+formatWhole(player.p.points)+' White Pollen'},
            {"color": "#FFFFFF", "font-size": "30px"}],
                    ["raw-html", function() {if (getBuyableAmount("h", 3).gte(1)) return "Boosting <span style='color:#949494'>GP</span> by <span style='color:#949494'> "+ format(tmp.p.gpBoost) +"x</span>"}, {"font-size": "17px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["display-text",
            function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Gathering Power/s)"},
            {"color": "#949494", "font-size": "30px"}],
                    ["bar", "pollenbar"],
                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "PollenTabs"],

                ]
            
        },
    },
        microtabs: {
            PollenTabs: {
                "White Flowers": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})