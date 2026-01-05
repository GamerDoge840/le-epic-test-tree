addLayer("Beans", {
    name: "Beans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🫘", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#F59527",
    nodeStyle() {
        return {
            "background": "linear-gradient(50deg, #C19A6B, #F59527)",
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Beans", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    branches: ["Charge"],
    autoUpgrade() {return hasUpgrade('Beans', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Beans<br>――――――――――――――<br> <font size='2'><span style='color:#F59527'> " +formatWhole(player.points)+" Beans</span>"
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
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Beans', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {  
        1: {
            title: "Better Soil",
            fullDisplay() {return `<font size="2"><b>Better Soil</b><font size="1"><br>Farm Plots are 25% stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return getBuyableAmount("Beans", 1).gte(1) },
            cost: new Decimal(0.150),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        2: {
            title: "Rich Soil",
            fullDisplay() {return `<font size="2"><b>Rich Soil</b><font size="1"><br>Farm Plots are 25% stronger, again.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return hasUpgrade("Beans", 1) },
            cost: new Decimal(0.700),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        3: {
            title: "Bigger Plots",
            fullDisplay() {return `<font size="2"><b>Bigger Plots</b><font size="1"><br>Farm Plots are 25% stronger, yet again.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return hasUpgrade("Beans", 2) },
            cost: new Decimal(5),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },             
        11: {
            title: "Hoes",
            fullDisplay() {return `<font size="2"><b>Hoes</b><font size="1"><br>Farm Tools are 30% stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return getBuyableAmount("Beans", 2).gte(1) },
            cost: new Decimal(1),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },  
        12: {
            title: "Shovels",
            fullDisplay() {return `<font size="2"><b>Shovels</b><font size="1"><br>Farm Tools are 40% stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return hasUpgrade("Beans", 11) },
            cost: new Decimal(10),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },     
        21: {
            title: "Neighborly Help",
            fullDisplay() {return `<font size="2"><b>Neighborly Help</b><font size="1"><br>Farmhands are 40% stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Beans`},        
            unlocked() { return getBuyableAmount("Beans", 3).gte(1) },
            cost: new Decimal(15),
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#F59527',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "115px",
            "height": "115px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#C19A6B',
                'color': 'black',
                        "width": "115px",
            "height": "115px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },       
    },
    challenges: {

    },
    buyables: {
        1: {
            display() {return `<font size="3"><b>`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+` Farm Plots</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(0.0250);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Beans', 1).mul(1.00).plus(1)
                if (hasUpgrade('Beans', 1)) eff = eff.times(1.25)
                if (hasUpgrade('Beans', 2)) eff = eff.times(1.25)
                if (hasUpgrade('Beans', 3)) eff = eff.times(1.25)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e50)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0250).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 1))) setBuyableAmount('Beans', 1, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
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
            unlocked() {return true},
    
        },
        2: {
            display() {return `<font size="3"><b>`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+` Farm Tools</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(2.25);
                let cost = base.pow(x).times(0.1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Beans', 2).mul(0.25).plus(1)
                if (hasUpgrade('Beans', 11)) eff = eff.times(1.30)
                if (hasUpgrade('Beans', 12)) eff = eff.times(1.40)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e50)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.1).log(2.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 1))) setBuyableAmount('Beans', 1, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
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
            unlocked() {return getBuyableAmount("Beans", 1).gte(5)},
    
        },
        3: {
            display() {return `<font size="3"><b>`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+` Farmhands</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(3.25);
                let cost = base.pow(x).times(0.5);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Beans', 3).mul(0.50).plus(1)
                if (hasUpgrade('Beans', 21)) eff = eff.times(1.40)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e50)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.5).log(3.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 1))) setBuyableAmount('Beans', 1, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
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
            unlocked() {return getBuyableAmount("Beans", 1).gte(8)},
    
        },
    },
    clickables: {
          },
     tabFormat: {
        "Beans": {
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Beans'},
            {"color": "#F59527", "font-size": "30px"}],
            ["display-text",
            function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Beans/s)"},
            {"color": "#FFFFFF", "font-size": "30px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#F59527", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "BeanTabs"],

                ]
            
        },
    },
        microtabs: {
            BeanTabs: {
                "Buildings": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 3],]]]],
                        "blank",
                        ["raw-html", function() {if (getBuyableAmount("Beans", 1).gte(3) && !getBuyableAmount("Beans", 1).gte(5)  ) return 'Unlock the next Bean Building at 5 Farm Plots'}, {"color": "#FFFFFF", "font-size": "16px"}],
                        ["raw-html", function() {if (getBuyableAmount("Beans", 1).gte(5) && !getBuyableAmount("Beans", 1).gte(8)  ) return 'Unlock the next Bean Building at 8 Farm Plots'}, {"color": "#FFFFFF", "font-size": "16px"}],
                        "blank",
                    ]
                },
                "Upgrades": {
                     unlocked() { return getBuyableAmount("Beans", 1).gte(1) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 1], ["upgrade", 2], ["upgrade", 3],]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12]]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 21]]]]],
                        "blank",

                    ]
                },
            }
        },
})