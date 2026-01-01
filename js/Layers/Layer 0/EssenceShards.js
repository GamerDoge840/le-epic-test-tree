addLayer("EssenceShards", {
    name: "EssenceShards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasUpgrade("Essence", 112)},
		points: new Decimal(0),
    }},
    color: "#666363",
    nodeStyle() {
        return {
            'border': '5px solid #666363',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("0.15"), // Can be a function that takes requirement increases into account
    baseResource: "Essence", // Name of resource prestige is based on
    resource: "Essence Shards", // Name of prestige currency
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('EssenceShards', 23)) mult = mult.times(upgradeEffect('EssenceShards', 23))
        if (hasUpgrade('EssenceShards', 14)) mult = mult.times(upgradeEffect('EssenceShards', 14))
        if (hasUpgrade('Purity', 12)) mult = mult.times(1.50)
        if (hasUpgrade('Purity', 31)) mult = mult.times(upgradeEffect('Purity', 31))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Essence', 41) && hasUpgrade("Essence", 112)) return 0.15
        if (hasUpgrade('Purity', 22) && hasUpgrade("Essence", 112)) return 0.05
	return 0
    },
    milestones: {
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        if (hasUpgrade('Essence', 44) && hasUpgrade('EssenceShards', 31) ) keptUpgrades.push(31)
        if (hasUpgrade('Essence', 44) && hasUpgrade('EssenceShards', 32) ) keptUpgrades.push(32)
        if (hasUpgrade('Essence', 44) && hasUpgrade('EssenceShards', 33) ) keptUpgrades.push(33)
        if (hasUpgrade('Essence', 44) && hasUpgrade('EssenceShards', 34) ) keptUpgrades.push(34)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        111: {    
            title: "Discovery of Purity",
            fullDisplay() {return `<font size="3"><b>[ES01] Discovery of Purity</b><font size="2"><br>Unlocks the first prestige layer.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 100,
                EssenceShards: 250,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence)
                    && player.EssenceShards.points.gte(this.costs.EssenceShards)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
              },
            unlocked() {return hasUpgrade("EssenceShards", 24)},
            tooltip() {return "<span style='color:#ffffff'>Discovery of Purity</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E6FCFC',
                    "width": "200px",
            "height": "165px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#FFFFFF, #E6FCFC)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#E6FCFC' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': '#E6FCFC',
                'box-shadow':'0px 0px 15px #E6FCFC'
                //'background': 'linear-gradient(#fcf4e1, #ffcd7a)',

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#E6FCFC' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#8eff00',
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        11: {    
            title: "Broken Booster",
            fullDisplay() {return `<font size="3"><b>[ES11] Broken Booster</b><font size="2"><br>Increases Essence gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(1.25)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(2)) effect = effect.times(1.150)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(4)) effect = effect.times(1.150)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(6)) effect = effect.times(1.150)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(8)) effect = effect.times(1.150)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(10)) effect = effect.times(1.150)
                if (hasUpgrade('Essence', 24)) effect = effect.times(upgradeEffect('Essence', 24))
                if (hasUpgrade('Essence', 34)) effect = effect.times(upgradeEffect('Essence', 34))
                if (hasUpgrade('Purity', 21)) effect = effect.times(upgradeEffect('Purity', 21))
                return effect
              },  
            unlocked() {return player.EssenceShards.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Broken Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Booster Reinforcement",
            fullDisplay() {return `<font size="3"><b>[ES12] Booster Reinforcement</b><font size="2"><br>For every 2 total Essence Shards made until 10, boost ES11 by 1.150x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("EssenceShards", 11)},
            tooltip() {return "<span style='color:#ffffff'>Booster Reinforcement</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Something Repeatable",
            fullDisplay() {return `<font size="3"><b>[ES13] Something Repeatable</b><font size="2"><br>Unlocks an Essence buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("EssenceShards", 12)},
            tooltip() {return "<span style='color:#ffffff'>Something Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Shard Self-Synergism",
            fullDisplay() {return `<font size="3"><b>[ES14] Shard Self-Synergism</b><font size="2"><br>Boost Essence Shards based on their current (not total) amount.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(100),
            effect() {
                let eff = player.EssenceShards.points.plus(2).pow(0.08);
                return eff;
            }, 
            unlocked() {return hasUpgrade("Essence", 34)},
            tooltip() {return "<span style='color:#ffffff'>Shard Self-Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Shard-Powered Upgrade",
            fullDisplay() {return `<font size="3"><b>[ES21] Shard-Powered Upgrade</b><font size="2"><br>E13 is boosted based on Essence Shard upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(12),
            effect() {
                let eff = Decimal.pow(1.02, player.EssenceShards.upgrades.length);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 13)},
            tooltip() {return "<span style='color:#ffffff'>Shard-Powered Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Essence Reformation",
            fullDisplay() {return `<font size="3"><b>[ES22] Essence Reformation</b><font size="2"><br>Essence is boosted based on total Essence Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(15),
            effect() {
                let eff = player.EssenceShards.total.plus(2).pow(0.05);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 21)},
            tooltip() {return "<span style='color:#ffffff'>Essence Reformation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Better Breaking",
            fullDisplay() {return `<font size="3"><b>[ES23] Better Breaking</b><font size="2"><br>Essence Shard gain is boosted based on Essence.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(20),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.8).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("EssenceShards", 22)},
            tooltip() {return "<span style='color:#ffffff'>Better Breaking</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ABFF8A'>Also unlocks a new column of Essence upgrades!"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Essence Reformation II",
            fullDisplay() {return `<font size="3"><b>[ES24] Essence Reformation II</b><font size="2"><br>Current Essence Shards boosts Essence.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(200),
            effect() {
                let eff = player.EssenceShards.points.plus(2).pow(0.05);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 14)},
            tooltip() {return "<span style='color:#ffffff'>Essence Reformation II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
            title: "Synergistic Recursion",
            fullDisplay() {return `<font size="3"><b>[ES31] Synergistic Recursion</b><font size="2"><br>E21 boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` ES and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                EssenceShards: 40000,
                Purity: 30,
              },
              canAfford() {
                return player.EssenceShards.points.gte(this.costs.EssenceShards)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
              effect() {
                let eff = upgradeEffect('Essence', 21).pow(0.15);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 44)},
            tooltip() {return "<span style='color:#ffffff'>Synergistic Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
        32: {    
            title: "Booster Restoration",
            fullDisplay() {return `<font size="3"><b>[ES32] Booster Restoration</b><font size="2"><br>E34 is boosted based on current Essence Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` ES and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                EssenceShards: 1e1000,
                Purity: 30,
              },
              canAfford() {
                return player.EssenceShards.points.gte(this.costs.EssenceShards)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
              effect() {
                let eff = player.EssenceShards.points.plus(2).pow(0.01);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 31)},
            tooltip() {return "<span style='color:#ffffff'>Booster Restoration</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
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
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: [
        ["raw-html", function() {if (hasUpgrade("Essence", 44)) return '('+formatWhole(player.Purity.points)+'  Pure Essence)'}, {"color": "#E6FCFC", "font-size": "19px"}],
["display-text",
            function() {return '('+format(player.points)+' Essence)'},
            {"font-size": "19px"}],        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#666363", "font-size": "32px"}],
["display-text",
            function() {return ''+format(player.EssenceShards.points)+' Essence Shards'},
            {"color": "#666363", "font-size": "30px"}],
                ["raw-html", function() {if (hasUpgrade("Essence", 41)) return "<font size='4'>(+" + (format(getResetGain("EssenceShards").dividedBy(6.666))) + "/s)"}, {"color": "#666363",}],
                ["raw-html", function() {if (hasUpgrade("Purity", 22) && !hasUpgrade("Essence", 41)) return "<font size='4'>(+" + (format(getResetGain("EssenceShards").dividedBy(20))) + "/s)"}, {"color": "#666363",}],
                    ["raw-html", function() {if (!hasUpgrade("Purity", 22)) return "―――――――――――――――――――――――――――――"}, {"color": "#666363", "font-size": "30px"}],                  
                        function() {if (!hasUpgrade("Purity", 22) && hasUpgrade("Essence", 112)) return "prestige-button"},
                    ["raw-html", function() {if (!hasUpgrade("Essence", 112) && !hasUpgrade("Purity", 22)) return 'You need E02 to Break Essence.'}, {"font-size": "22px"}],
                        "blank",
                        ["raw-html", function() {if (!hasUpgrade("Purity", 22)) return '('+formatWhole(player.EssenceShards.total)+' total Essence Shards)'}, {"color": "#666363", "font-size": "17px"}],

            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#666363", "font-size": "32px"}],

                                           ["microtabs", "EssenceShardTabs"],

            
                            ],
        microtabs: {
            EssenceShardTabs: {
                "Upgrades": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ]]]],
                        ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],]]]],
                        ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 111]]]]],
                        "blank",


                    ]
                },
            }
        },
})