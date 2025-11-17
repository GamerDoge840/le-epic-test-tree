addLayer("Purity", {
    name: "Purity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasUpgrade("EssenceShards", 111)},
		points: new Decimal(0),
    }},
    color: "#E6FCFC",
    nodeStyle() {
        return {
            'border': '2px solid #FFFFFF',
            'background-image': 'radial-gradient(circle at center, #FFFFFF, #E6FCFC',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("250"), // Can be a function that takes requirement increases into account
    resource: "Pure Essence", // Name of prestige currency
    branches: ["Essence"],
    resetDescription: "Purify all Essence.<br>――――――――――――――――<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.17, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Purity<br>――――――――――――――<br> <font size='2'><span style='color:#E6FCFC'> " +formatWhole(player.Purity.points)+" Pure Essence</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '1', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("EssenceShards", 111) || player.Purity.total.gte(1)},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Purity Booster",
            fullDisplay() {return `<font size="3"><b>[P11] Purity Booster</b><font size="2"><br>Increases Essence gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence Shards`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(2.25)
                return effect
              },  
            unlocked() {return player.Purity.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Purity Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#FFFFFF, #E6FCFC)',

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
     tabFormat: {
        "Pure Essence": {
        content: [
            ["display-text",
            function() {return '('+format(player.points)+' Essence)'},
            {"font-size": "19px"}],
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#E6FCFC", "font-size": "32px"}],
         ["display-text",
            function() {return ''+format(player.Purity.points)+' Pure Essence'},
            {"color": "#E6FCFC", "font-size": "30px"}],
                    ["raw-html", function() {if (!hasUpgrade("EssenceShards", 1112)) return "―――――――――――――――――――――――――――――"}, {"color": "#E6FCFC", "font-size": "30px"}],                  
                    function() {if (hasUpgrade("EssenceShards", 111) && !hasUpgrade("Purity", 1111)) return "prestige-button"},
                    ["raw-html", function() {if (!hasUpgrade("EssenceShards", 111) && !hasUpgrade("Purity", 1111)) return 'You need ES01 to Purify Essence.'}, {"font-size": "22px"}],
                    "blank",
                    ["raw-html", function() {if (player.Purity.total.gte(1) && !hasUpgrade("EssenceShards", 1112)) return '('+formatWhole(player.Purity.total)+' total Pure Essence)'}, {"color": "#E6FCFC", "font-size": "17px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#E6FCFC", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "PureEssenceTabs"],

                ]
            
        },
    },
        microtabs: {
            PureEssenceTabs: {
                "Upgrades": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11],]]]],
                        "blank",


                    ]
                },
            }
        },
})