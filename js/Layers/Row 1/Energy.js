addLayer("Energy", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c1ffee",
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
    resource: "Energy", // Name of prestige currency
    resetDescription: "You're looking through the code aren't you.<br>----------<br>",
    baseResource: "poop", // Name of resource prestige is based on
    baseAmount() {return player.Prestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000000000000000000000000000000000000000000000000000000000000000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Energy', 21)) mult = mult.times(upgradeEffect('Energy', 21))
        if (hasUpgrade('Energy', 23)) mult = mult.times(upgradeEffect('Energy', 23))
        if (hasMilestone('Rank', 10)) mult = mult.times(tmp.Rank.milestones[10].effect)	
        if (hasUpgrade('Energy', 31)) mult = mult.times(upgradeEffect('Energy', 31))
        if (hasUpgrade('Energy', 32)) mult = mult.times(upgradeEffect('Energy', 32))
        if (hasUpgrade('Hindrance', 31)) mult = mult.times(upgradeEffect('Hindrance', 31))
        if (hasUpgrade('Energy', 42)) mult = mult.times(upgradeEffect('Energy', 42))
        mult = mult.times(buyableEffect('Glory', 11))
        if (hasUpgrade('Glory', 63)) mult = mult.times(upgradeEffect('Glory', 63))
        if (hasUpgrade('Glory', 11)) mult = mult.times(2)
        if (hasUpgrade('Glory', 11) && hasUpgrade('Energy', 11)) mult = mult.times(10)
        if (hasUpgrade('Glory', 21)) mult = mult.times(upgradeEffect('Glory', 21))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    powerExp() {
        let exp = new Decimal(1 / 5);
        return exp;
    },
    effect() {
        return player.Energy.points.plus(1).pow(this.powerExp());
    },
    passiveGeneration() {
        if (hasUpgrade('Energy', 11) || hasUpgrade("Glory", 11)) return 1
	return 0
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        if (hasUpgrade('Energy', 51) && hasUpgrade('Glory', 23) ) keptUpgrades.push(51)
        if (hasUpgrade('Energy', 52) && hasUpgrade('Glory', 23) ) keptUpgrades.push(52)
        if (hasUpgrade('Energy', 24) && hasUpgrade('Glory', 64) ) keptUpgrades.push(24)
        if (hasUpgrade('Energy', 34) && hasUpgrade('Glory', 64) ) keptUpgrades.push(34)
        if (hasUpgrade('Energy', 44) && hasUpgrade('Glory', 64) ) keptUpgrades.push(44)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(11)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(21)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(22)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(23)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(31)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(32)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(33)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(41)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(42)
        if (hasUpgrade('Energy', 44)) keptUpgrades.push(43)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Activate Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Activate Generator</span></b><font size="2"><br>Enables Energy generation.<br>-------------<br>Currently: `+(format(getResetGain("Energy")))+`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Honor)+`<span style='color:#000000'> Honor</span>`},        
            costs: {
                Prestige: 1,
                Honor: 1e10,
              },
              canAfford() {
                return player.Prestige.points.gte(this.costs.Prestige)
                    && player.Honor.points.gte(this.costs.Honor)
              },
              pay() {
                player.Prestige.points = player.Prestige.points.minus(this.costs.Prestige);
                player.Honor.points = player.Honor.points.minus(this.costs.Honor);
              },
            unlocked() {return hasUpgrade("Honor", 61)},
            tooltip() {return "<span style='color:#ffffff'>Activate Generator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        21: {    
            title: "The First Upgrade 2",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>The First Upgrade 2</span></b><font size="2"><br>Increases Energy generation.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(120),
            effect() {
                effect = new Decimal(2)
                if (hasUpgrade('Energy', 22)) effect = effect.times(upgradeEffect('Energy', 22))
                if (hasUpgrade('Energy', 51)) effect = effect.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 24)) effect = effect.times(upgradeEffect('Energy', 24))
                return effect
              },   
            unlocked() {return hasUpgrade("Energy", 11) || hasUpgrade("Glory", 11)},
            tooltip() {return "<span style='color:#ffffff'>The First Upgrade 2</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        22: {    
            title: "Another Upgrade Upgrader",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Another Upgrade Upgrader</span></b><font size="2"><br>Increases the power of The First Upgrade 2.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(310),
            effect() {
                effect = new Decimal(2)
                if (hasUpgrade('Energy', 51)) effect = effect.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 24)) effect = effect.times(upgradeEffect('Energy', 24))
                return effect
              },   
            unlocked() {return hasUpgrade("Energy", 21)},
            tooltip() {return "<span style='color:#ffffff'>Another Upgrade Upgrader</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        23: {    
            title: "Upgrade Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Upgrade Energy</span></b><font size="2"><br>Increase Energy gain by amount of Energy upgrades bought.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(600),
            effect() {
                let eff = Decimal.pow(1.50, player.Energy.upgrades.length);
                if (hasUpgrade('Energy', 51)) eff = eff.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 24)) effect = effect.times(upgradeEffect('Energy', 24))
                return eff;
            },
            unlocked() {return hasUpgrade("Energy", 22)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        31: {    
            title: "Energetic Synergism",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Energetic Synergism</span></b><font size="2"><br>Increase Energy gain by itself.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(12000),
            effect() {
                let eff = player.Energy.points.plus(1).log10().pow(0.55).plus(1);
                if (hasUpgrade('Energy', 51)) eff = eff.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Glory', 51)) eff = eff.times(upgradeEffect('Glory', 51))
                if (hasUpgrade('Energy', 34)) eff = eff.times(upgradeEffect('Energy', 24))
                return eff;
            },
            unlocked() {return hasUpgrade("Energy", 23)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Synergism</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        32: {    
            title: "Honored Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honored Energy</span></b><font size="2"><br>Increase Energy gain based on Honor.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(65000),
            effect() {
                let eff = player.Honor.points.plus(1).log(10).pow(0.50).plus(1);
                if (hasUpgrade('Energy', 51)) eff = eff.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 34)) eff = eff.times(upgradeEffect('Energy', 24))
                return eff;
            }, 
            unlocked() {return hasUpgrade("Energy", 31)},
            tooltip() {return "<span style='color:#ffffff'>Honored Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        33: {    
            title: "Energetic Honor",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Energetic Honor</span></b><font size="2"><br>Increase Honor gain based on Energy.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(420000),
            effect() {
                let eff = player.Energy.points.plus(1).log(5).pow(0.55);
                if (hasUpgrade('Energy', 51)) eff = eff.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 34)) eff = eff.times(upgradeEffect('Energy', 24))
                return eff;
            }, 
            unlocked() {return hasUpgrade("Energy", 32)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Honor</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        41: {    
            title: "Prestige Enforcer",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige Enforcer</span></b><font size="2"><br>Weaken the second Prestige softcap based on Energy.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`÷<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(1000000),
            effect() {
                let eff = player.Energy.points.plus(2).pow(0.25);
                return eff.min(75);
            }, 
            unlocked() {return hasUpgrade("Energy", 33)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Enforcer</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Hardcaps at 75x"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        42: {    
            title: "Essence-Infused Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Essence-Infused Energy</span></b><font size="2"><br>Boost Energy gain based on Essence.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(1700000),
            effect() {
                let eff = player.points.plus(1).log(8).pow(0.35).plus(1);
                if (hasUpgrade('Energy', 51)) eff = eff.times(upgradeEffect('Energy', 51))
                if (hasUpgrade('Energy', 44)) eff = eff.times(upgradeEffect('Energy', 24))
                return eff;
            },
            unlocked() {return hasUpgrade("Energy", 41)},
            tooltip() {return "<span style='color:#ffffff'>Essence-Infused Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        43: {    
            title: "Honor Expansion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honor Expansion</span></b><font size="2"><br>Unlock a new column of Honor upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(20000000),
            unlocked() {return hasUpgrade("Energy", 42)},
            tooltip() {return "<span style='color:#ffffff'>Honor Expansion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        51: {    
            title: "Advanced Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Advanced Energy</span></b><font size="2"><br>Boost most Energy upgrades based on Energy (Prestige Enforcer now boosts Honor gain).<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(250000),
            effect() {
                let eff = player.Energy.points.plus(1).log(10).pow(0.20).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Glory", 23)},
            tooltip() {return "<span style='color:#ffffff'>Advanced Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        52: {    
            title: "Pure Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Pure Energy</span></b><font size="2"><br>Energy gains another effect that also boosts Prestige.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Energy</span>`},        
            cost: new Decimal(1e10),
            effect() {
                let eff = player.Energy.points.plus(1).log10().pow(2.75).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Energy", 51)},
            tooltip() {return "<span style='color:#ffffff'>Pure Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        24: {    
            title: "Row Leader",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Row Leader</span></b><font size="2"><br>Boosts every upgrade in this row based on Energy.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Energy)+`<span style='color:#000000'> Energy</span> and `+format(tmp[this.layer].upgrades[this.id].costs.Glory)+` Glory`},        
            costs: {
                Energy: 1.65e18,
                Glory: 75,
              },
              canAfford() {
                return player.Energy.points.gte(this.costs.Energy)
                    && player.Glory.points.gte(this.costs.Glory)
              },
              pay() {
                player.Energy.points = player.Energy.points.minus(this.costs.Energy);
                player.Glory.points = player.Glory.points.minus(this.costs.Glory);
              },
              effect() {
                let eff = player.Energy.points.plus(1).log(100).pow(1.15).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Glory", 64)},
            tooltip() {return "<span style='color:#ffffff'>Row Leader</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        34: {    
            title: "Row King",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Row King</span></b><font size="2"><br>The above upgrade also boosts the second row of Energy upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Energy)+`<span style='color:#000000'> Energy</span> and `+format(tmp[this.layer].upgrades[this.id].costs.Glory)+` Glory`},        
            costs: {
                Energy: 1.00e21,
                Glory: 100,
              },
              canAfford() {
                return player.Energy.points.gte(this.costs.Energy)
                    && player.Glory.points.gte(this.costs.Glory)
              },
              pay() {
                player.Energy.points = player.Energy.points.minus(this.costs.Energy);
                player.Glory.points = player.Glory.points.minus(this.costs.Glory);
              },
            unlocked() {return hasUpgrade("Energy", 24)},
            tooltip() {return "<span style='color:#ffffff'>Row King</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        44: {    
            title: "And Back to Glory Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>And Back to Glory Again</span></b><font size="2"><br>Keep Energy upgrades on Glory reset, Row Leader affects Essence-Infused Energy, and unlock more Glory upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Energy)+`<span style='color:#000000'> Energy</span> and `+format(tmp[this.layer].upgrades[this.id].costs.Glory)+` Glory`},        
            costs: {
                Energy: 4.00e25,
                Glory: 205,
              },
              canAfford() {
                return player.Energy.points.gte(this.costs.Energy)
                    && player.Glory.points.gte(this.costs.Glory)
              },
              pay() {
                player.Energy.points = player.Energy.points.minus(this.costs.Energy);
                player.Glory.points = player.Glory.points.minus(this.costs.Glory);
              },
            unlocked() {return hasUpgrade("Energy", 34)},
            tooltip() {return "<span style='color:#ffffff'>And Back to Glory Again</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>We thank you for taking this momentary diversion back to Energy."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
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
                    'background-color': '#7fffdb' ,
                    "width": "200px",
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
           "blank",
           ['display-text',function(){return '<h4><span style="color:#faff92">'+quickBigColor(format(player.Honor.points),'#faff92') +' Honor</span>'}],
           ["raw-html", function() {if (hasMilestone("Rank", 5)) return "<font size='5'>(+" + (format(getResetGain("Honor"))) + " Honor/s)"}],
       ["display-text",
           function() {return "--------------------"},
           {"color": "#c1ffee", "font-size": "32px"}],
           ['display-text',function(){return '<h4>You have <span style="color:#c1ffee">'+quickBigColor(format(player.Energy.points),'#c1ffee') +' Energy</span>, which boosts <span style="color:#31aeb0">Prestige</span> by <span style="color:#c1ffee">'+ format(tmp.Energy.effect) +'x</span>.'}],
           ["raw-html", function() {if (hasUpgrade("Energy", 11) || hasUpgrade("Glory", 11)) return "<font size='5'>(+" + (format(getResetGain("Energy"))) + " Energy/s)"}],
           ["display-text",
            function() {return "--------------------"},
            {"color": "#c1ffee", "font-size": "32px"}],
            ["upgrades", [1]],
            "blank",
            ["upgrades", [5]],
            "blank",
            ["upgrades", [2, 3, 4, 6]],
            "blank",
            ["display-text",
                function() {return "--------------------"},
                {"color": "#c1ffee", "font-size": "32px"}],
                ["raw-html", function() {if (hasUpgrade("Glory", 64)) return "<h3 class='glory'>"+format(player.Glory.points)+" <h3 class='glory'>Glory</h3>"}],


      
                   
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