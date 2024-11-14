addLayer("Hindrance", {
    name: "Hindrance", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a14040",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("0.0000001"), // Can be a function that takes requirement increases into account
    resource: "Hindrance", // Name of prestige currency
    resetDescription: "You're looking through the code aren't you.<br>----------<br>",
    baseResource: "poop", // Name of resource prestige is based on
    baseAmount() {return player.Prestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000000000000000000000000000000000000000000000000000000000000000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Hindrance', 22)) mult = mult.times(upgradeEffect('Hindrance', 22))
        if (hasUpgrade('Hindrance', 32)) mult = mult.times(upgradeEffect('Hindrance', 32))
        if (hasUpgrade('Hindrance', 41)) mult = mult.times(upgradeEffect('Hindrance', 41))
        if (hasUpgrade('Hindrance', 24)) mult = mult.times(upgradeEffect('Hindrance', 24))
        if (hasUpgrade('Hindrance', 51)) mult = mult.times(upgradeEffect('Hindrance', 51))
        if (hasUpgrade('Hindrance', 52)) mult = mult.times(upgradeEffect('Hindrance', 52))
        if (hasUpgrade('Hindrance', 25)) mult = mult.times(10)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Hindrance', 11)) return 1
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
            title: "Activate Hindrance",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Activate Hindrance</span></b><font size="2"><br>Enables Hindrance generation.<br>-------------<br>Currently: `+(format(getResetGain("Hindrance")))+`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Glory)+`<span style='color:#000000'> Glory</span>`},        
            costs: {
                Prestige: 1,
                Glory: 5e9,
              },
              canAfford() {
                return player.Prestige.points.gte(this.costs.Prestige)
                    && player.Glory.points.gte(this.costs.Glory)
              },
              pay() {
                player.Prestige.points = player.Prestige.points.minus(this.costs.Prestige);
                player.Glory.points = player.Glory.points.minus(this.costs.Glory);
              },
              unlocked() {return new Decimal(challengeCompletions('Glory', 11)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Activate Hindrance</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        21: {    
            title: "Not So Hindered",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Not So Hindered</span></b><font size="2"><br>Automatically buy Amplifiers without spending any Glory.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(60),
            unlocked() {return hasUpgrade("Hindrance", 11)},
            tooltip() {return "<span style='color:#ffffff'>Not So Hindered</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Automation for Amplifiers, already?!"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        22: {    
            title: "Glorious Hindrance",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Hindrance</span></b><font size="2"><br>Hindrance Spirit production is boosted by Glory.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(140),
            effect() {
                let eff = player.Glory.points.plus(1).log(25).plus(1).pow(0.90);
                return eff;
            },
            unlocked() {return hasUpgrade("Hindrance", 21)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Hindrance</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        23: {    
            title: "Hindered Glory",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Glory</span></b><font size="2"><br>Hindrance Spirit boosts Glory and unlock a new Glory Challenge.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1000),
            effect() {
                let eff = player.Hindrance.points.plus(1).log(5).plus(1).pow(1.50);
                if (hasUpgrade('Hindrance', 33)) eff = eff.times(5)
                if (hasUpgrade('Hindrance', 43)) eff = eff.times(15)
                return eff;
            },
            unlocked() {return hasUpgrade("Hindrance", 21)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Glory</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        31: {    
            title: "Hindered Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Energy</span></b><font size="2"><br>Hindrance Spirit boosts Energy.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(4000),
            effect() {
                let eff = player.Hindrance.points.plus(1).log(3).plus(1).pow(3.75);
                return eff;
            },
            unlocked() {return new Decimal(challengeCompletions('Glory', 12)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        32: {    
            title: "Self-Imposed Hindrance",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Self-Imposed Hindrance</span></b><font size="2"><br>Hindrance Spirit boosts itself.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(2000),
            effect() {
                let eff = player.Hindrance.points.plus(1).log(10).plus(1).pow(1.75);
                if (hasUpgrade('Hindrance', 35)) eff = eff.times(upgradeEffect('Hindrance', 35))
                return eff;
            },
            unlocked() {return hasUpgrade("Hindrance", 31)},
            tooltip() {return "<span style='color:#ffffff'>Self-Imposed Hindrance</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        33: {    
            title: "Hindered Glory II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Glory II</span></b><font size="2"><br>Boosts the above upgrade by 5, and unlock a new Glory Challenge.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(30000),
            unlocked() {return hasUpgrade("Hindrance", 32)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Glory II</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        41: {    
            title: "Essence-Powered Hindrance",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Essence-Powered Hindrance</span></b><font size="2"><br>Boosts Hindrance gain based on Essence.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(100000),
            effect() {
                let eff = player.points.plus(1).log(10).plus(1).pow(1.15);
                return eff;
            },
            unlocked() {return new Decimal(challengeCompletions('Glory', 13)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Essence-Powered Hindrance</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        42: {    
            title: "Unhindered Prestige",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Unhindered Prestige</span></b><font size="2"><br>Removes softcaps from several different Prestige upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(75000000),
            unlocked() {return hasUpgrade("Hindrance", 41)},
            tooltip() {return "<span style='color:#ffffff'>Unhindered Prestige</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        43: {    
            title: "Hindered Glory III",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Glory III</span></b><font size="2"><br>Boosts Hindered Glory by 15, and unlock a new Glory Challenge.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(125000000),
            unlocked() {return hasUpgrade("Hindrance", 42)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Glory III</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        24: {    
            title: "Level-Powered Hindrance",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Level-Powered Hindrance</span></b><font size="2"><br>Hindrance gain is boosted based on your current Levels divided by 2.5.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(200000000),
            effect() {
                let eff = player.Level.points.div(2.5).add(1);
                return eff
              },   
            unlocked() {return new Decimal(challengeCompletions('Glory', 21)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Level-Powered Hindrance</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        34: {    
            title: "Unhindered Levels",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Level-Powered Hindrance</span></b><font size="2"><br>Removes the Level softcap and Hindrance boosts all Rank milestones.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e11),
            effect() {
                let eff = player.Hindrance.points.plus(1).log(10).plus(1).pow(1.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Hindrance", 24)},
            tooltip() {return "<span style='color:#ffffff'>Unhindered Levels</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        44: {    
            title: "Hindered Glory IV",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Glory IV</span></b><font size="2"><br>Unlocks another new Glory challenge.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e11),
            unlocked() {return hasUpgrade("Hindrance", 34)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Glory IV</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        25: {    
            title: "Hindered Prestige",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Prestige</span></b><font size="2"><br>Boosts Prestige based on Hindrance, and also multiples Hindrance gain by a flat 10x.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e11),
            effect() {
                let eff = player.Hindrance.points.plus(1).log(10).plus(1).pow(2.75);
                return eff;
            },
            unlocked() {return new Decimal(challengeCompletions('Glory', 22)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Prestige</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        35: {    
            title: "Hindered Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Recursion</span></b><font size="2"><br>Boosts Self-Imposed Hindrance based on it's own effect.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e12),
            effect() {
                let eff = upgradeEffect('Hindrance', 32).pow(0.50).plus(1);
                return eff;
            },   
            unlocked() {return hasUpgrade("Hindrance", 25)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Recursion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        45: {    
            title: "Last Challenge for Now",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Last Challenge for Now</span></b><font size="2"><br>Unlocks the final Glory Challenge.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e14),  
            unlocked() {return hasUpgrade("Hindrance", 35)},
            tooltip() {return "<span style='color:#ffffff'>Last Challenge for Now</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
       51: {    
            title: "Hindered Harmony",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Harmony</span></b><font size="2"><br>Boosts Hindrance gain based on the Self-Synergism Prestige upgrade.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(1e14),
            effect() {
                let eff = upgradeEffect('Prestige', 31).pow(0.50).plus(1);
                return eff;
            },   
            unlocked() {return new Decimal(challengeCompletions('Glory', 23)).gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Harmony</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        52: {    
            title: "Hindered Upgrades",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Hindered Upgrades</span></b><font size="2"><br>Boosts Hindrance and Glory gain based on Hindrance upgrades bought.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Hindrance Spirit</span>`},        
            cost: new Decimal(2.50e17),
            effect() {
                let eff = Decimal.pow(1.40, player.Hindrance.upgrades.length);
                return eff;
            },   
            unlocked() {return hasUpgrade("Hindrance", 51)},
            tooltip() {return "<span style='color:#ffffff'>Hindered Upgrades</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
    tabFormat: [
        ["display-text",
            function() {return '('+format(player.points)+' Essence)'},
            {"font-size": "14px"}],
            ["display-text",
                function() {return '<span style="color:#31aeb0">('+format(player.Prestige.points)+' Prestige)</span>'},
                {"font-size": "14px"}],
                ["display-text",
                    function() {return '<span style="color:#69c0f6">(Level '+format(player.Level.points)+')</span>'},
                    {"font-size": "14px"}],
                ["display-text",
                    function() {return '<span style="color:#faff92">('+format(player.Honor.points)+' Honor)</span>'},
                    {"font-size": "14px"}],
                    ["display-text",
                        function() {return '<span style="color:#ffcd7a">(Rank '+format(player.Rank.points)+')</span>'},
                        {"font-size": "14px"}],
                    ["display-text",
                        function() {return '<span style="color:#c1ffee">('+format(player.Energy.points)+' Energy)</span>'},
                        {"font-size": "14px"}],
                        ["display-text",
                            function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                            {"color": "#faff92", "font-size": "32px"}],
                        ['display-text',function(){return '<h4><span style="color:#faff92">'+quickDoubleColor(formatWhole(player.Glory.points),'#faff92','#ffcd7a' ) +' <h3 class="glory">Glory</h3></span>'}],
                        ["raw-html", function() {if (hasUpgrade('Glory', 73)) return "<font size='5'>(+" + (format(getResetGain("Glory"))) + " Glory/s)"}],
        ["display-text",
            function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
            {"color": "#faff92", "font-size": "32px"}],
            ["display-text",
                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                {"color": "#FFFC91", "font-size": "32px"}], 
        ["display-text",
            function() {return "--------------------"},
            {"color": "#a14040", "font-size": "32px"}],
            
            ['display-text',function(){return '<h4>You have <span style="color:#a14040">'+quickBigColor(format(player.Hindrance.points),'#a14040') +' Hindrance Spirit</span>.'}],
            ["raw-html", function() {if (hasUpgrade("Hindrance", 11)) return "<font size='5'>(+" + (format(getResetGain("Hindrance"))) + " Hindrance/s)"}],
            ["display-text",
                function() {return "--------------------"},
                {"color": "#a14040", "font-size": "32px"}],
                ["upgrades", [1]],
            "blank",
            ["upgrades", [2, 3, 4, 5, 6]],
                ["display-text",
                    function() {return "--------------------"},
                    {"color": "#a14040", "font-size": "32px"}],
                       ],
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})