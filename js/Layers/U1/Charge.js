addLayer("c", {
    name: "Charge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        chargeResetAmount: new Decimal(0),
    }},
    color: "#FFFFBD",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image':('radial-gradient(circle at center, #FFFF78, #FFFFBD'),
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("100"), // Can be a function that takes requirement increases into account
    resource: "Charge", // Name of prestige currency
    baseResource: "Energy", // Name of resource prestige is based on
    branches: ["e"],
    resetsNothing() {return true},
    resetDescription: "Charge Energy.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Charge<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFBD'> " +formatWhole(player.c.points)+" Charge</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("c", 21))  mult = mult.times(tmp.c.upgrades[21].effect2)
        if (hasUpgrade("c", 31)) mult = mult.times(upgradeEffect("c", 31))
        if (hasUpgrade("c", 41)) mult = mult.times(upgradeEffect("c", 41))
        if (hasUpgrade("e", 54)) mult = mult.times(upgradeEffect("e", 54))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade("e", 44)) || player.c.chargeResetAmount.gte('1')},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    componentStyles: {
        "prestige-button": {
            "background": "linear-gradient(30deg, #FFFF78, #FFFFBD)",
               "width": "250px",
                "height": "125px",
           },
    },
    onPrestige(){
    //Reset Energy layer
      player.points = new Decimal(0)
      if (!hasUpgrade("c", 54)) player.e.upgrades.splice(0, player.e.upgrades.length)
      for (let i in player.e.buyables) {
          player.e.buyables[i] = new Decimal(0)
    }
      player.c.chargeResetAmount = player.c.chargeResetAmount.add(1)
      
    },
    milestones: {
    },
    upgrades: {
        11: {
            fullDisplay(){
                return `<font size="2"><b>[C11] Energy Boost</b><font size="1"><br>Boosts Energy gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return true},
            cost: new Decimal(1),
            effect() {
                eff = new Decimal(2.5)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C11] Energy Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            fullDisplay(){
                return `<font size="2"><b>[C12] Early Energy Speed</b><font size="1"><br>Boosts Energy gain by `+format(upgradeEffect(this.layer, this.id))+`x while Energy amount is under 10.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 11))},
            cost: new Decimal(1),
            effect() {
                eff = new Decimal(1.5)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C12] Energy Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay(){
                if (!upgradeEffect(this.layer, this.id).gte("4")) return `<font size="2"><b>[C13] Charged Friction</b><font size="1"><br>Boost Energy gain based on Charge upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge` 
                if (upgradeEffect(this.layer, this.id).gte("4")) return `<font size="2"><b>[C13] Charged Friction</b><font size="1"><br>Boost Energy gain based on Charge upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br><span style='color:red'>[SOFTCAPPED]</span><br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`},
            unlocked() { return hasUpgrade("c", 12) },
            cost: new Decimal(1),
            effect() {
                let eff = Decimal.pow(1.15, player.c.upgrades.length);
                scpow = 0.3
                eff = softcap(eff, new Decimal("4"), scpow)
                return eff;
            },
            tooltip() {return "<span style='color:#ffffff'>[C13] Charged Friction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay(){
                return `<font size="2"><b>[C14] Accumulator Automation I</b><font size="1"><br>Automate purchasing E11-B passively without spending Energy.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 13))},
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[C14] Accumulator Automation I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {
            fullDisplay(){
                return `<font size="2"><b>[C21] Energy Boost, II</b><font size="1"><br>Boosts Energy gain by `+format(tmp[this.layer].upgrades[this.id].effect1) +`x and Charge gain by `+format(tmp[this.layer].upgrades[this.id].effect2) +`x. <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 14))},
            cost: new Decimal(1),
            effect1() {
                eff = new Decimal(1.20)
                return eff
            },
            effect2() {
                eff = new Decimal(1.15)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C21] Energy Boost, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {
            fullDisplay(){
                return `<font size="2"><b>[C22] Basic Energy Charge</b><font size="1"><br>Each Charge point made in total boosts Energy gain by 0.020x. This effect hardcaps at 2.00x.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`
            }, 
            unlocked() { return (hasUpgrade("c", 21))},
            cost: new Decimal(2),
        effect() {
                let eff = player.c.total.dividedBy(50).plus(1);
                return eff.min(2);
            }, 
            tooltip() {return "<span style='color:#ffffff'>[C22] Basic Energy Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {
            fullDisplay(){
                return `<font size="2"><b>[C23] Later Energy Speed</b><font size="1"><br>Boosts Energy gain by `+format(upgradeEffect(this.layer, this.id))+`x while Energy amount is over 100.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 22))},
            cost: new Decimal(2),
            effect() {
                eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C23] Later Energy Speed</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {
            fullDisplay(){
                return `<font size="2"><b>[C24] Accumulator Automation II</b><font size="1"><br>Automate purchasing E12-B passively without spending Energy.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 23))},
            cost: new Decimal(2),
            tooltip() {return "<span style='color:#ffffff'>[C24] Accumulator Automation II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {
            fullDisplay(){
                return `<font size="2"><b>[C31] Energy Boost, III</b><font size="1"><br>Boosts both Charge and Energy gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 24))},
            cost: new Decimal(2),
            effect() {
                eff = new Decimal(1.15)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C31] Energy Boost, III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {
            fullDisplay(){
                return `<font size="2"><b>[C32] Energy-Upgrade Synergy Extender</b><font size="1"><br>Multiplies E33's hardcap by 1.5x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 24))},
            cost: new Decimal(3),
            tooltip() {return "<span style='color:#ffffff'>[C32] Energy-Upgrade Synergy Extender</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
            
        },
        33: {
            fullDisplay(){
                return `<font size="2"><b>[C33] Accumulation from Nothing, II</b><font size="1"><br>Boosts E22's effect by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 32))},
            cost: new Decimal(3),
            effect() {
                eff = new Decimal(1.15)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C31] Accumulation from Nothing, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        34: {
            fullDisplay(){
                return `<font size="2"><b>[C34] Accumulator Automation III</b><font size="1"><br>Automate purchasing E13-B passively without spending Energy.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 33))},
            cost: new Decimal(4),
            tooltip() {return "<span style='color:#ffffff'>[C24] Accumulator Automation III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        41: {
            fullDisplay(){
                return `<font size="2"><b>[C41] Energy Boost, IV</b><font size="1"><br>Boosts Charge gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 34))},
            cost: new Decimal(4),
            effect() {
                eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C41] Energy Boost, IV</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        42: {
            fullDisplay(){
                return `<font size="2"><b>[C42] Upgrades from Nothing, II</b><font size="1"><br>Boosts E21's effect by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 41))},
            cost: new Decimal(5),
            effect() {
                eff = new Decimal(1.10)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C42] Upgrades from Nothing, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        43: {
            fullDisplay(){
                return `<font size="2"><b>[C43] Friction Accumulation</b><font size="1"><br>At a very reduced rate, C13 boosts E11-B.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`},
            unlocked() { return (hasUpgrade("c", 42))},
            cost: new Decimal(6),
            effect() {
                let eff = upgradeEffect('c', 13).pow(0.05);
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C43] Friction Accumulation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        44: {
            fullDisplay(){
                return `<font size="2"><b>[C44] Energy Expansion</b><font size="1"><br>Unlock a new row of Energy upgrades.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 43))},
            cost: new Decimal(6),
            tooltip() {return "<span style='color:#ffffff'>[C44] Energy Expansion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        51: {
            fullDisplay(){
                return `<font size="2"><b>[C51] Energy Boost, V</b><font size="1"><br>Double Energy gain.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 44))},
            cost: new Decimal(15),
            tooltip() {return "<span style='color:#ffffff'>[C51] Energy Boost, V</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        52: {
            fullDisplay(){
                if (!upgradeEffect(this.layer, this.id).gte("10")) return `<font size="2"><b>[C52] Advanced Energy Charge</b><font size="1"><br>Boost Energy gain based on total Charge made.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge` 
                if (upgradeEffect(this.layer, this.id).gte("10")) return `<font size="2"><b>[C52] Advanced Energy Charge</b><font size="1"><br>Boost Energy gain based on total Charge made.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br><span style='color:red'>[SOFTCAPPED]</span><br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`},
            unlocked() { return hasUpgrade("c", 51) },
            cost: new Decimal(20),
            effect() {
 	            let eff = player.c.total.plus(2).pow(0.1);
                scpow = 0.1
                eff = softcap(eff, new Decimal("10"), scpow)
                return eff;
            },
            tooltip() {return "<span style='color:#ffffff'>[C52] Advanced Energy Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        53: {
            fullDisplay(){
                return `<font size="2"><b>[C53] Raised Energy</b><font size="1"><br>Raise Energy gain by ^`+format(upgradeEffect(this.layer, this.id))+`.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 52))},
            cost: new Decimal(23),
            effect() {
                eff = new Decimal(1.025)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[C53] Raised Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        54: {
            fullDisplay(){
                return `<font size="2"><b>[C54] Color Charge Unlock</b><font size="1"><br>Keep Energy upgrades on Charge reset. Unlock the second Layer 1 feature.<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Charge`}, 
            unlocked() { return (hasUpgrade("c", 53))},
            cost: new Decimal(30),
            tooltip() {return "<span style='color:#ffffff'>[C54] Color Charge Unlock</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFBD',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "175px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFF78',
                'color': 'black',
                        "width": "175px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    buyables: {
    },
     tabFormat: {
        "Charge": {
        style() {return  {'background-color': '#1C1C00'}},
        content: [
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],
        ["display-text",
            function() {return ''+formatWhole(player.c.points)+' Charge'},
            {"color": "#FFFFBD", "font-size": "30px"}],
                        ["raw-html", function() {if (!hasUpgrade("e", 1111)) return '―――――――――――――――――'}, {"color": "#FFFFBD", "font-size": "32px"}],
            ["raw-html", function() {if (!hasUpgrade("e", 44)) return 'To Charge Energy, you need Energy Upgrade E44.'}, {"color": "#FFFFFF", "font-size": "20px"}],
                function() {if (hasUpgrade("e", 44)) return "prestige-button"},  
                                         ["raw-html", function() {if (!hasUpgrade("e", 1111)) return '―――――――――――――――――'}, {"color": "#FFFFBD", "font-size": "32px"}],
                                        ["raw-html", function() {return ''+format(player.points)+' Energy'}, {"color": "#f4ffd9", "font-size": "20px"}],

                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "ChargeTabs"],

                ]
            
        },
    },
        microtabs: {
            ChargeTabs: {
                "Info": {
                    content: [
                        ["display-text",
                    function() {return "――――――Layer 1 Reset――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],
                    ["display-text",
                    function() {return "Charge resets Energy amount, Energy Upgrades, and Energy Buyables in exchange for Charge, which can be spent on new upgrades in order to recover faster."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],                        
                    ]
                },
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ]]]],
                    ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ]]]],
                    ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ]]]],
                    ["column", [ ["row", [ ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ]]]],
                    ["column", [ ["row", [ ["upgrade", 51], ["upgrade", 52], ["upgrade", 53], ["upgrade", 54], ]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFBD", "font-size": "32px"}],   
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})