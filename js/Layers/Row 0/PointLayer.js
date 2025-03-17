addLayer("PointLayer", {
    name: "PointLayer", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-image': 'radial-gradient(circle at center, #31aeb0,rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Kai cenat skibi toilet",
    baseResource: "Your mother", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Points<br>――――――――――――<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Points</span>"
        if(player.Prestige.total.gte(1)) tooltip = tooltip + "<br><span style='color:#31aeb0'>"+formatWhole(player.Prestige.points)+" Fragments</font>"
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
    automate() {
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
        rows: 9,
        cols: 9,
        11: {    
            title: "Point Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P11] Point Generator</span></b><font size="2"><br>Buy this to start producing Points.<br>――――――――――――――――――<br>Currently: `+format(getPointGen()) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Point`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Point Generator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            title: "Point Doubler",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P12] Point Doubler</span></b><font size="2"><br>Doubles point gain. Wow.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.0250),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(2.00)
                if (hasUpgrade('PointLayer', 32)) effect = effect.times(upgradeEffect('PointLayer', 21))
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 11)},
            tooltip() {return "<span style='color:#ffffff'>Point Doubler</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            title: "Point Tripler",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P13] Point Tripler</span></b><font size="2"><br>Triples point gain. Wow!<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.0650),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(3.00)
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 12)},
            tooltip() {return "<span style='color:#ffffff'>Point Tripler</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Point Half-Doubler",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P14] Point Half-Doubler</span></b><font size="2"><br>Boosts point gain by 1.50x. Wow?<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.250),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(1.50)
                if (hasUpgrade('PointLayer', 33)) effect = effect.times(upgradeEffect('PointLayer', 23))
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 13)},
            tooltip() {return "<span style='color:#ffffff'>Point Half-Doubler</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Point Quarter-Doubler",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P21] Point Quarter-Doubler</span></b><font size="2"><br>Boosts point gain by 1.25x. Wow...<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.350),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(1.25)
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 14)},
            tooltip() {return "<span style='color:#ffffff'>Point Quarter-Doubler</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Why can't it be a full double instead???"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "A Double and a Half",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P22] A Double and a Half</span></b><font size="2"><br>Boosts point gain by 2.50x. Wow.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.650),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(2.50)
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 21)},
            tooltip() {return "<span style='color:#ffffff'>A Double and a Half</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Almost a Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P23] Almost a Double</span></b><font size="2"><br>Boosts point gain by 1.75x. Wow.....<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1.5),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(1.75)
                if (hasUpgrade('PointLayer', 34)) effect = effect.times(upgradeEffect('PointLayer', 24))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 22)},
            tooltip() {return "<span style='color:#ffffff'>Almost a Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            title: "A Tenth of a Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P24] A Tenth of a Double</span></b><font size="2"><br>Boosts point gain by 1.10x. Ugh.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(3),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(1.10)
                if (hasUpgrade('PointLayer', 41)) effect = effect.times(upgradeEffect('PointLayer', 41))
                if (hasUpgrade('PointLayer', 42)) effect = effect.times(upgradeEffect('PointLayer', 42))
                return effect
              },  
            unlocked() {return hasUpgrade("PointLayer", 23)},
            tooltip() {return "<span style='color:#ffffff'>A Tenth of a Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>When are things going to get interesting?"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "Point Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P31] Point Recursion</span></b><font size="2"><br>Points boost their own gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(4),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log10().pow(0.9).plus(1);
                if (hasUpgrade('PointLayer', 43)) eff = eff.times(upgradeEffect('PointLayer', 43))
                return eff;
            }, 
            unlocked() {return hasUpgrade("PointLayer", 24)},
            tooltip() {return "<span style='color:#ffffff'>Point Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Finally, something more."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {    
            title: "A Friendly Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P32] A Friendly Boost</span></b><font size="2"><br>P21 boosts the effect of P12.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(6.25),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 31)},
            tooltip() {return "<span style='color:#ffffff'>A Friendly Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>The upgrades are now upgrading each other."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {    
            title: "Another Friendly Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P33] Another Friendly Boost</span></b><font size="2"><br>P23 boosts the effect of P14.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(8.5),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 32)},
            tooltip() {return "<span style='color:#ffffff'>Another Friendly Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        34: {    
            title: "The Friendliest Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P34] The Friendliest Boost</span></b><font size="2"><br>P24 boosts the effect of all upgrades before it, and unlock a repeatable upgrade.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(30),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 33)},
            tooltip() {return "<span style='color:#ffffff'>The Friendliest Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        41: {    
            title: "Point-Powered Upgrades",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P41] Point-Powered Upgrades</span></b><font size="2"><br>Boost P24 based on points.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(125),
            effect() {
                let eff = player.points.plus(5).log(5).pow(0.07);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 34)},
            tooltip() {return "<span style='color:#ffffff'>Point-Powered Upgrades</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        42: {    
            title: "Recursively-Powered Upgrades",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P42] Recursively-Powered Upgrades</span></b><font size="2"><br>P31 boosts P24 at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(400),
            effect() {
                let eff = upgradeEffect("PointLayer", 31).plus(1).pow(0.04);
                return eff;
            },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 41)},
            tooltip() {return "<span style='color:#ffffff'>Recursively-Powered Upgrades</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        43: {    
            title: "Recursively-Powered Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P43] Recursively-Powered Recursion</span></b><font size="2"><br>P31 boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(900),
            effect() {
                let eff = upgradeEffect("PointLayer", 31).plus(1).pow(0.05);
                return eff;
            },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 42)},
            tooltip() {return "<span style='color:#ffffff'>Recursively-Powered Upgrades</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Now this is really interesting..."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        44: {    
            title: "Meta-Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#7c7c7c'>[P44] Meta-Upgrade</span></b><font size="2"><br>Boost Point gain based on Point Upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1500),
            effect() {
                let eff = Decimal.pow(1.05, player.PointLayer.upgrades.length);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 43)},
            tooltip() {return "<span style='color:#ffffff'>Meta-Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ededed',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ededed' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "250px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        1001: {    
            title: "Prestige Unlocker",
            fullDisplay() {return `<font size="3"><b><span style='color: black'>[P-U] Prestige Unlocker</span></b><font size="2"><br>Unlocks Prestige, the first reset layer.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1000),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("PointLayer", 44)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Unlocker</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Already?"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "750px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#31aeb0' ,
                    "width": "400px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "400px",
            "height": "300px",
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
            display() {return `<font size="3"><b><b><span style='color:#9d9d9d'>[P11-B] A Point Buyable</span></b></b><font size="2"><br>Increases Points gain by 10% with every purchase.<br>――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Points</b> <br>――――――――――――――――――<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.650);
                let cost = base.pow(x).times(1.00);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('PointLayer', 11).mul(0.10).plus(1)
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
            tooltip() {return "<span style='color:#ffffff'>A Point Buyable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>You can buy it more than once? Incredible!"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(1.00).log(1.650) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('PointLayer', 11))) setBuyableAmount('PointLayer', 11, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#ededed',
                    "width": "325px",
            "height": "175px",
            //"background-image": 'url("resources/glorygradient.png")',        
                    //'background-position': 'center center',
                     //'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("PointLayer", 34) },
    
        },
    },
     tabFormat: {
        "Points": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text",
                    function() {return ''+format(player.points)+' Points'},
                    {"font-size": "30px"}],
                    ["raw-html", function() {if (hasUpgrade("PointLayer", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Points/s)"}],            
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                            ["upgrades", [1, 2, 3, 4, 5, 6, 7]],
                            "blank",
                            ["upgrades", [100]],
                            "blank",                            ["display-text",
                                function() {return "―――――――――――――――――――――――――――――"},
                                {"color": "#9d9d9d", "font-size": "32px"}],
                                "buyables",
                                ["display-text",
                                    function() {return "―――――――――――――――――――――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "32px"}],
                                    ["raw-html", function() {if (hasUpgrade("PointLayer", 34)) return "("+format(player.points)+ " Points)"}, {"font-size": "20px"}],            

                    
            ]
            
        },
        "Prestige": {
            //style() {return  {'background': '#292929'}},
            //style() {
                //return {
                    //"background-image": "linear-gradient(to top,rgb(33, 33, 36),rgb(63, 59, 73))",
                    //"background-size": "cover"
                //};
           // },
            unlocked() {return hasUpgrade('PointLayer', 1001) || player.Prestige.total.gte(1)},
            buttonStyle: {"border-color": "#31aeb0"},
            embedLayer: 'Prestige',
        },
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