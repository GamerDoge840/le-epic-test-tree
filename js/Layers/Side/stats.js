addLayer("stats", {
    name: "stats", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "📊", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "#e1e1e1",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    tooltip() {return "Statistics"},
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
    layerShown(){return true},
    
    tabFormat: {
        "Currencies": {
            content: ["blank",
                ["display-text",
                    function() {return "―――+――― Currencies ―――+―――"},
                    {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                        function() {return "―――――――――――"},
                        {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                        function() {return ''+format(player.points)+' Points'},
                        {"font-size": "25px"}],                        "blank",
                        //["display-text",
                            //function() {return '('+format(player.points.total)+' total Points)'},
                            //{"font-size": "15px"}],
                        "blank",
                        ["display-text",
                            function() {return "―――――――――――"},
                            {"color": "#9d9d9d", "font-size": "37px"}],
                        ["display-text",
                            function() {return "――+―― Misc. ――+――"},
                            {"color": "#9d9d9d", "font-size": "37px"}], 
                            ["display-text",
                                function() {return format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+" Achievements"},
                                {"color": "#e7ef43","font-size": "25px"}],    
                                "blank",      
                                ["display-text",
                                    function() {return "You have played this game for " + formatTime(player.timePlayed, true + ".")},
                                    {"font-size": "25px"}],  
                                    "blank",

            ],
        },
        "Upgrades": {
            content: ["blank",
                            ["display-text",
                                function() {return "―――+――― Upgrades ―――+―――"},
                                {"color": "#9d9d9d", "font-size": "37px"}],
                                ["display-text",
                                    function() {return "―――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "37px"}],
                                ["display-text",
                                    function() {return ''+formatWhole(player.PointLayer.upgrades.length)+' Point Upgrades bought'},
                                    {"font-size": "25px"}],
                                    "blank",
                                    ["raw-html", function() {if (player.Prestige.total.gte(1)) return "<font size='5'>"+formatWhole(player.Prestige.upgrades.length)+" Prestige Upgrades bought"}, {"color": "#31aeb0"}],
                                ["display-text",
                                    function() {return "―――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "37px"}],

            ],
        },
    },
})