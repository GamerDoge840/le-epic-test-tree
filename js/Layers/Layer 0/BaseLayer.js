addLayer("BaseLayer", {
    name: "BaseLayer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "𐒴", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e8c375",
    nodeStyle() {
        return {
            'border': '4px solid #ffe497',
            //'background-image': 'radial-gradient(circle at center,rgb(133, 149, 149),rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Kai cenat skibi toilet",
    baseResource: "Your mother", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Replicanti<br>――――――――――――<br> <font size='2'><span style='color:#e8c375'> " +format(player.points)+" Replicanti</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
    },
doReset(resettingLayer) {
    if (layers[resettingLayer].row <= this.row) return;
    let keptUpgrades = []
    let keptMilestones = []
    layerDataReset(this.layer);
    player[this.layer].upgrades.push(...keptUpgrades)
    player[this.layer].milestones.push(...keptMilestones)
},
milestones: {
},
    upgrades: {
        rows: 9,
        cols: 9,
        11: {    
            title: "R1",
            fullDisplay() {return `<font size="3"><b>Replicator I</span></b><font size="2"><br>Start producing Replicanti and boost it based on itself.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Replicanti`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.points.plus(1).log(2).pow(0.15).plus(1);
                eff=eff.times(buyableEffect('BaseLayer', 11))
                if (hasUpgrade('BaseLayer', 21)) eff = eff.times(upgradeEffect('BaseLayer', 21))
                if (player.Stardust.total.gte('1'))
                    eff = eff.times(tmp.Stardust.effect);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Replicator I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#e8c375',
                    "width": "400px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b8b9b6' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ccff82',
                'background-color': '#ccff82',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "R2",
            fullDisplay() {return `<font size="3"><b>Replicator II</span></b><font size="2"><br>Boosts R1 based on Replicanti.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Replicanti`},        
            cost: new Decimal(10),
            effect() {
                let eff = player.points.plus(1).log(2).pow(0.15).plus(1);
                eff=eff.times(buyableEffect('BaseLayer', 12))
                if (hasUpgrade('BaseLayer', 31)) eff = eff.times(upgradeEffect('BaseLayer', 31))
                if (player.Stardust.total.gte('1'))
                    eff = eff.times(tmp.Stardust.effect);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("BaseLayer", 11) },
            tooltip() {return "<span style='color:#ffffff'>Replicator II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#e8c375',
                    "width": "400px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b8b9b6' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ccff82',
                'background-color': '#ccff82',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "R3",
            fullDisplay() {return `<font size="3"><b>Replicator III</span></b><font size="2"><br>Boosts R2 based on Replicanti.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Replicanti`},        
            cost: new Decimal(60),
            effect() {
                let eff = player.points.plus(1).log(2).pow(0.25).plus(1);
                eff=eff.times(buyableEffect('BaseLayer', 13))
                if (hasUpgrade('BaseLayer', 41)) eff = eff.times(upgradeEffect('BaseLayer', 41))
                if (player.Stardust.total.gte('1'))
                    eff = eff.times(tmp.Stardust.effect);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("BaseLayer", 21) },
            tooltip() {return "<span style='color:#ffffff'>Replicator III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#e8c375',
                    "width": "400px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b8b9b6' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ccff82',
                'background-color': '#ccff82',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        41: {    
            title: "R4",
            fullDisplay() {return `<font size="3"><b>Replicator IV</span></b><font size="2"><br>Boosts R3 based on Replicanti.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Replicanti`},        
            cost: new Decimal(750),
            effect() {
                let eff = player.points.plus(1).log(2).pow(0.30).plus(1);
                eff=eff.times(buyableEffect('BaseLayer', 21))
                if (player.Stardust.total.gte('1'))
                    eff = eff.times(tmp.Stardust.effect);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("BaseLayer", 31) },
            tooltip() {return "<span style='color:#ffffff'>Replicator IV</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#e8c375',
                    "width": "400px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b8b9b6' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ccff82',
                'background-color': '#ccff82',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b>R1 Booster</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Replicator 1</b>`},
            cost(x) {
                let base = new Decimal(1.300);
                let cost = base.pow(x).times(0.750);
                return cost;
              },
              effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.10).add(1);
                eff=eff.times(buyableEffect('BaseLayer', 101))
                return eff
            },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R1 Booster</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts Replicator 1 by a flat 10%."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.750).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 11))) setBuyableAmount('BaseLayer', 11, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 11) }
    
        },
        12: {
            display() {return `<font size="3"><b>R2 Booster</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Replicator 2</b>`},
            cost(x) {
                let base = new Decimal(1.350);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.10).add(1);
                eff=eff.times(buyableEffect('BaseLayer', 102))
                return eff
            },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R2 Booster</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts Replicator 2 by a flat 10%."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(5).log(1.350) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 12))) setBuyableAmount('BaseLayer', 12, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 21) }
    
        },
        
        13: {
            display() {return `<font size="3"><b>R3 Booster</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Replicator 3</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(25);
                return cost;
              },
              effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.10).add(1);
                return eff
            },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R3 Booster</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts Replicator 3 by a flat 10%."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(25).log(1.400) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 13))) setBuyableAmount('BaseLayer', 13, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 31) }
    
        },
        21: {
            display() {return `<font size="3"><b>R4 Booster</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Replicator 4</b>`},
            cost(x) {
                let base = new Decimal(1.500);
                let cost = base.pow(x).times(500);
                return cost;
              },
              effect(x) {
                let eff = getBuyableAmount(this.layer, this.id).mul(0.10).add(1);
                return eff
            },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R4 Booster</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts Replicator 4 by a flat 10%."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(500).log(1.500) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 21))) setBuyableAmount('BaseLayer', 21, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 41) }
    
        },
        101: {
            display() {return `<font size="3"><b>R1 Accelerator</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to R1 Booster</b>`},
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(250);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('BaseLayer', 101).pow_base(1.30)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R1 Accelerator</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts the effect of R1 Booster by 1.30x compounding."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(250).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 101))) setBuyableAmount('BaseLayer', 101, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 31) }
    
        },
        102: {
            display() {return `<font size="3"><b>R2 Accelerator</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Replicanti</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to R2 Booster</b>`},
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(5000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('BaseLayer', 102).pow_base(1.30)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip() {return "<span style='color:#ffffff'>R2 Accelerator</span><br>――――――――――――<br><span style='font-size:14px'><span style='color:#7d837c'>With every purchase, boosts the effect of R2 Booster by 1.30x compounding."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(5000).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BaseLayer', 102))) setBuyableAmount('BaseLayer', 102, max.add(1).floor())
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#e8c375', 'color':'black','border-color':'silver'}}
                else return {'background-color':'#e8c375', 'color':'black','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("BaseLayer", 41) }
    
        },
    },
     tabFormat: [
     "blank",
                ["display-text",
                    function() {return ''+format(player.points)+' Replicanti'},
                    {"color": "#e8c375", "font-size": "30px"}],
                        ["raw-html", function() {if (hasUpgrade("BaseLayer", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Replicanti/s)"}, {"color": "#9d9d9d", "font-size": "32px"}],      
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("BaseLayer", 41) && !player.points.gte('25000') && !player.Stardust.total.gte('1')) return "Unlock something new at 25,000 Replicanti..."}, {"font-size": "15px"}],                  
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                        ["microtabs", "ReplicantiTabs"]
     ],
     microtabs: {
        ReplicantiTabs: {
            "Replicators": {
                content: [
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 11], ]], ["row", [ ["upgrade", 21], ]], ["row", [ ["upgrade", 31], ]], ["row", [ ["upgrade", 41], ]]]
                ]

                ],
            },
            
            "Boosters": {
                content: [
                    "blank",
                    ["column", [ ["row", [ ["buyable", 11], ["buyable", 12], ["buyable", 13], ]]]],
                    ["column", [ ["row", [ ["buyable", 21], ]]]],
                    ["raw-html", function() {if (hasUpgrade("BaseLayer", 31)) return "―――――――――――――――"}, {"color": "#9d9d9d", "font-size": "32px"}],    
                    ["column", [ ["row", [ ["buyable", 101], ["buyable", 102],]]]],        


                ],
                unlocked() {return hasUpgrade("BaseLayer", 11) }

            },
        }
    },
})