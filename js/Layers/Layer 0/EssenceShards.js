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
    requires: new Decimal("1.25"), // Can be a function that takes requirement increases into account
    baseResource: "Essence", // Name of resource prestige is based on
    resource: "Essence Shards", // Name of prestige currency
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('EssenceShards', 22)) mult = mult.times(upgradeEffect('EssenceShards', 22))
        if (hasUpgrade('EssenceShards', 31)) mult = mult.times(upgradeEffect('EssenceShards', 31))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("Essence", 112)},
    passiveGeneration() {
        if (hasUpgrade('EssenceShards', 32)) return 0.10
	return 0
    },
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Broken Booster",
            fullDisplay() {return `<font size="3"><b>[ES11] Broken Booster</b><font size="2"><br>Increases Essence gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(1.25)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(2)) effect = effect.times(1.250)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(4)) effect = effect.times(1.250)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(6)) effect = effect.times(1.250)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(8)) effect = effect.times(1.250)
                if (hasUpgrade('EssenceShards', 12) && player.EssenceShards.total.gte(10)) effect = effect.times(1.250)
                if (hasUpgrade('EssenceShards', 33)) effect = effect.times(upgradeEffect('EssenceShards', 33))
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
            fullDisplay() {return `<font size="3"><b>[ES12] Booster Reinforcement</b><font size="2"><br>For every 2 total Essence Shards made until 10, boost ES11 by 1.250x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
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
            title: "Shard Reformation",
            fullDisplay() {return `<font size="3"><b>[ES13] Shard Reformation</b><font size="2"><br>Boost Essence gain based on total Essence Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(9),
            effect() {
                let eff = player.EssenceShards.total.plus(2).pow(0.10);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 12)},
            tooltip() {return "<span style='color:#ffffff'>Shard Reformation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Broken Upgrader",
            fullDisplay() {return `<font size="3"><b>[ES21] Broken Upgrader</b><font size="2"><br>Boost E21 based on Essence Shard upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(6),
            effect() {
                let eff = Decimal.pow(1.06, player.EssenceShards.upgrades.length);
                return eff;
            },
            unlocked() {return hasUpgrade("EssenceShards", 13)},
            tooltip() {return "<span style='color:#ffffff'>Broken Upgrader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Improved Shards",
            fullDisplay() {return `<font size="3"><b>[ES22] Improved Shards</b><font size="2"><br>Boost Essence Shard gain based on Essence.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(8),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.75).plus(1);
                if (hasUpgrade('EssenceShards', 23)) eff = eff.times(1.5)
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 21)},
            tooltip() {return "<span style='color:#ffffff'>Improved Shards</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Softcap Delayer",
            fullDisplay() {return `<font size="3"><b>[ES23] Softcap Delayer</b><font size="2"><br>E11's softcap starts later, from 40 --> 100, and boost ES22 by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(12),
            unlocked() {return hasUpgrade("EssenceShards", 22)},
            tooltip() {return "<span style='color:#ffffff'>Softcap Delayer</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Broken Synergism",
            fullDisplay() {return `<font size="3"><b>[ES31] Broken Synergism</b><font size="2"><br>Boost Essence Shard gain based on their own total amount.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(18),
            effect() {
                let eff = player.EssenceShards.total.plus(1).log10().pow(0.35).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 23)},
            tooltip() {return "<span style='color:#ffffff'>Broken Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Shard Generation",
            fullDisplay() {return `<font size="3"><b>[ES32] Shard Generation</b><font size="2"><br>Passively generate 10% of Essence Shard gain per second, and disable it's reset button.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(60),
            unlocked() {return hasUpgrade("EssenceShards", 31)},
            tooltip() {return "<span style='color:#ffffff'>Shard Generation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        33: {    
            title: "Booster Reinforcement II",
            fullDisplay() {return `<font size="3"><b>[ES33] Booster Reinforcement II</b><font size="2"><br>Current amount of Essence Shards boosts ES11.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(300),
            effect() {
                let eff = player.EssenceShards.points.plus(2).pow(0.05);
                return eff;
            }, 
            unlocked() {return hasUpgrade("EssenceShards", 32)},
            tooltip() {return "<span style='color:#ffffff'>Booster Reinforcement II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Also unlocks a new column of Essence upgrades."},
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
        ["raw-html", function() {if (hasUpgrade("EssenceShards", 32)) return '('+format(player.points)+' Essence)'}, {"font-size": "17px"}],
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#666363", "font-size": "32px"}],
["display-text",
            function() {return ''+format(player.EssenceShards.points)+' Essence Shards'},
            {"color": "#666363", "font-size": "30px"}],
                ["raw-html", function() {if (hasUpgrade("EssenceShards", 32)) return "<font size='4'>(+" + (format(getResetGain("EssenceShards").div(10))) + "/s)"}, {"color": "#666363",}],

                    ["raw-html", function() {if (!hasUpgrade("EssenceShards", 32)) return "―――――――――――――――――――――――――――――"}, {"color": "#666363", "font-size": "30px"}],                  
                        function() {if (!hasUpgrade("EssenceShards", 32)) return "prestige-button"},
                        "blank",
                        ["raw-html", function() {if (!hasUpgrade("EssenceShards", 32)) return '('+format(player.points)+' Essence)'}, {"font-size": "17px"}],
                        ["raw-html", function() {if (player.EssenceShards.total.gte(1) && !hasUpgrade("EssenceShards", 32)) return '('+formatWhole(player.EssenceShards.total)+' total Essence Shards)'}, {"color": "#666363", "font-size": "17px"}],

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
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13],]]]],
                        ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23],]]]],
                        ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33],]]]],
                        "blank"


                    ]
                },
            }
        },
})