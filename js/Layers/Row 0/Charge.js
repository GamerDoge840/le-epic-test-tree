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
            'background-image': 'radial-gradient(circle at center, #fcffc5, #fff888',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("500"), // Can be a function that takes requirement increases into account
    resource: "Charge", // Name of prestige currency
    autoUpgrade() {return hasUpgrade('ColorCharge', 14)},
    resetDescription: "Charge your Energy.<br>――――――――――――――――<br>",
    baseResource: "Energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Energy<br>――――――――――――――<br> <font size='2'><span style='color:#fcffc5'> " +formatWhole(player.points)+" Energy</span>"
        if(player.Charge.total.gte(1)) tooltip = tooltip + "<br><span style='color:#fff888'>"+formatWhole(player.Charge.points)+" Charge</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Charge', 103)) mult = mult.times(upgradeEffect('Charge', 103))
        if (hasUpgrade('Charge', 104) && player.points.gte('500')) mult = mult.times(upgradeEffect('Charge', 104))
        mult=mult.times(buyableEffect('Charge', 12))
        if (hasUpgrade('Charge', 111)) mult = mult.times(upgradeEffect('Charge', 111))
        if (hasUpgrade('Charge', 112)) mult = mult.times(upgradeEffect('Charge', 112))
        if (hasUpgrade('Quarks', 11)) mult = mult.times(1.25)
        if (hasUpgrade('Quarks', 13)) mult = mult.times(upgradeEffect('Quarks', 13))
        mult=mult.times(buyableEffect('Charge', 21))
        if (hasUpgrade('Quarks', 31)) mult = mult.times(1.45)
        mult=mult.times(buyableEffect('Quarks', 21))
        if (hasUpgrade('Quarks', 32)) mult = mult.times(upgradeEffect('Quarks', 32))
        if (hasUpgrade('ColorCharge', 11)) mult = mult.times(upgradeEffect('ColorCharge', 11))
        if (hasUpgrade('ColorCharge', 12)) mult = mult.times(3)
        if (hasUpgrade('ColorCharge', 22)) mult = mult.times(upgradeEffect('ColorCharge', 22))
        if (hasUpgrade('ColorCharge', 32)) mult = mult.times(upgradeEffect('ColorCharge', 32))
        if (hasUpgrade('RedQuarks', 11)) mult = mult.times(3)
        if (hasUpgrade('RedQuarks', 21)) mult = mult.times(upgradeEffect('RedQuarks', 21))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    automate() {
        if(hasUpgrade('Quarks', 22)) buyMaxBuyable('Charge', 12)
        if(hasUpgrade('Quarks', 33)) buyMaxBuyable('Charge', 11)
        if(hasUpgrade('ColorCharge', 12)) buyMaxBuyable('Charge', 21)
    },
    passiveGeneration() {
        if (hasUpgrade('Charge', 113)) return 1
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
        if (hasUpgrade('ColorCharge', 14) && hasUpgrade('Charge', 113) ) keptUpgrades.push(113)
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
                if (hasUpgrade('Quarks', 53)) effect = effect.times(upgradeEffect('Quarks', 53))
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
                if (hasUpgrade('Charge', 32)) eff = eff.times(upgradeEffect('Charge', 32))
                if (hasUpgrade('Charge', 114)) eff = eff.times(upgradeEffect('Charge', 114))
                if (hasUpgrade('Quarks', 54)) eff = eff.times(3)
                if (hasUpgrade('RedQuarks', 23)) eff = eff.times(upgradeEffect('RedQuarks', 23))
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
                if (hasUpgrade('Quarks', 21)) eff = eff.times(upgradeEffect('Quarks', 21))
                if (hasUpgrade('ColorCharge', 33)) eff = eff.times(upgradeEffect('ColorCharge', 33))
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
                if (hasUpgrade('RedQuarks', 22)) eff = eff.times(4)
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
            cost: new Decimal(35), 
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
        
        32: {    
            title: "Energetic Recursion",
            fullDisplay() {return `<font size="3"><b>[E32] Energetic Recursion</span><font size="2"><br>Boost E13 based on it's own effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            cost: new Decimal(1e9),
            effect() {
                let eff = upgradeEffect('Charge', 13).pow(0.10);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Charge", 31) && hasUpgrade("Quarks", 24)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
    33: {    
        title: "Energetic Broadening II",
        fullDisplay() {return `<font size="3"><b>[E33] Energetic Broadening II</span><font size="2"><br>Unlock a Charge buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
        cost: new Decimal(3.5e9),
        currencyInternalName: "points",
        unlocked() {return hasUpgrade("Charge", 32)},
        tooltip() {return "<span style='color:#ffffff'>Energetic Broadening II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
34: {    
    title: "Quarks Bonus",
    fullDisplay() {return `<font size="3"><b>[E34] Quarks Bonus</span><font size="2"><br>Double Quarks gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
    cost: new Decimal(1.5e10),
    currencyInternalName: "points",
    unlocked() {return hasUpgrade("Charge", 33)},
    tooltip() {return "<span style='color:#ffffff'>Quarks Bonus</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        101: {    
            title: "Charged Energy",
            fullDisplay() {return `<font size="3"><b>[C11] Charged Energy</span><font size="2"><br>Boost Energy gain by 1.30x and current amount of Charge boosts Energy gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(1), 
            effect() {
                let eff = player.Charge.points.plus(2).pow(0.2);
                return eff;
            },
            unlocked() {return player.Charge.total.gte('1')},
            tooltip() {return "<span style='color:#ffffff'>Charged Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        102: {    
            title: "Recharged Energy",
            fullDisplay() {return `<font size="3"><b>[C12] Recharged Energy</span><font size="2"><br>Boost Energy gain based on total amount of Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(3), 
            effect() {
                let eff = player.Charge.total.plus(1).log(8).pow(0.55).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Charge", 101)},
            tooltip() {return "<span style='color:#ffffff'>Recharged Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        103: {    
            title: "Charged Charge",
            fullDisplay() {return `<font size="3"><b>[C13] Charged Charge</span><font size="2"><br>Charge boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(8), 
            effect() {
                let eff = player.Charge.points.plus(1).log10().pow(1.10).plus(1.25);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Charge", 102)},
            tooltip() {return "<span style='color:#ffffff'>Charged Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        104: {    
            title: "Energy Charge",
            fullDisplay() {return `<font size="3"><b>[C14] Energy Charge</span><font size="2"><br>Energy boosts Charge and unlock a new buyable.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(40), 
            effect() {
                let eff = player.points.plus(1).log10().pow(0.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Charge", 103)},
            tooltip() {return "<span style='color:#ffffff'>Energy Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        111: {    
            title: "Advanced Accumulators",
            fullDisplay() {return `<font size="3"><b>[C21] Advanced Accumulators</span><font size="2"><br>E11-B boosts Charge at a heavily reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(200), 
            effect() {
                let eff = buyableEffect('Charge', 11).pow(0.15).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Charge", 104)},
            tooltip() {return "<span style='color:#ffffff'>Advanced Accumulators</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        112: {    
            title: "Charged Potential",
            fullDisplay() {return `<font size="3"><b>[C22] Charged Potential</span><font size="2"><br>E14 boosts Charge at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(2500), 
            effect() {
                let eff = upgradeEffect('Charge', 14).pow(0.30);
                return eff;
            },
            unlocked() {return hasUpgrade("Charge", 111)},
            tooltip() {return "<span style='color:#ffffff'>Charged Potential</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        113: {    
            title: "Automatic Charge",
            fullDisplay() {return `<font size="3"><b>[C23] Automatic Charge</span><font size="2"><br>Passively generate 100% of Charge gain on reset per second.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(12500), 
            unlocked() {return hasUpgrade("Charge", 112)},
            tooltip() {return "<span style='color:#ffffff'>Automatic Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        114: {    
            title: "Charge-Energy Synergism",
            fullDisplay() {return `<font size="3"><b>[C24] Charge-Energy Synergism</span><font size="2"><br>Boosts E13 based on Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Charge`},        
            cost: new Decimal(3e10), 
            effect() {
                let eff = player.Charge.points.plus(1).log(8).pow(0.17);
                return eff;
            },
            unlocked() {return hasUpgrade("Quarks", 34) && hasUpgrade("Charge", 113)},
            tooltip() {return "<span style='color:#ffffff'>Charge-Energy Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fff888',
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
        1011: {    
            title: "Universal Fundamentals",
            fullDisplay() {return `<font size="3"><b>Universal Fundamentals</b><font size="2"><br>Unlocks Quarks.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Energy)+` Energy and `+format(tmp[this.layer].upgrades[this.id].costs.Charge)+` Charge`},        
            costs: {
                Charge: 1.5e6,
                Energy: 5e6,
              },
              canAfford() {
                return player.points.gte(this.costs.Energy)
                    && player.Charge.points.gte(this.costs.Charge)
              },
              pay() {
                player.points = player.points.minus(this.costs.Energy);
                player.Charge.points = player.Charge.points.minus(this.costs.Charge);
              },
            unlocked() {return hasUpgrade("Charge", 113)},
            tooltip() {return "<span style='color:#ffffff'>Universal Fundamentals</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f2dfff' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': '#f7ebff',
                'box-shadow':'0px 0px 15px #f7ebff'
                //'background': 'linear-gradient(#fcf4e1, #ffcd7a)',

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#f2dfff' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#8eff00',
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        1012: {    
            title: "Universal Energetics",
            fullDisplay() {return `<font size="3"><b>Universal Energetics</b><font size="2"><br>Unlocks Color Charge.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Energy)+` Energy and `+format(tmp[this.layer].upgrades[this.id].costs.Charge)+` Charge`},        
            costs: {
                Charge: 1e11,
                Energy: 4e12,
              },
              canAfford() {
                return player.points.gte(this.costs.Energy)
                    && player.Charge.points.gte(this.costs.Charge)
              },
              pay() {
                player.points = player.points.minus(this.costs.Energy);
                player.Charge.points = player.Charge.points.minus(this.costs.Charge);
              },
            unlocked() {return hasUpgrade("Charge", 114)},
            tooltip() {return "<span style='color:#ffffff'>Universal Energetics</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>It's called a tree, not a twig."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "width": "200px",
            "height": "165px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#fff888' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': '#f7ebff',
                'box-shadow':'0px 0px 15px #fcffc5'

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#fcffc5' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#f7ebff',
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
            display() {return `<font size="3"><b>[E11-B] Energy Accumulator</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Energy</b>`},
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
                if (hasUpgrade('RedQuarks', 12)) cap = cap.times(10)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.200).log(1.385) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Charge', 11))) setBuyableAmount('Charge', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Energy Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain by 10%. Every ten purchases until 50, this effect doubles."},
            style() {
                if(!this.canAfford()){return {'background-color':'#fcffc5', 'color':'black','border': '5px solid','border-color':'#E7E7C7'}}
                else return {'background-color':'#fcffc5', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Charge", 22)},
    
        },
        12: {
            display() {return `<font size="3"><b>[E12-B] Charge Accumulator</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Charge</b>`},
            cost(x) {
                let base = new Decimal(1.485);
                let cost = base.pow(x).times(5000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Charge', 12).mul(0.10).plus(1)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                if (hasUpgrade('RedQuarks', 12)) cap = cap.times(10)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(5000).log(1.485) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Charge', 12))) setBuyableAmount('Charge', 12, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Charge Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Charge by 10% every purchase."},
            style() {
                if(!this.canAfford()){return {'background-color':'#fcffc5', 'color':'black','border': '5px solid','border-color':'#E7E7C7'}}
                else return {'background-color':'#fcffc5', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Charge", 104)},
    
        },
        21: {
            display() {return `<font size="3"><b>[E21-B] Dynamic Booster</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Charge</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Energy and Charge</b>`},
            cost(x) {
                let base = new Decimal(2.5);
                let cost = base.pow(x).times(1e6);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Charge', 21).mul(0.15).plus(1)
                return eff
            },   
            canAfford() { if (player.Charge.points.gte(this.cost())) {return true}},
            buy() {
                player.Charge.points = player.Charge.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Charge.points.div(this.cost(0)).add(1e6).log(2.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Charge', 21))) setBuyableAmount('Charge', 21, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Dynamic Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy and Charge by 15% every purchase."},
            style() {
                if(!this.canAfford()){return {'background-color':'#fff888', 'color':'black','border': '5px solid','border-color':'#E7E7C7'}}
                else return {'background-color':'#fff888', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Charge", 33)},
    
        },
    },
    tabFormat: [
        "blank",
        ["display-text",
            function() {return ''+format(player.points)+' Energy'},
            {"color": "#fcffc5", "font-size": "30px"}],
            ["display-text",
                function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Energy/s)"},
                {"font-size": "32px"}],
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
                        ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],]]]],
                        "blank",
                    ]
                },
                "Buyables": {
                    unlocked() {return hasUpgrade("Charge", 22)},
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["buyable", 11], ["buyable", 12],]]]],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Charge", 33)) return "――――――――――――――――"}, {"color": "#fff888", "font-size": "30px"}],                  
                        "blank",
                        ["column", [ ["row", [ ["buyable", 21],]]]],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Charge", 33)) return "―――――――"}, {"color": "#fff888", "font-size": "30px"}],                  
                        ["raw-html", function() {if (hasUpgrade("Charge", 33)) return ''+formatWhole(player.Charge.points)+' Charge'}, {"color": "#fff888", "font-size": "17px"}],
                        "blank",

                    ]
                },
                "Charge": {
                    content: [
                        "blank",
                        ["display-text",
                            function() {return ''+format(player.Charge.points)+' Charge'},
                            {"color": "#fff888", "font-size": "35px"}],
                            ["raw-html", function() {if (hasUpgrade("Charge", 113)) return "<font size='4'>(+" + (format(getResetGain("Charge"))) + " Charge/s)"}],
                            ["raw-html", function() {if (!hasUpgrade("Charge", 113)) return "――――――――――――――――"}, {"color": "#fff888", "font-size": "30px"}],                  
                            function() {if (!hasUpgrade("Charge", 113)) return "prestige-button"},
                        ["display-text",
                            function() {return '――――――――――――――――'},
                            {"color": "#fff888", "font-size": "30px"}],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 101], ["upgrade", 102], ["upgrade", 103], ["upgrade", 104],]]]],
                        ["column", [ ["row", [ ["upgrade", 111], ["upgrade", 112], ["upgrade", 113], ["upgrade", 114],]]]],
                        "blank",
                        "blank",
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 1011]]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 1012]]]]],
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