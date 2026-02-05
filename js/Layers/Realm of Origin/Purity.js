addLayer("Purity", {
    name: "Purity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone('Level', 8)},
        points: new Decimal(0),
        purityResets: new Decimal(0),
        bestPurity: new Decimal(0),
    }},
    color: "#FFE5FA",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    branches: ["Level", "Fruits"],
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    requires: new Decimal("5e6"), // Can be a function that takes requirement increases into account
    resource: "Purity", // Name of prestige currency
    resetDescription: "Purify all of your Essence to gain Purity.<br>――――――――――――――<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Purity<br>――――――――――――――<br> <font size='2'><span style='color:#FFE5FA'> " +formatWhole(player.Purity.purity)+" Purity</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        //Buyables
	    mult=mult.times(buyableEffect('Fruits', 8))

        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone('Level', 8) || player.Purity.total.gte(1)},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
   update(delta){
        //Get best Purity
        if (player.Purity.bestPurity.lt(player.Purity.points)) player.Purity.bestPurity = player.Purity.points
    },
onPrestige(){
    //Reset Essence layer
      player.points = new Decimal(5)
      if (!hasMilestone("Purity", 5)) player.Essence.upgrades.splice(0, player.Essence.upgrades.length)
    //Reset Levels
      player.Level.points = new Decimal(0)
      if (!hasMilestone("Purity", 5)) player.Level.milestones.splice(0, player.Level.milestones.length)
    //Reset Fruits
      player.Fruits.apples = new Decimal(0)
      player.Fruits.pears = new Decimal(0)
      player.Fruits.bananas = new Decimal(0)
      if (!hasMilestone("Purity", 5)) player.Fruits.upgrades.splice(0, player.Fruits.upgrades.length)
      for (let i in player.Fruits.buyables) {
          player.Fruits.buyables[i] = new Decimal(0)
    }
    //Add Reset Amount Stat
      player.Purity.purityResets = player.Purity.purityResets.add(1)
},
    milestones: {
    },
    upgrades: {     
        1: {
            fullDisplay() {return `<font size="3"><b>[P01] Pure Power</b><font size="2"><br>Boosts Essence gain.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return player.Purity.total.gte(1) },
            effect() {
                effect = new Decimal(3)
                if (hasUpgrade('Purity', 21)) effect = effect.times(upgradeEffect('Purity', 21))
                return effect
              },  
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[P01] Pure Power</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "230px",
            "height": "195px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "400px",
            "height": "200px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        11: {
            fullDisplay() {return `<font size="2"><b>[P11] Tree Fertilizer</b><font size="1"><br>Triple Apple and Pear gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 1) },
            cost: new Decimal(1),
            branches: ["Purity", 1],
            tooltip() {return "<span style='color:#ffffff'>[P11] Tree Fertilizer</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            fullDisplay() {return `<font size="2"><b>[P12] Fruit Automation I</b><font size="1"><br>Autobuy Apple and Pear boosters without spending any fruits.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 1) },
            cost: new Decimal(1),
            branches: ["Purity", 1],
            tooltip() {return "<span style='color:#ffffff'>[P12] Fruit Automation I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay() {return `<font size="2"><b>[P13] Essence Accelerator</b><font size="1"><br>While under 5,000,000 Essence, double Essence gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 1) },
            cost: new Decimal(1),
            branches: ["Purity", 1],
            tooltip() {return "<span style='color:#ffffff'>[P13] Essence Accelerator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay() {return `<font size="2"><b>[P14] Easier Leveling</b><font size="1"><br>You can buy max Levels.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 1) },
            cost: new Decimal(1),
            branches: ["Purity", 1],
            tooltip() {return "<span style='color:#ffffff'>[P14] Easier Leveling</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {
            fullDisplay() {return `<font size="2"><b>[P21] Empowered Purity</b><font size="1"><br>P01 is stronger based on Purity upgrades bought.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 11) && hasUpgrade('Purity', 12) && hasUpgrade('Purity', 13) && hasUpgrade('Purity', 14) },
            cost: new Decimal(1),
            effect() {
                let eff = Decimal.pow(1.05, player.Purity.upgrades.length);
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[P21] Empowered Purity</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {
            fullDisplay() {return `<font size="2"><b>[P22] Fruit Automation II</b><font size="1"><br>Autobuys Essence Apples and Level Pears without spending any fruits.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 21) },
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[P22] Fruit Automation II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {
            fullDisplay() {return `<font size="2"><b>[P23] Automatic Leveling</b><font size="1"><br>Automatically Level up, and doing so no longer resets your Essence.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 22) },
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[P23] Automatic Leveling</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {
            fullDisplay() {return `<font size="2"><b>[P24] Fruity Essence</b><font size="1"><br>Boost Essence gain based on one-time Fruit upgrades bought.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 23) },
            effect() {
                let eff = Decimal.pow(1.25, player.Fruits.upgrades.length);
                return eff
            },
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[P24] Fruity Essence</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {
            fullDisplay() {return `<font size="2"><b>[P31] More Fruits of your Labor</b><font size="1"><br>Unlocks new Fruit upgrades.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 24) },
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[P31] More Fruits of your Labor</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {
            fullDisplay() {return `<font size="2"><b>[P32] Purified Essence</b><font size="1"><br>Boost Essence gain based on total Purity.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 31) },
            cost: new Decimal(2),
            effect() {
                let eff = player.Purity.total.plus(1).log10().pow(0.8).plus(1);
                return eff;
            },
            tooltip() {return "<span style='color:#ffffff'>[P32] Purified Essence</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {
            fullDisplay() {return `<font size="2"><b>[P33] Fruit Automation III</b><font size="1"><br>Autobuy Apple Pickers, Pear Pickers, and Banana Boosters without spending any fruits.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 32) },
            cost: new Decimal(3),
            tooltip() {return "<span style='color:#ffffff'>[P33] Fruit Automation III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        34: {
            fullDisplay() {return `<font size="2"><b>[P34] Ranks</b><font size="1"><br>Unlocks Ranks (In the Levels layer).<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Purity`},        
            unlocked() { return hasUpgrade('Purity', 33) },
            cost: new Decimal(4),
            tooltip() {return "<span style='color:#ffffff'>[P34] Ranks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFE5FA',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },                                                
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
    },
    componentStyles: {
        "prestige-button": {
            'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
               "width": "250px",
                "height": "125px",
           },
    },
     tabFormat: {
        "Purity": {
        style() {return  {'background-color': '#40323D'}},
        content: [
            ["display-text",
            function() {return ''+formatWhole(player.Purity.points)+' Purity'},
            {"color": "#FFE5FA", "font-size": "30px"}],
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFE5FA", "font-size": "32px"}],
                    ["raw-html", function() {if (!hasMilestone("Level", 8)) return 'To Purify Essence, you need the eighth Level Milestone.'}, {"color": "#FFFFFF", "font-size": "20px"}],
                function() {if (hasMilestone("Level", 8)) return "prestige-button"},
                ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFE5FA", "font-size": "32px"}],
                    ["microtabs", "PurityTabs"]
                ]
            
        },
    },
    microtabs: {
            PurityTabs: {
                "Upgrades": {
                    unlocked() { return player.Purity.total.gte(1) },
                    content: [
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFE5FA", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 1], ]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],  ]]]],
                    ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],  ]]]],
                    ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],  ]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFE5FA", "font-size": "32px"}],
                    ]
                },

            },
        },
})