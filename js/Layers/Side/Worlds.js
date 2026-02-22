addLayer("Worlds", {
    name: "Worlds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌎", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    nodeStyle() {
        return {
            'border': '2px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    color: "#D5FFB0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    tooltip() {return "Worlds"},
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('Factory', 111111)},
    tabFormat: {
        "Worlds": {
            content: ["blank",
              ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#D5FFB0", "font-size": "32px"}],   
                    ["row", [["clickable", 1]]], 
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#D5FFB0", "font-size": "32px"}],    
            ],
        },
    },
        clickables: {
        1: {
            title: "(World 1) Overworld",
            canClick() { return true},
            unlocked() { return true },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px', 'background-color': "#C19A6B",},
            onClick() {
                player.navTab = 'Overworld'
            },
        },
    },
})