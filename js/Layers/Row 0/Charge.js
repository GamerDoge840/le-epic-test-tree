addLayer("Charge", {
    name: "Charge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fcffc5",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("500"), // Can be a function that takes requirement increases into account
    resource: "Charge", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Charge your Energy.<br>――――――――――――――――<br>",
    baseResource: "Energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Energy<br>――――――――――――――<br> <font size='2'><span style='color:#fcffc5'> " +formatWhole(player.points)+" Energy</span>"
        if(player.Charge.total.gte(1)) tooltip = tooltip + "<br><span style='color:#fff888'>"+formatWhole(player.Charge.points)+" Charge</font>"
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
    //bars: {
        //stonebar: {
            //direction: RIGHT,
            //width: 600,
            //height: 50,
            //instant: true,
            //progress() {return new Decimal(tmp.StoneBlocks.baseAmount).dividedBy(getNextAt(this.layer, true))},
           // baseStyle: { 'background-color': 'black' },
            //fillStyle: { 'background-color': '#a4deff' },
       // },
//},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Vacuumic Extraction",
            fullDisplay() {return `<font size="3"><b>[E11] Vacuumic Extraction</b><font size="2"><br>Start generating Energy from nothing.<br>――――――――――――――――――<br>Currently: `+format(getPointGen()) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Vacuumic Extraction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            title: "Energy Booster",
            fullDisplay() {return `<font size="3"><b>[E12] Energy Booster</span><font size="2"><br>Increases Energy gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(0.0200),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(2.00)
                if (hasUpgrade('Charge', 21)) effect = effect.times(upgradeEffect('Charge', 21))
                if (hasUpgrade('Charge', 23)) effect = effect.times(upgradeEffect('Charge', 23))
                return effect
              },  
            unlocked() {return hasUpgrade("Charge", 11)},
            tooltip() {return "<span style='color:#ffffff'>Energy Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            title: "Self-Powered Energy",
            fullDisplay() {return `<font size="3"><b>[E13] Self-Powered Energy</span><font size="2"><br>Doubles Energy gain, and it boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(0.0750),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Charge", 12)},
            tooltip() {return "<span style='color:#ffffff'>Self-Powered Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Energetic Potential",
            fullDisplay() {return `<font size="3"><b>[E14] Energetic Potential</span><font size="2"><br>Boosts Energy gain based on upgrades bought in this layer.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(0.225),
            currencyInternalName: "points",
            effect() {
                let eff = Decimal.pow(1.15, player.Charge.upgrades.length);
                return eff;
            },
            unlocked() {return hasUpgrade("Charge", 13)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Potential</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Energy Accelerator",
            fullDisplay() {return `<font size="3"><b>[E21] Energy Accelerator</span><font size="2"><br>Boosts E12's effect based on Energy.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(0.55),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log10().pow(0.80).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Charge", 14)},
            tooltip() {return "<span style='color:#ffffff'>Energy Accelerator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "Energetic Broadening",
            fullDisplay() {return `<font size="3"><b>[E22] Energetic Broadening</span><font size="2"><br>Boosts Energy gain by 1.5x and unlock an Energy buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(1.15),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Charge", 21)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Broadening</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Energetic Synergism",
            fullDisplay() {return `<font size="3"><b>[E23] Energetic Synergism</span><font size="2"><br>E13 boosts E12 at a slightly reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(4),
            effect() {
                let eff = upgradeEffect('Charge', 13).pow(0.25);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Charge", 22)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            title: "Accumulator Improver",
            fullDisplay() {return `<font size="3"><b>[E24] Accumulator Improver</span><font size="2"><br>Boosts Energy gain and E11-B's effect by 1.25x each.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(40), 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Charge", 23)},
            tooltip() {return "<span style='color:#ffffff'>Accumulator Improver</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "Energetic Charge",
            fullDisplay() {return `<font size="3"><b>[E31] Energetic Charge</span><font size="2"><br>Boosts Energy gain by 1.25x again, and unlocks Charge.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(100), 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Charge", 24)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "180px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "180px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "180px",
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
            display() {return `<font size="3"><b>[E11-B] Energy Accumulator</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Energy</b>`},
            cost(x) {
                let base = new Decimal(1.385);
                let cost = base.pow(x).times(0.200);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Charge', 11).mul(0.10).plus(1)
                if (getBuyableAmount("Charge", 11).gte(10)) eff = eff.times(2)
                if (getBuyableAmount("Charge", 11).gte(20)) eff = eff.times(2)
                if (getBuyableAmount("Charge", 11).gte(30)) eff = eff.times(2)
                if (getBuyableAmount("Charge", 11).gte(40)) eff = eff.times(2)
                if (getBuyableAmount("Charge", 11).gte(50)) eff = eff.times(2)
                if (hasUpgrade('Charge', 24)) eff = eff.times(1.25)
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
                let max = player.points.div(this.cost(0)).add(0.200).log(1.385) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('BeanOil', 11))) setBuyableAmount('BeanOil', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Energy Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain by 10%. Every ten purchases, this effect doubles."},
            style() {
                if(!this.canAfford()){return {'background-color':'#fcffc5', 'color':'black','border': '5px solid','border-color':'#E7E7C7'}}
                else return {'background-color':'#fcffc5', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Charge", 22)},
    
        },
    },
    tabFormat: [
        "blank",
        ["display-text",
            function() {return ''+format(player.points)+' Energy'},
            {"color": "#fcffc5", "font-size": "30px"}],
            ["display-text",
                function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Energy/s)"},
                {"color": "#fcffc5", "font-size": "32px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#fcffc5", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "ChargeTabs"]
        ],
        microtabs: {
            ChargeTabs: {
                "Upgrades": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],]]]],
                        ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],]]]],
                        ["column", [ ["row", [ ["upgrade", 31],]]]],
                        "blank",
                    ]
                },
                "Buyables": {
                    unlocked() {return hasUpgrade("Charge", 22)},
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["buyable", 11],]]]],
                        "blank",
                    ]
                },
                "Charge": {
                    content: [
                        "blank",
                        ["display-text",
                            function() {return ''+format(player.Charge.points)+' Charge'},
                            {"color": "#fff888", "font-size": "35px"}],
                            ["display-text",
                                function() {return '――――――――――――――――'},
                                {"color": "#fff888", "font-size": "30px"}],
                        "prestige-button",
                        ["display-text",
                            function() {return '――――――――――――――――'},
                            {"color": "#fff888", "font-size": "30px"}],
                        "blank",
                    ],
                    buttonStyle: {"border-color": "#fff888"},
                    unlocked() {return hasUpgrade("Charge", 31) }
                },
            }
        },
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})