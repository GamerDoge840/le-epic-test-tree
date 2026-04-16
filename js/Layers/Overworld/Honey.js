addLayer("h", {
    name: "Honey", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("0.1"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    branches: ["Pollen"],
    resetDescription: "Reset Essence, but gain Prestige.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Pollen<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFFF'> " +formatWhole(player.p.points)+" White Pollen</span>"
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
    },
    buyables: {
    },
     tabFormat: {
        "Pollen": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+formatWhole(player.p.points)+' White Pollen'},
            {"color": "#FFFFFF", "font-size": "30px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["bar", "pollenbar"],
                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "PollenTabs"],

                ]
            
        },
    },
        microtabs: {
            PollenTabs: {
                "Gathering": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})