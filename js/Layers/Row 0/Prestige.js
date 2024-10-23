addLayer("Prestige", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#31aeb0",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    resetDescription: "Form Essence into Prestige.<br>----------<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Prestige<br>----------------<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Essence</span>"
        if(player.Prestige.total.gte(1)) tooltip = tooltip + "<br><span style='color:#31aeb0'>"+formatWhole(player.Prestige.points)+" Prestige</font>"
        if(player.Level.total.gte(1)) tooltip = tooltip + "<br><span style='color:#69c0f6'>Level "+formatWhole(player.Level.points)+"</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Prestige', 41)) mult = mult.times(upgradeEffect('Prestige', 41))
        if (hasUpgrade('Prestige', 43)) mult = mult.times(upgradeEffect('Prestige', 43))
        if (hasUpgrade('Level', 11)) mult = mult.times(upgradeEffect('Level', 11))
        if (hasUpgrade('Prestige', 24)) mult = mult.times(upgradeEffect('Prestige', 24))
        if (hasUpgrade('Honor', 11)) mult = mult.times(upgradeEffect('Honor', 11))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Level', 22)) return 1
        if (hasUpgrade('Level', 21)) return 0.25
        if (hasUpgrade('Level', 13)) return 0.05
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
        if (hasUpgrade('Honor', 33) && hasUpgrade('Prestige', 61) ) keptUpgrades.push(61)
        if (hasUpgrade('Honor', 33) && hasUpgrade('Prestige', 62) ) keptUpgrades.push(62)
        if (hasUpgrade('Honor', 33) && hasUpgrade('Prestige', 63) ) keptUpgrades.push(63)
        if (hasUpgrade('Honor', 33) && hasUpgrade('Prestige', 64) ) keptUpgrades.push(64)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Essence",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Essence</span></b><font size="2"><br>Start generating Essence.<br>-------------<br>Currently: `+format(getPointGen()) +`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>Essence</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#cfcccc',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#B9B9AF' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#d3ff81' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
        21: {    
            title: "The First Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>The First Upgrade</span></b><font size="2"><br>Increases Essence gain.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(1.50)
                if (hasUpgrade('Prestige', 22)) effect = effect.times(upgradeEffect('Prestige', 22))
                if (hasUpgrade('Prestige', 42)) effect = effect.times(upgradeEffect('Prestige', 31).pow(0.30))
                if (hasUpgrade('Prestige', 61)) effect = effect.times(upgradeEffect('Prestige', 61))
                return effect
              },   
            unlocked() {return hasUpgrade("Prestige", 11)},
            tooltip() {return "<span style='color:#ffffff'>The First Upgrade</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        22: {    
            title: "An Upgrade for an Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>An Upgrade for an Upgrade</span></b><font size="2"><br>Increases the power of The First Upgrade.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(3),
            effect() {
                effect = new Decimal(1.35)
                if (hasUpgrade('Prestige', 23)) effect = effect.times(upgradeEffect('Prestige', 23))
                return effect
              },   
            unlocked() {return hasUpgrade("Prestige", 21)},
            tooltip() {return "<span style='color:#ffffff'>An Upgrade for an Upgrade</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        23: {    
            title: "Upgrade Essence",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Upgrade Essence</span></b><font size="2"><br>Boosts the previous upgrade based on Prestige upgrades purchased.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(5),
            effect() {
                let eff = Decimal.pow(1.10, player.Prestige.upgrades.length);
                if (hasUpgrade("Honor", 13)) eff = eff.times(upgradeEffect("Honor", 13))
                return eff;
            },
            unlocked() {return hasUpgrade("Prestige", 22)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Essence</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        31: {    
            title: "Self-Synergism",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Self-Synergism</span></b><font size="2"><br>Essence boosts it's own gain.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(10),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                if (hasUpgrade('Prestige', 61)) eff = eff.times(upgradeEffect('Prestige', 61))
                return eff;
            },
            unlocked() {return hasUpgrade("Prestige", 23)},
            tooltip() {return "<span style='color:#ffffff'>Self-Synergism</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>No incremental is complete without an upgrade like this."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        32: {    
            title: "Prestige Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige Boost</span></b><font size="2"><br>Boost Essence based on Prestige.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(15),
            effect() {
                let eff = player.Prestige.points.plus(2).pow(0.1);
                //if (player.Prestige.points.gte(1000)) eff = eff.times(0.5)
                return eff;
            },
            unlocked() {return hasUpgrade("Prestige", 31)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Boost</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Weaker after some Prestige."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        33: {    
            title: "Improved Upgrade Essence",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Improved Upgrade Essence</span></b><font size="2"><br>Upgrade Essence also directly affects Essence generation.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(20),
            unlocked() {return hasUpgrade("Prestige", 32)},
            tooltip() {return "<span style='color:#ffffff'>Improved Upgrade Essence</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        41: {    
            title: "Reverse Prestige Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Reverse Prestige Boost</span></b><font size="2"><br>Boost Prestige based on Essence.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(60),
            effect() {
                let eff = player.points.plus(1).log(8).pow(0.55).plus(1);
                if (hasUpgrade('Prestige', 61)) eff = eff.times(upgradeEffect('Prestige', 61))
                return eff;
            },
            unlocked() {return hasUpgrade("Prestige", 33)},
            tooltip() {return "<span style='color:#ffffff'>Reverse Prestige Boost</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        42: {    
            title: "Upgrade Synergism",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Upgrade Synergism</span></b><font size="2"><br>Self-Synergism also affects The First Upgrade, at a reduced rate.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(110),
            unlocked() {return hasUpgrade("Prestige", 41)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Synergism</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        43: {    
            title: "Just a Prestige Boost",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Just a Prestige Boost</span></b><font size="2"><br>Increases Prestige gain.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(210),
            unlocked() {return hasUpgrade("Prestige", 42)},
            effect() {
                effect = new Decimal(2.5)
                if (hasUpgrade('Prestige', 34)) effect = effect.times(upgradeEffect('Prestige', 34))
                return effect
              },   
            tooltip() {return "<span style='color:#ffffff'>Just a Prestige Boost</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        51: {    
            title: "To the Next Level",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>To the Next Level</span></b><font size="2"><br>Unlock Levels.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade("Prestige", 43)},
            tooltip() {return "<span style='color:#ffffff'>To the Next Level</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
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
                    'background-color': '#d3ff81' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
        24: {    
            title: "Prestige Synergism",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige Synergism</span></b><font size="2"><br>Prestige boosts itself.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(30000000),
            effect() {
                let eff = player.Prestige.points.plus(1).log10().pow(0.75).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Level", 23)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Synergism</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        34: {    
            title: "Prestige Infusion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige Infusion</span></b><font size="2"><br>Just a Prestige Boost is boosted based on Essence.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(250000000),
            effect() {
                let eff = player.points.plus(1).log(5).pow(0.50).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Prestige", 24)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Infusion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        44: {    
            title: "Essence-Powered Levels",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige-Powered Levels</span></b><font size="2"><br>Divides Level's Prestige requirement based on Essence.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`÷<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1.75e9),
            effect() {
                let eff = player.points.plus(2).pow(0.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Prestige", 34)},
            tooltip() {return "<span style='color:#ffffff'>Prestige-Powered Levels</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        61: {    
            title: "Column Leader",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Column Leader</span></b><font size="2"><br>The first three upgrades in the first column are boosted based on total Honor.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Prestige)+`<span style='color:#000000'> Prestige</span> and `+format(tmp[this.layer].upgrades[this.id].costs.Honor)+` Honor`},        
            costs: {
                Prestige: 1.00e14,
                Honor: 15,
              },
              canAfford() {
                return player.Prestige.points.gte(this.costs.Prestige)
                    && player.Honor.points.gte(this.costs.Honor)
              },
              pay() {
                player.Prestige.points = player.Prestige.points.minus(this.costs.Prestige);
                player.Honor.points = player.Honor.points.minus(this.costs.Honor);
              },
            effect() {
                let eff = player.Honor.total.plus(1).log(10).pow(1.10);
                return eff;
            },      
            unlocked() {return hasUpgrade("Honor", 33)},
            tooltip() {return "<span style='color:#ffffff'>Column Leader</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#00fff7' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "Prestige": {
            content: [
                ["display-text",
                    function() {return ''+format(player.points)+' Essence'},
                    {"font-size": "30px"}],
                    ["display-text",
                        function() {return '(+'+formatSmall(getPointGen())+' Essence/s)'},
                        {"font-size": "17px"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#31aeb0", "font-size": "32px"}],
                ['display-text',function(){return '<h4>You have <span style="color:#31aeb0">'+quickBigColor(format(player.Prestige.points),'#31aeb0') +' Prestige</span>.'}],
                ["raw-html", function() {if (hasUpgrade("Level", 22)) return "<font size='4'>(+" + (format(getResetGain("Prestige"))) + " Prestige/s)"}],
                "blank",
                function() {if (!hasUpgrade("Level", 22)) return "prestige-button"},
                 "blank",

                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#31aeb0", "font-size": "32px"}],
                            ["upgrades", [1]],
                            "blank",
                            ["upgrades", [2, 3, 4, 6]],
                            "blank",
                            ["raw-html", function() {if (hasUpgrade("Honor", 33)) return "<span style='color:#faff92'>"+format(player.Honor.points)+" current Honor</span>"}],
                            "blank",
                            ["upgrades", [5]],
                    
            ]
            
        },
       "Level": {
            unlocked() {return hasUpgrade('Prestige', 51)},
            buttonStyle: {"border-color": "#69c0f6"},
            embedLayer: 'Level',
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