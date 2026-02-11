addLayer("Essence", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        accumulatorImprovements: new Decimal(0),
        bestEssence: new Decimal(0.0000000000001),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(200deg, #FFFFFF, #818281)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Essence<br>――――――――――――――<br> <font size='2'></span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    update(delta){
        //Get best Essence
        if (player.Essence.bestEssence.lt(player.points) && hasUpgrade("Essence", 11) ) player.Essence.bestEssence = player.points
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
        11: {
            fullDisplay() {return `<font size="2"><b>[E11] Genesis</b><font size="1"><br>Enables Essence generation.<br>――――――――――――――――――<br>
                Effect: `+formatSmall(getPointGen())+`/s <br>――――――――――――――――――<br>
                Cost: Free`},        
            unlocked() { return true },
            cost: new Decimal(0),
            tooltip() {return "<span style='color:#ffffff'>[E11] Genesis</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            fullDisplay() {return `<font size="2"><b>[E12] First Upgrade</b><font size="1"><br>Boost Essence gain based on Essence upgrades bought.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 11) },
            effect() {
                let eff = Decimal.pow(1.25, player.Essence.upgrades.length);
                if (hasUpgrade('Essence', 21)) eff = eff.times(upgradeEffect('Essence', 21))
                if (hasUpgrade('Essence', 24)) eff = eff.times(upgradeEffect('Essence', 24))
                scpow = 0.25
                eff = softcap(eff, new Decimal("100"), scpow)
                return eff
            },
            cost: new Decimal(1.5),
            tooltip() {return "<span style='color:#ffffff'>[E12] First Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>Upgrade effect softcapped after 100x."},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay() {return `<font size="2"><b>[E13] Self-Synergism</b><font size="1"><br>Essence boosts itself.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 12) },
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                return eff;
            },
            cost: new Decimal(3),
            tooltip() {return "<span style='color:#ffffff'>[E13] Self-Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay() {return `<font size="2"><b>[E14] Levels</b><font size="1"><br>Unlock the Levels layer.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 13) },
            cost: new Decimal(7.5),
            tooltip() {return "<span style='color:#ffffff'>[E14] Levels</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {
            fullDisplay() {return `<font size="2"><b>[E21] Level-Powered Upgrade</b><font size="1"><br>Boost E12's effect based on owned Level Milestones.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 14) && hasMilestone("Level", 2)  },
            effect() {
                let eff = Decimal.pow(1.20, player.Level.milestones.length);
                return eff
            },
            cost: new Decimal(75),
            tooltip() {return "<span style='color:#ffffff'>[E21] Level-Powered Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {
            fullDisplay() {return `<font size="2"><b>[E22] Level-Essence Synergism</b><font size="1"><br>Divide Level requirement based on Essence.<br>――――――――――――――――――<br>
                Effect: /`+format(upgradeEffect(this.layer, this.id))+` <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 21) },
            effect() {
                let eff = player.points.plus(2).pow(0.10);
                return eff;
            }, 
            cost: new Decimal(250),
            tooltip() {return "<span style='color:#ffffff'>[E22] Level-Essence Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {
            fullDisplay() {return `<font size="2"><b>[E23] Apple-Essence Synergism</b><font size="1"><br>Boost Essence gain based on Apples.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 22) && hasMilestone("Level", 5)},
            effect() {
                let eff = player.Fruits.apples.plus(1).pow(0.07);
                return eff;
            }, 
            cost: new Decimal(20000),
            tooltip() {return "<span style='color:#ffffff'>[E23] Apple-Essence Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {
            fullDisplay() {return `<font size="2"><b>[E24] Apple-Upgrade Synergism</b><font size="1"><br>Boost E12 based on amount of Apples.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 23)},
            effect() {
                let eff = player.Fruits.apples.plus(1).pow(0.05);
                return eff;
            }, 
            cost: new Decimal(40000),
            tooltip() {return "<span style='color:#ffffff'>[E24] Apple-Upgrade Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
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
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    challenges: {

    },
    buyables: {
    },
     tabFormat: {
        "Incremental Origin": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Essence'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            ["raw-html", function() {if (hasUpgrade("Essence", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+"/s)"}, {"font-size": "30px"}],                  
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],  ]]]],
                    ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],  ]]]],
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                ]
            
        },
    },
})