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
            content: [
                        ["display-text",
                    function() {return "―――+――― Main Currencies ―――+―――"},
                    {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                            function() {return "―――――――――――"},
                            {"color": "#9d9d9d", "font-size": "37px"}],
                    "blank",
                    ["display-text",
                        function() {return '('+format(player.points)+' Essence)'},
                        {"color": "#FFFFFF","font-size": "25px"}],
                        ["display-text",
                        function() {return '('+formatSmall(getPointGen())+'/s)'},
                        {"color": "#9d9d9d","font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (player.Purity.total.gte(1)) return '('+formatWhole(player.Purity.points)+' Purity)'}, {"color": "#FFE5FA", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if ((hasUpgrade("Essence", 14))) return '――+―― Levels ――+――'}, {"color": "#9d9d9d", "font-size": "37px"}],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Essence", 14)) return '(Level '+formatWhole(player.Level.points)+')'}, {"color": "#D5E5F4", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if ((hasUpgrade("Fruits", 11))) return '――+―― Fruits ――+――'}, {"color": "#9d9d9d", "font-size": "37px"}],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Fruits", 11)) return '('+format(player.Fruits.apples)+' Apples)'}, {"color": "#DA8F81", "font-size": "25px"}],
                        ["raw-html", function() {if (hasUpgrade('Fruits', 11)) return "(+" + format(player.Fruits.appleGain.mul(1)) + "/s)"}, {"color": "#EECFC9", "font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Fruits", 13)) return '('+format(player.Fruits.pears)+' Pears)'}, {"color": "#C3FA89", "font-size": "25px"}],
                        ["raw-html", function() {if (hasUpgrade('Fruits', 13)) return "(+" + format(player.Fruits.pearGain.mul(1)) + "/s)"}, {"color": "#C7E6A8", "font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade('Fruits', 21)) {return ''+format(player.Fruits.bananas)+' Bananas'}}, {"color": "#F5EB82", "font-size": "25px"}],
                        ["raw-html", function() {if (hasUpgrade('Fruits', 21)) return "(+" + format(player.Fruits.bananasGain.mul(1)) + "/s)"}, {"color": "#FFF9B8", "font-size": "17px"}],
                    "blank",
                        ["display-text",
                            function() {return "―――――――――――"},
                            {"color": "#9d9d9d", "font-size": "37px"}],
                        
                    ]
        },
        "Upgrades": {
            content: ["blank",
                            ["display-text",
                                function() {return "―――+――― Upgrades ―――+―――"},
                                {"color": "#9d9d9d", "font-size": "37px"}],
                                ["display-text",
                                    function() {return "―――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "37px"}],
                                    "blank",
                                ["display-text",
                                    function() {return "―――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "37px"}],

            ],
        },
        "Misc.": {
            content: ["blank",
                ["raw-html", function() {if (player.Purity.purityResets.gte('1')) return '――+―― Resets ――+――'}, {"color": "#9d9d9d", "font-size": "37px"}],
                        ["raw-html", function() {if (player.Purity.purityResets.gte('1')) return '(You have purified your essence '+formatWhole(player.Purity.purityResets)+' times)'}, {"color": "#FFE5FA", "font-size": "25px"}],
                            "blank",
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
    },
})