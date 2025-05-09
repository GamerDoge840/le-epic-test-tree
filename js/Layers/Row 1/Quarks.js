addLayer("Quarks", {
    name: "Quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f7ebff",
    nodeStyle() {
        return {
            'border': '2px solid #f7ebff',
            'background-image': 'radial-gradient(circle at center, #f7ebff, #f9d6ff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1e6"), // Can be a function that takes requirement increases into account
    resource: "Quarks", // Name of prestige currency
    branches: ["Charge"],
    resetDescription: "Create Quarks from Energy.<br>――――――――――――――――<br>",
    baseResource: "Energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Quarks<br>――――――――――――――<br> <font size='2'><span style='color:#f7ebff'> " +formatWhole(player.Quarks.points)+" Quarks</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Quarks', 14)) mult = mult.times(1.15)
        if (hasUpgrade('Charge', 34)) mult = mult.times(2)
        if (hasUpgrade('Quarks', 33)) mult = mult.times(1.60)
        mult=mult.times(buyableEffect('Quarks', 22))
        if (hasUpgrade('ColorCharge', 24)) mult = mult.times(upgradeEffect('ColorCharge', 24))
        if (hasUpgrade('ColorCharge', 32)) mult = mult.times(upgradeEffect('ColorCharge', 32))
        if (hasUpgrade('Quarks', 43)) mult = mult.times(upgradeEffect('Quarks', 43))
        if (hasUpgrade('Quarks', 52)) mult = mult.times(upgradeEffect('Quarks', 52))
        if (hasUpgrade('ColorCharge', 34)) mult = mult.times(upgradeEffect('ColorCharge', 34))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("Charge", 1011) || player.Quarks.total.gte(1)},
    passiveGeneration() {
        if (hasUpgrade('Quarks', 51)) return 1
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
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Quark Era",
            fullDisplay() {return `<font size="3"><b>[Q11] Quark Age Starter</b><font size="2"><br>2.5x to Energy gain, 1.25x to Charge gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1),
            unlocked() {return player.Quarks.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Quark Age Starter</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Quark-Powered Energy",
            fullDisplay() {return `<font size="3"><b>[Q12] Quark-Powered Energy</span><font size="2"><br>Each total Quark made boosts Energy gain by 0.50x.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.Quarks.total.mul(0.50).plus(1);
                return eff.min(5.00);
            }, 
            unlocked() {return hasUpgrade("Quarks", 11)},
            tooltip() {return "<span style='color:#ffffff'>Quark-Powered Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>Effect hardcapped at 5.00x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Quark-Powered Charge",
            fullDisplay() {return `<font size="3"><b>[Q13] Quark-Powered Charge</span><font size="2"><br>Each total Quark made boosts Charge gain by 0.25x.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.Quarks.total.mul(0.25).plus(1);
                return eff.min(2.50);
            }, 
            unlocked() {return hasUpgrade("Quarks", 12)},
            tooltip() {return "<span style='color:#ffffff'>Quark-Powered Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>Effect hardcapped at 2.50x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Early Acceleration",
            fullDisplay() {return `<font size="3"><b>[Q14] Early Acceleration</span><font size="2"><br>Energy gain under a million (1e6) is doubled, and boost Quark gain by 1.15x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("Quarks", 13)},
            tooltip() {return "<span style='color:#ffffff'>Early Acceleration</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Quark Potential",
            fullDisplay() {return `<font size="3"><b>[Q21] Quark Potential</span><font size="2"><br>Boosts E14 based on Quark upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(2),
            effect() {
                let eff = Decimal.pow(1.07, player.Quarks.upgrades.length);
                return eff;
            },
            unlocked() {return hasUpgrade("Quarks", 14)},
            tooltip() {return "<span style='color:#ffffff'>Quark Potential</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Energy Automation I",
            fullDisplay() {return `<font size="3"><b>[Q22] Energy Automation I</span><font size="2"><br>Passively autobuy E12-B without spending Energy.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("Quarks", 21)},
            tooltip() {return "<span style='color:#ffffff'>Energy Automation I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Accumulator Synergism",
            fullDisplay() {return `<font size="3"><b>[Q23] Accumulator Synergism</span><font size="2"><br>E12-B also affects Energy gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("Quarks", 22) && hasUpgrade("Quarks", 23)},
            tooltip() {return "<span style='color:#ffffff'>Accumulator Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Energy Expansion",
            fullDisplay() {return `<font size="3"><b>[Q24] Energy Expansion</span><font size="2"><br>Unlocks new upgrades in the Energy layer.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("Quarks", 21)},
            tooltip() {return "<span style='color:#ffffff'>Energy Expansion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Specialized Quarks",
            fullDisplay() {return `<font size="3"><b>[Q31] Specialized Quarks</span><font size="2"><br>Unlocks two Quark Buyables and boosts Charge and Energy by 1.45x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("Quarks", 24)},
            tooltip() {return "<span style='color:#ffffff'>Specialized Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        32: {    
            title: "Quark Power",
            fullDisplay() {return `<font size="3"><b>[Q32] Quark Power</span><font size="2"><br>Boost Energy and Charge based on total Quarks made.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(11),
            effect() {
                let eff = player.Quarks.total.plus(1).log(8).pow(0.75).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Quarks", 31)},
            tooltip() {return "<span style='color:#ffffff'>Specialized Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Energy Automation II",
            fullDisplay() {return `<font size="3"><b>[Q33] Energy Automation II</span><font size="2"><br>Passively autobuy E11-B without spending Energy and boost Quarks by 1.60x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(15),
            unlocked() {return hasUpgrade("Quarks", 32)},
            tooltip() {return "<span style='color:#ffffff'>Energy Automation II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
            title: "Charge Expansion",
            fullDisplay() {return `<font size="3"><b>[Q34] Charge Expansion</span><font size="2"><br>Unlocks a new Charge upgrade.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Quarks", 33)},
            tooltip() {return "<span style='color:#ffffff'>Charge Expansion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        41: {    
            title: "More Specialized Quarks",
            fullDisplay() {return `<font size="3"><b>[Q41] More Specialized Quarks</span><font size="2"><br>Unlocks two more Quark buyables.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1500),
            unlocked() {return hasUpgrade("Quarks", 34)},
            tooltip() {return "<span style='color:#ffffff'>More Specialized Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        42: {    
            title: "Quark Division",
            fullDisplay() {return `<font size="3"><b>[Q42] Quark Division</span><font size="2"><br>Divide the Color Charge requirement based on total Quarks.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`÷<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(7500),
            effect() {
                let eff = player.Quarks.total.plus(1).log(8).pow(5.70).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Quarks", 41)},
            tooltip() {return "<span style='color:#ffffff'>Quark Division</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        43: {    
            title: "Quark Self-Synergism",
            fullDisplay() {return `<font size="3"><b>[Q43] Quark Self-Synergism</span><font size="2"><br>Quarks boost themselves.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(100000),
            effect() {
                let eff = player.Quarks.points.plus(1).log10().pow(0.25).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Quarks", 42)},
            tooltip() {return "<span style='color:#ffffff'>Quark Self-Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        44: {    
            title: "Energetic Color Charge II",
            fullDisplay() {return `<font size="3"><b>[Q44] Energetic Color Charge II</span><font size="2"><br>Energy divides the CC requirement again, but with a stronger effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`÷<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(300000),
            effect() {
                let eff = player.points.plus(1).log10().pow(12.25).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Quarks", 43)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Color Charge II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        51: {    
            title: "Quark Generation",
            fullDisplay() {return `<font size="3"><b>[Q51] Quark Generation</span><font size="2"><br>Passively generate 100% of Quarks gain on reset per second.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1e6),
            unlocked() {return hasUpgrade("Quarks", 44)},
            tooltip() {return "<span style='color:#ffffff'>Quark Generation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        52: {    
            title: "Energetic Quarks",
            fullDisplay() {return `<font size="3"><b>[Q52] Energetic Quarks</span><font size="2"><br>Boosts Quarks gain based on Energy.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1e7),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.35).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Quarks", 51)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        53: {    
            title: "Empowered Booster",
            fullDisplay() {return `<font size="3"><b>[Q53] Empowered Booster</span><font size="2"><br>Color Charge boosts E12's effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(1.5e8),
            effect() {
                let eff = player.ColorCharge.points.mul(0.10).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Quarks", 52)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
        54: {    
            title: "Energetic Self-Synthesis",
            fullDisplay() {return `<font size="3"><b>[Q54] Energetic Self-Synthesis</span><font size="2"><br>E13 is thrice as strong.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Quarks`},        
            cost: new Decimal(3e8),
            unlocked() {return hasUpgrade("Quarks", 53)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Self-Synthesis</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ddabff, #f9d6ff)',

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
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b>[Q11-B] Up Quarks</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Quarks</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Energy</b>`},
            cost(x) {
                let base = new Decimal(5);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Quarks', 11).add(extra).pow_base(1.50) },  
            canAfford() { if (player.Quarks.points.gte(this.cost())) {return true}},
            buy() {
                player.Quarks.points = player.Quarks.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Quarks.points.div(this.cost(0)).add(5).log(5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Quarks', 11))) setBuyableAmount('Quarks', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Up Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain by 1.50x compounding with every purchase."},
            style() {
                if(!this.canAfford()){return {'background': 'linear-gradient(#ddabff, #f9d6ff)','color':'black','border': '5px solid','border-color':'#f7e4ff'}}
                else return {'background': 'linear-gradient(#ddabff, #f9d6ff)', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Quarks", 31)},
    
        },
        12: {
            display() {return `<font size="3"><b>[Q12-B] Charm Quarks</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Quarks</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `÷ to Color Charge Requirement</b>`},
            cost(x) {
                let base = new Decimal(5);
                let cost = base.pow(x).times(625);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Quarks', 12).add(extra).pow_base(5000) },  
            canAfford() { if (player.Quarks.points.gte(this.cost())) {return true}},
            buy() {
                player.Quarks.points = player.Quarks.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Quarks.points.div(this.cost(0)).add(625).log(5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Quarks', 12))) setBuyableAmount('Quarks', 12, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Charm Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Divides the Color Charge requirement by 5,000 compounding every purchase."},
            style() {
                if(!this.canAfford()){return {'background': 'linear-gradient(#ddabff, #f9d6ff)','color':'black','border': '5px solid','border-color':'#f7e4ff'}}
                else return {'background': 'linear-gradient(#ddabff, #f9d6ff)', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Quarks", 41)},
    
        },
        21: {
            display() {return `<font size="3"><b>[Q21-B] Down Quarks</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Quarks</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Charge</b>`},
            cost(x) {
                let base = new Decimal(5);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Quarks', 21).add(extra).pow_base(1.25) },  
            canAfford() { if (player.Quarks.points.gte(this.cost())) {return true}},
            buy() {
                player.Quarks.points = player.Quarks.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Quarks.points.div(this.cost(0)).add(5).log(5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Quarks', 21))) setBuyableAmount('Quarks', 21, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Down Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Charge gain by 1.25x compounding with every purchase."},
            style() {
                if(!this.canAfford()){return {'background': 'linear-gradient(#ddabff, #f9d6ff)','color':'black','border': '5px solid','border-color':'#f7e4ff'}}
                else return {'background': 'linear-gradient(#ddabff, #f9d6ff)', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Quarks", 31)},
    
        },
        22: {
            display() {return `<font size="3"><b>[Q22-B] Strange Quarks</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Quarks</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Quarks</b>`},
            cost(x) {
                let base = new Decimal(6);
                let cost = base.pow(x).times(625);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Quarks', 22).add(extra).pow_base(1.25) },  
            canAfford() { if (player.Quarks.points.gte(this.cost())) {return true}},
            buy() {
                player.Quarks.points = player.Quarks.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Quarks.points.div(this.cost(0)).add(625).log(6) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Quarks', 21))) setBuyableAmount('Quarks', 21, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Strange Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Quark gain by 1.25x compounding with every purchase."},
            style() {
                if(!this.canAfford()){return {'background': 'linear-gradient(#ddabff, #f9d6ff)','color':'black','border': '5px solid','border-color':'#f7e4ff'}}
                else return {'background': 'linear-gradient(#ddabff, #f9d6ff)', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Quarks", 41)},
    
        },
    },
    tabFormat: {
        "Quarks": {
            content: [
                    "blank",
                        ["display-text",
                            function() {return ''+format(player.Quarks.points)+' Quarks'},
                            {"color": "#f7ebff", "font-size": "35px"}],
                            ["raw-html", function() {if (hasUpgrade("Quarks", 51)) return "<font size='4'>(+" + (format(getResetGain("Quarks"))) + " Quarks/s)"}],
                            ["raw-html", function() {if (!hasUpgrade("Quarks", 51)) return "――――――――――――――――"}, {"color": "#f7ebff", "font-size": "30px"}],                  
                                function() {if (hasUpgrade("Charge", 1011) && !hasUpgrade("Quarks", 51)) return "prestige-button"},
                                ["raw-html", function() {if (!hasUpgrade("Charge", 1011) && !hasUpgrade("Quarks", 51)) return 'You need the Universal Fundamentals upgrade to create Quarks.'}, {"font-size": "22px"}],
                                "blank",
                                ["display-text",
                                    function() {return '――――――――――――――――'},
                                    {"color": "#f7ebff", "font-size": "30px"}],
                                    ["display-text",
                                        function() {return ''+format(player.points)+' Energy'},
                                        {"color": "#fcffc5", "font-size": "17px"}],
                                        ["raw-html", function() {if (player.Quarks.total.gte(1) && !hasUpgrade("Quarks", 51)) return ''+formatWhole(player.Quarks.total)+' total Quarks'}, {"color": "#f7ebff", "font-size": "17px"}],
                                        ["display-text",
                                            function() {return '――――――――――――――――'},
                                            {"color": "#f7ebff", "font-size": "30px"}],
                                    ["microtabs", "QuarkTabs"]

            ]
            
        },
    },
        microtabs: {
            QuarkTabs: {
                "Upgrades": {
                    unlocked() {return player.Quarks.total.gte(1)},
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],]]]],
                        ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],]]]],
                        ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],]]]],
                        ["column", [ ["row", [ ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44],]]]],
                        ["column", [ ["row", [ ["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54],]]]],
                        "blank",
                    ]
                    
                },
                "Buyables": {
                    unlocked() {return hasUpgrade("Quarks", 31)},
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["buyable", 11], ["buyable", 12],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 21], ["buyable", 22],]]]],
                        "blank",
                    ]
                    
                },
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