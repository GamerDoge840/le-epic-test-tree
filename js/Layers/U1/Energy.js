addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#f4ffd9",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image':('radial-gradient(circle at center, #bebe8e, #f4ffd9'),
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("0.1"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    resetDescription: "Reset Essence, but gain Prestige.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Energy<br>――――――――――――――<br> <font size='2'><span style='color:#f4ffd9'> " +format(player.points)+" Energy</span>"
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
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    milestones: {
    },
    upgrades: {
        11: {
            fullDisplay() {return `<font size="2"><b>[E11] Vacuumic Extraction</b><font size="1"><br>Enables Energy generation.<br>――――――――――――――――――<br>
                Effect: `+formatSmall(getPointGen())+`/s <br>――――――――――――――――――<br>
                Cost: Free`},        
            unlocked() { return true },
            cost: new Decimal(0),
            tooltip() {return "<span style='color:#ffffff'>[E11] Vacuumic Extraction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
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
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        }, 
        12: {
            fullDisplay() {return `<font size="2"><b>[E12] Friction</b><font size="1"><br>Boost Energy gain based on Energy upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},        
            unlocked() { return hasUpgrade("e", 11) },
            effect() {
                let eff = Decimal.pow(1.25, player.e.upgrades.length);
                scpow = 0.25
                eff = softcap(eff, new Decimal("100"), scpow)
                return eff
            },
            cost: new Decimal(0.0050),
            tooltip() {return "<span style='color:#ffffff'>[E12] Friction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
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
                'background-color': '#bebe8e',
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
     tabFormat: {
        "Energy": {
        style() {return  {'background-color': '#12120F'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Energy'},
            {"color": "#f4ffd9", "font-size": "30px"}],
            ["display-text",
            function() {return '('+formatSmall(getPointGen())+'/s)'},
            {"color": "#f4ffd9", "font-size": "20px"}],
                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "EnergyTabs"],

                ]
            
        },
    },
        microtabs: {
            EnergyTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})