addLayer("Prestige", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        accumulatorfixes: new Decimal(0)
    }},
    color: "#31aeb0",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    resetDescription: "Reset Essence, but gain Prestige.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Prestige<br>――――――――――――――<br> <font size='2'><span style='color:#31aeb0'> " +formatWhole(player.Prestige.points)+" Prestige</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("Prestige", 21)) mult = mult.times(upgradeEffect("Prestige", 21))
        if (hasUpgrade("Prestige", 23)) mult = mult.times(upgradeEffect("Prestige", 23))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    milestones: {
    },
    upgrades: {        
        11: {
            fullDisplay() {return `<font size="2"><b>[P11] Begin</b><font size="1"><br>Passively generate 1 Essence per second.<br>――――――――――――――――――<br>
                Effect: `+formatSmall(getPointGen())+`/s <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return true },
            tooltip() {return "<span style='color:#ffffff'>[P11] Begin</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            cost: new Decimal(1),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
        12: {
            fullDisplay() {return `<font size="2"><b>[P12] Prestige Boost</b><font size="1"><br>Prestige Points boost Essence generation.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return (hasUpgrade("Prestige", 11)) },
            tooltip() {return "<span style='color:#ffffff'>[P12] Prestige Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            effect() {
              	let eff = player.Prestige.points.plus(2).pow(0.3);
                return eff
            },
            cost: new Decimal(1),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
        13: {
            fullDisplay() {return `<font size="2"><b>[P13] Self-Synergy</b><font size="1"><br>Essence boosts it's own generation.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return (hasUpgrade("Prestige", 12)) },
            tooltip() {return "<span style='color:#ffffff'>[P13] Self-Synergy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            effect() {
                let eff = player.points.plus(1).log10().pow(0.50).plus(1);
                return eff
            },
            cost: new Decimal(3),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
        21: {
            fullDisplay() {return `<font size="2"><b>[P21] More Prestige</b><font size="1"><br>Boost Prestige gain by `+formatWhole(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return (hasUpgrade("Prestige", 13)) },
            tooltip() {return "<span style='color:#ffffff'>[P21] More Prestige</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            effect() {
                eff = new Decimal(2)
                return eff
            },
            cost: new Decimal(7),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
        22: {
            fullDisplay() {return `<font size="2"><b>[P22] Upgrade Power</b><font size="1"><br>Essence generation is faster based on Prestige upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return (hasUpgrade("Prestige", 21)) },
            tooltip() {return "<span style='color:#ffffff'>[P22] Upgrade Power</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            effect() {
				let eff = Decimal.pow(1.2, player.Prestige.upgrades.length);
                return eff
            },
            cost: new Decimal(20),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
        23: {
            fullDisplay() {return `<font size="2"><b>[P23] Reverse Prestige Boost</b><font size="1"><br>Prestige Point gain is boosted by your Essence.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+formatWhole(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            unlocked() { return (hasUpgrade("Prestige", 22)) },
            tooltip() {return "<span style='color:#ffffff'>[P23] Reverse Prestige Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            effect() {
				let eff = player.points.plus(1).log10().cbrt().plus(1);
                return eff
            },
            cost: new Decimal(100),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#BFFF94',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "150px",
            "height": "150px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                'background-color': '#31aeb0',
                'color': 'black',
                        "width": "150px",
            "height": "150px",
                    }
                }
            },
        },
    },
     tabFormat: {
        "Prestige": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+formatWhole(player.Prestige.points)+' Prestige'},
            {"color": "#31aeb0", "font-size": "30px"}],
            ["raw-html", function() {if (hasUpgrade("Prestige", 111111)) return "<font size='4'>(+" + (format(getResetGain("Prestige"))) + " Prestige/s)"}, {"font-size": "30px", "color": "#ffffff",}],                  
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#31aeb0", "font-size": "32px"}],
                                    function() {if (!hasUpgrade("Prestige", 111111)) return "prestige-button"},
                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#31aeb0", "font-size": "32px"}],
                    "blank",
                           "upgrades",

                ]
            
        },
    },
})