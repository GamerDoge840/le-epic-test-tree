addLayer("Glory", {
    name: "Glory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#faff92",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-image': 'linear-gradient(#faff92, #ffcd7a)',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("6.00e20"), // Can be a function that takes requirement increases into account
    resource: "Glory", // Name of prestige currency
    branches: ["Honor"],
    resetDescription: "Revel in Glory.<br>----------<br>",
    baseResource: "Honor", // Name of resource prestige is based on
    baseAmount() {return player.Honor.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Glory<br>----------------<br> <font size='2'><h3 class='glory'> " +formatWhole(player.Glory.points)+" Glory</h3>"
        if(player.Hindrance.total.gte(1)) tooltip = tooltip + "<br><span style='color:#a14040'>"+formatWhole(player.Hindrance.points)+ " Hindrance Spirit</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('Rank', 14)) mult = mult.times(tmp.Rank.milestones[14].effect)
        if (hasUpgrade('Glory', 82)) mult = mult.times(upgradeEffect('Glory', 82))
        if (hasUpgrade('Hindrance', 23)) mult = mult.times(upgradeEffect('Hindrance', 23))
        if (hasUpgrade('Hindrance', 52)) mult = mult.times(upgradeEffect('Hindrance', 52))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    automate() {
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 11)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 21)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 31)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 41)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 51)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 61)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 71)
        if(hasUpgrade('Hindrance', 21)) buyMaxBuyable('Glory', 81)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("Rank", 13) || player.Glory.total.gte(1)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    componentStyles: {
        "prestige-button": {
             "background-image": 'url("resources/glorygradient.png")',        
            'background-position': 'center center',
            'background-size': '160%',},
    },
    passiveGeneration() {
        if (hasUpgrade('Glory', 73)) return 1
        if (hasUpgrade('Glory', 72)) return 0.25
	return 0
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Glorious Power",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Power</span></b><font size="2"><br>Triple Honor gain and retain access to Energy.<br><br>Double Energy gain, and the Activate Generator upgrade instead boosts it by 10x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return player.Glory.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Power</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Note that you need at least 1 Prestige to generate any Energy."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "225px",
            "height": "195px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        21: {    
            title: "Glorious Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Energy</span></b><font size="2"><br>Every total Glory point doubles Energy gain (Until 8 Total Glory), you can reset for max Ranks, and remove the penalty of the Rank 7 milestone.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.Glory.total.pow_base(2);
                return eff.min(256);
            }, 
            unlocked() {return hasUpgrade("Glory", 11)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "195px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "195px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "195px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        22: {    
            title: "Prestigious Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestigious Automator</span></b><font size="2"><br>Autobuy Prestige upgrades, and passive Prestige generation is always enabled.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("Glory", 21)},
            tooltip() {return "<span style='color:#ffffff'>Prestigious Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        23: {    
            title: "True Potential",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>True Potential</span></b><font size="2"><br>Unlocks two new Energy upgrades (That are kept on Glory reset).<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("Glory", 22)},
            tooltip() {return "<span style='color:#ffffff'>True Potential</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        31: {    
            title: "Leveled Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Leveled Automator</span></b><font size="2"><br>Level automation is always enabled.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(4),
            unlocked() {return hasUpgrade("Glory", 23)},
            tooltip() {return "<span style='color:#ffffff'>Leveled Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        32: {    
            title: "Ranked Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Ranked Automator</span></b><font size="2"><br>Automates Ranks.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(12),
            unlocked() {return hasUpgrade("Glory", 31)},
            tooltip() {return "<span style='color:#ffffff'>Ranked Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        33: {    
            title: "Honored Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honored Automator</span></b><font size="2"><br>Honor generation is always enabled and autobuy Honor upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(16),
            unlocked() {return hasUpgrade("Glory", 32)},
            tooltip() {return "<span style='color:#ffffff'>Honored Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        41: {    
            title: "A New Glorious Age",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>A New Glorious Age</span></b><font size="2"><br>Ranks never reset anything, and unlock a new tab in this layer featuring more upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(16),
            unlocked() {return hasUpgrade("Glory", 33)},
            tooltip() {return "<span style='color:#ffffff'>A New Glorious Age</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "250px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "225px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        51: {    
            title: "Energetic Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Energetic Recursion</span></b><font size="2"><br>Boost Energetic Synergism based on it's own effect.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(4),
            effect() {
                let eff = upgradeEffect('Energy', 31).pow(0.52).plus(1);
                return eff;
            },   
            unlocked() {return hasUpgrade("Glory", 41)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Recursion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        52: {    
            title: "Super Prestige Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Super Prestige Boost</span></b><font size="2"><br>Boost Honor based on Prestige.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(8),
            effect() {
                let eff = player.Prestige.points.plus(1).log(5).pow(0.80).plus(1);
                return eff;
            },   
            unlocked() {return hasUpgrade("Glory", 51)},
            tooltip() {return "<span style='color:#ffffff'>Super Prestige Boost</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        53: {    
            title: "Upgrade Essence III",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Upgrade Essence III</span></b><font size="2"><br>Boost Upgrade Essence II based on Glory upgrades bought (In both tabs).<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(15),
            effect() {
                let eff = Decimal.pow(1.40, player.Glory.upgrades.length);
                return eff;
            },    
            unlocked() {return hasUpgrade("Glory", 52)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Essence III</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        54: {    
            title: "Why Did it Take So Long to Get to This One?",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Why Did it Take So Long to Get to This One?</span></b><font size="2"><br>Boost Prestige based on Honor.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(15),
            effect() {
                let eff = player.Honor.points.plus(1).log(5).pow(1.75).plus(1);
                return eff;
            },    
            unlocked() {return hasUpgrade("Glory", 53)},
            tooltip() {return "<span style='color:#ffffff'>Why Did it Take So Long to Get to This One?</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        61: {    
            title: "Polynomial Upgrades",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Polynomial Upgrades</span></b><font size="2"><br>The First Upgrade 2 boosts An Upgrade for an Upgrade.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Glory", 54)},
            tooltip() {return "<span style='color:#ffffff'>Polynomial Upgrades</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        62: {    
            title: "Honored Unity",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honored Unity</span></b><font size="2"><br>Boost Prestigious Unity based on Honor.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(35),
            effect() {
                let eff = player.Honor.points.plus(1).log(150).plus(1).pow(0.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Glory", 61)},
            tooltip() {return "<span style='color:#ffffff'>Honored Unity</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        63: {    
            title: "Glorious Energy II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Energy II</span></b><font size="2"><br>Boost Energy gain based on total Glory.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(50),
            effect() {
                let eff = player.Glory.total.plus(1).log(25).plus(1).pow(4.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Glory", 62)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Energy II</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        64: {    
            title: "Energy Expansion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Energy Expansion</span></b><font size="2"><br>Unlocks a new column of Energy upgrades that cost both Energy and Glory to purchase.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(100),
            unlocked() {return hasUpgrade("Glory", 62)},
            tooltip() {return "<span style='color:#ffffff'>Energy Expansion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>These new upgrades are, of course, kept on Glory reset."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        71: {    
            title: "Anti-UI Spam",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Anti-UI Spam</span></b><font size="2"><br>Keep Rank milestones on Glory reset, and unlock a new one.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(250),
            unlocked() {return hasUpgrade("Energy", 44)},
            tooltip() {return "<span style='color:#ffffff'>Anti-UI Spam</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        72: {    
            title: "Is it Already Time?",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Is it Already Time?</span></b><font size="2"><br>Passively generate 25% of Glory gain on reset per second.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(675),
            unlocked() {return hasUpgrade("Glory", 71)},
            tooltip() {return "<span style='color:#ffffff'>Is it Already Time?</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        73: {    
            title: "Yes, It's Already Time",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Yes, It's Already Time</span></b><font size="2"><br>Passive Glory generation increased to 100%, remove the ability to perform the reset.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(2500),
            unlocked() {return hasUpgrade("Glory", 71)},
            tooltip() {return "<span style='color:#ffffff'>Yes, It's Already Time</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        74: {    
            title: "Amplifiers",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Amplifiers</span></b><font size="2"><br>Unlocks the namesake of this tab.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(12500),
            unlocked() {return hasUpgrade("Glory", 71)},
            tooltip() {return "<span style='color:#ffffff'>Amplifiers</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
       81: {    
            title: "Amplified Honor",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Amplified Honor</span></b><font size="2"><br>Amplifier 1 also boosts Honor, albeit at a slightly reduced rate.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(15000),
            effect() {
                let eff = buyableEffect('Glory', 11).pow(0.90).plus(1);
                return eff;
            },   
            unlocked() { return getBuyableAmount("Glory", 21).gte(7)},
            tooltip() {return "<span style='color:#ffffff'>Amplified Honor</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        82: {    
            title: "Amplified Glory",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Amplified Glory</span></b><font size="2"><br>Amplifier 1 also boosts Glory, albeit at a very reduced rate.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(62500),
            effect() {
                let eff = buyableEffect('Glory', 11).pow(0.25).plus(1);
                return eff;
            },   
            unlocked() { return getBuyableAmount("Glory", 31).gte(8)},
            tooltip() {return "<span style='color:#ffffff'>Amplified Glory</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
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
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        91: {    
            title: "Challenging Age",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Challenging Age</span></b><font size="2"><br>Unlocks Glory challenges.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1.50e10),
            unlocked() { return getBuyableAmount("Glory", 81).gte(18)},
            tooltip() {return "<span style='color:#ffffff'>Challenging Age</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#a14040',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6320a' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
    },
    
    buyables: {
        rows: 8,
        cols: 8,
        11: {
            display() {return `<font size="3"><b>Amplifier 1</b><font size="2"><br>Increases Prestige, Essence, and Energy gain by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 11).mul(1.5).plus(1)
                eff=eff.times(buyableEffect('Glory', 21))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 1<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(100).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 11))) setBuyableAmount('Glory', 11, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Glory", 74) },
    
        },
        21: {
            display() {return `<font size="3"><b>Amplifier 2</b><font size="2"><br>Increases Amplifier 1's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(1000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 21).mul(1.5).plus(1)
                eff=eff.times(buyableEffect('Glory', 31))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 2<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(1000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 21))) setBuyableAmount('Glory', 21, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 11).gte(12)},
    
        },
        31: {
            display() {return `<font size="3"><b>Amplifier 3</b><font size="2"><br>Increases Amplifier 2's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(2000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 31).mul(1.5).plus(1)
                eff = eff.times(buyableEffect('Glory', 41))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 3<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(2000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 31))) setBuyableAmount('Glory', 31, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 21).gte(10)},
    
        },
        41: {
            display() {return `<font size="3"><b>Amplifier 4</b><font size="2"><br>Increases Amplifier 3's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(10000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 41).mul(1.5).plus(1)
                eff = eff.times(buyableEffect('Glory', 51))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 4<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(10000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 41))) setBuyableAmount('Glory', 41, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 31).gte(20)},
    
        },
        51: {
            display() {return `<font size="3"><b>Amplifier 5</b><font size="2"><br>Increases Amplifier 4's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(50000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 51).mul(1.5).plus(1)
                eff = eff.times(buyableEffect('Glory', 61))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 5<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(50000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 51))) setBuyableAmount('Glory', 51, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 41).gte(19)},
    
        },
        61: {
            display() {return `<font size="3"><b>Amplifier 6</b><font size="2"><br>Increases Amplifier 5's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(250000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 61).mul(1.5).plus(1)
                eff = eff.times(buyableEffect('Glory', 71))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 6<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(250000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 61))) setBuyableAmount('Glory', 61, max.add(1).floor())
            },
        
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 51).gte(19)},
    
        },
        71: {
            display() {return `<font size="3"><b>Amplifier 7</b><font size="2"><br>Increases Amplifier 6's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(2500000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 71).mul(1.5).plus(1)
                eff = eff.times(buyableEffect('Glory', 81))
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 7<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(2500000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 71))) setBuyableAmount('Glory', 71, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 61).gte(19)},
    
        },
        81: {
            display() {return `<font size="3"><b>Amplifier 8</b><font size="2"><br>Increases Amplifier 7's power by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Glory</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(25000000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Glory', 81).mul(1.5).plus(1)
                return eff
            },   
            canAfford() { if (player.Glory.points.gte(this.cost())) {return true}},
            buy() {
                player.Glory.points = player.Glory.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            tooltip() {return "Amplifier 8<br>----------------<br>"},
            buyMax() {
                let max = player.Glory.points.div(this.cost(0)).add(25000000).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Glory', 81))) setBuyableAmount('Glory', 81, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#98a86c',
                    "width": "325px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Glory", 71).gte(17)},
    
        },
    },
    challenges: {
        11: {
            name: "Glory Challenge 1 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>Essence gain is divided by 1e70.<br>----------------",
            goalDescription() {return "2.25e44 Essence<br>----------------"},
            rewardDescription: "Unlocks Hindrance Spirit.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Glory', 91)},
            canComplete() {return player.points.gte(2.25e44)},
        },
        12: {
            name: "Glory Challenge 2 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>Prestige gain after 1e16 is divided by 1e70.<br>----------------",
            goalDescription() {return "1.00e33 Prestige<br>----------------"},
            rewardDescription: "Unlocks a row of Hindrance Spirit upgrades.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Hindrance', 23)},
            canComplete() {return player.Prestige.points.gte(1.00e33)},
        },
        13: {
            name: "Glory Challenge 3 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>Prestige Slowdown is 1e70 times stronger.<br>----------------",
            goalDescription() {return "5.00e42 Prestige<br>----------------"},
            rewardDescription: "Unlocks another row of Hindrance Spirit upgrades.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Hindrance', 33)},
            canComplete() {return player.Prestige.points.gte(5e42)},
        },
        21: {
            name: "Glory Challenge 4 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>Prestige Slog is re-enabled.<br>----------------",
            goalDescription() {return "5.00e166 Prestige<br>----------------"},
            rewardDescription: "Unlocks a new column of Hindrance Spirit upgrades.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Hindrance', 43)},
            canComplete() {return player.Prestige.points.gte(5e166)},
        },
        22: {
            name: "Glory Challenge 5 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>Levels are completely disabled.<br>----------------",
            goalDescription() {return "2.00e54 Essence<br>----------------"},
            rewardDescription: "Unlocks another new column of Hindrance Spirit upgrades.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Hindrance', 44)},
            canComplete() {return player.points.gte(2.00e54)},
        },
        23: {
            name: "Glory Challenge 6 <br>----------------",
            challengeDescription: "----------------<br><font size='3'>You cannot generate Essence.<br>----------------",
            goalDescription() {return "1.00e37 Prestige<br>----------------"},
            rewardDescription: "Unlocks a new row of Hindrance upgrades.",
            completionLimit: 1,
            unlocked() {return hasUpgrade('Hindrance', 45)},
            canComplete() {return player.Prestige.points.gte(1e37)},
        },
    },
     tabFormat: {
        "Glory": {
            content: [ 
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
                                function() {return '<span style="color:#ffcd7a">(Rank '+format(player.Rank.points)+')</span>'},
                                {"font-size": "14px"}],
                                ["display-text",
                                    function() {return '<span style="color:#c1ffee">('+format(player.Energy.points)+' Energy)</span>'},
                                    {"font-size": "14px"}],
                ["display-text",
                    function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                    {"color": "#faff92", "font-size": "32px"}],
                ['display-text',function(){return '<h4>You have <span style="color:#faff92">'+quickDoubleColor(formatWhole(player.Glory.points),'#faff92','#ffcd7a' ) +' <h3 class="glory">Glory</h3></span>.'}],
                ["raw-html", function() {if (hasUpgrade('Glory', 73)) return "<font size='5'>(+" + (format(getResetGain("Glory"))) + " Glory/s)"}],
                "blank",
                ["raw-html", function() {if (!hasMilestone("Rank", 13)) return 'To perform a Glory reset, you need the corresponding Rank milestone.'}],
                function() {if (hasMilestone("Rank", 13) && !hasUpgrade("Glory", 73)) return "prestige-button"},
                 "blank",
                 ["display-text",
                    function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                    {"color": "#faff92", "font-size": "32px"}],
                    
                    ["display-text",
                        function() {return "<span style='color:#faff92'>"+format(player.Honor.points)+" Honor</span>"},
                        {"color": "#faff92", "font-size": "19px"}],
                        ["display-text",
                            function() {return "<h3 class='glory'>"+format(player.Glory.total)+" total <h3 class='glory'>Glory</h3>"},
                            {"color": "#faff92", "font-size": "19px"}],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "<span style='color:#faff92'>----------Tier 2</span><span style='color:#ffcd7a'> Reset Layer----------</span>"},
                        {"color": "#faff92", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Glory resets <span style='color:#31aeb0'>Prestige</span> and <span style='color:#faff92'> Honor</span> features (<span style='color:#faff92'>Honor, Honor Upgrades, </span><span style='color:#ffcd7a'>Ranks, Rank Milestones, </span><span style='color:#c1ffee'>Energy, Energy Upgrades</span>) in exchange for <h3 class='glory'>Glory</h3> to boost progression further."},
                        {"font-size": "16px"}],
                        ["display-text",
                            function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                            {"color": "#faff92", "font-size": "32px"}],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                            
                            ["upgrades", [1]],
                            "blank",
                            ["upgrades", [2, 3]],
                            "blank",
                            ["upgrades", [4]],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                    
            ]
            
        },
        "Amplifiers": {
            unlocked() {return hasUpgrade('Glory', 41)},
            buttonStyle: {"border-color": "#ffcd7a"},
            content: [ 
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
                ['display-text',function(){return '<h4>You have <span style="color:#faff92">'+quickDoubleColor(formatWhole(player.Glory.points),'#faff92','#ffcd7a' ) +' <h3 class="glory">Glory</h3></span>.'}],
                ["raw-html", function() {if (hasUpgrade('Glory', 73)) return "<font size='5'>(+" + (format(getResetGain("Glory"))) + " Glory/s)"}],
                "blank",
                 "blank",
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                                "buyables",
                                ["raw-html", function() {if (hasUpgrade('Glory', 74) && !getBuyableAmount("Glory", 11).gte(12)) return "(Amplifier 2 Requirement: 12 First Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 11).gte(12) && !getBuyableAmount("Glory", 21).gte(7)) return "(New Glory upgrade unlocks at 7 Second Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 21).gte(7) && !getBuyableAmount("Glory", 21).gte(10)) return "(Amplifier 3 Requirement: 10 Second Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 21).gte(10) && !getBuyableAmount("Glory", 31).gte(8)) return "(New Glory upgrade unlocks at 8 Third Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 31).gte(8) && !getBuyableAmount("Glory", 31).gte(20)) return "(Amplifier 4 Requirement: 20 Third Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 31).gte(20) && !getBuyableAmount("Glory", 41).gte(19)) return "(Amplifier 5 Requirement: 19 Fourth Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 41).gte(19) && !getBuyableAmount("Glory", 51).gte(19)) return "(Amplifier 6 Requirement: 19 Fifth Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 51).gte(19) && !getBuyableAmount("Glory", 61).gte(19)) return "(Amplifier 7 Requirement: 19 Sixth Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 61).gte(19) && !getBuyableAmount("Glory", 71).gte(17)) return "(Amplifier 8 Requirement: 17 Seventh Amplifiers)"}],
                                ["raw-html", function() {if (getBuyableAmount("Glory", 71).gte(17) && !getBuyableAmount("Glory", 81).gte(18)) return "(Something unlocks at the bottom of this tab at 18 Eighth Amplifiers)"}],

                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                            
                                ["display-text",
                                    function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                                    {"color": "#faff92", "font-size": "32px"}],
                                    ["upgrades", [5, 6, 7, 8]],
                                    ["display-text",
                                        function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                                        {"color": "#faff92", "font-size": "32px"}],
                                        ["upgrades", [9]],
                    
            ]
            
        },
        "Challenges": {
            unlocked() {return hasUpgrade('Glory', 91)},
            content: [ 
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
                        function() {return "<span style='color:#faff92'>----------Chall</span><span style='color:#ffcd7a'>enges----------</span>"},
                        {"color": "#faff92", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Challenges are a test to see how far your production can go even when heavily hindered by nerfs. Entering one forces a Glory reset!"},
                        {"font-size": "18px"}],
                        ["display-text",
                            function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                            {"color": "#faff92", "font-size": "32px"}],
                    "challenges",
                    
            ]
            
        },
        "Hindrance Spirit": {
            unlocked() {return new Decimal(challengeCompletions('Glory', 11)).gte(1)},
            buttonStyle: {"border-color": "#a14040"},
            embedLayer: 'Hindrance',
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