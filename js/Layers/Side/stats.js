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
                ["microtabs", "CurrencyTabs"],

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
                                    "blank",
                                ["display-text",
                                    function() {return "―――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "37px"}],

            ],
        },
        "Misc.": {
            content: ["blank",
                ["raw-html", function() {if (player.Money.moneyResetAmount.gte('1')) return '――+―― Resets ――+――'}, {"color": "#9d9d9d", "font-size": "37px"}],
                            ["raw-html", function() {if (player.Money.moneyResetAmount.gte('1')) return '(You have sold your beans '+formatWhole(player.Money.moneyResetAmount)+' times)'}, {"color": "#81F72D", "font-size": "25px"}],
                            "blank",
                            ["raw-html", function() {if (player.Gold.goldResetAmount.gte('1')) return '(You have bought Gold '+formatWhole(player.Gold.goldResetAmount)+' times)'}, {"color": "#FFE77D", "font-size": "25px"}],
                            "blank",
                            ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return '(You have expanded the Factory '+formatWhole(player.Factory.factoryResetAmount)+' times)'}, {"color": "#858181", "font-size": "25px"}],
                            "blank",
                            ["raw-html", function() {if (player.Factory.ironResetAmount.gte('1')) return '(You have forged Iron '+formatWhole(player.Factory.ironResetAmount)+' times)'}, {"color": "#9d9d9d", "font-size": "25px"}],
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
    microtabs: {
            CurrencyTabs: {
                "Current": {
                    content: [
                        ["display-text",
                    function() {return "―――+――― Current Amounts ―――+―――"},
                    {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                        function() {return "―――――――――――"},
                        {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                        function() {return '('+format(player.points)+' Beans)'},
                        {"color": "#C19A6B","font-size": "25px"}],
                        ["display-text",
                        function() {return '('+formatSmall(getPointGen())+'/s)'},
                        {"color": "#C19A6B","font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (hasMilestone("Beans", 0)) return '(Bean Level '+formatWhole(player.BeanLevel.points)+')'}, {"color": "#F59527", "font-size": "25px"}],
                        ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return "<br><span style='color:#D4B739'>Bean Tier "+formatWhole(player.BeanTier.points)+"</span> | <span style='color:#94811B'> "+format(player.BeanTier.tierPoints)+" TP"}, {"color": "#858181", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Money.moneyResetAmount.gte('1')) return '('+format(player.Money.dollars)+'$)'}, {"color": "#81F72D", "font-size": "25px"}],
                        ["raw-html", function() {if (getBuyableAmount("Gold", 5).gte(1)) return "(+" + format(player.Money.moneyToGet.mul(buyableEffect("Gold", 5))) + "$/s)"}, {"color": "#81F72D", "font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (player.Gold.goldResetAmount.gte('1')) return '('+formatWhole(player.Gold.goldBars)+' Gold Bars)'}, {"color": "#FFE77D", "font-size": "25px"}],
                        ["raw-html", function() {if (getBuyableAmount("Factory", 4).gte(1)) return "(+" + format(player.Gold.goldToGet.mul(buyableEffect("Factory", 4))) + "/s)"}, {"color": "#FFE77D", "font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return '(Factory Level '+formatWhole(player.Factory.points)+')'}, {"color": "#858181", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Factory.ironResetAmount.gte('1')) return '('+format(player.Factory.ironPlates)+' Iron Plates)'}, {"color": "#BABABA", "font-size": "25px"}],
                        ["display-text",
                            function() {return "―――――――――――"},
                            {"color": "#9d9d9d", "font-size": "37px"}],
                        
                    ]
                },
                "Best": {
                    content: [
                        ["display-text",
                    function() {return "―――+――― Best Amounts ―――+―――"},
                    {"color": "#9d9d9d", "font-size": "37px"}],
                    ["display-text",
                        function() {return "―――――――――――"},
                        {"color": "#9d9d9d", "font-size": "37px"}],
                        ["display-text",
                        function() {return '(Best Beans: '+format(player.Beans.bestBeans)+')'},
                        {"color": "#C19A6B","font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (hasMilestone("Beans", 0)) return '(Highest Bean Level: '+formatWhole(player.BeanLevel.bestBeanLevel)+')'}, {"color": "#F59527", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return '(Highest Bean Tier: '+formatWhole(player.BeanTier.bestBeanTier)+')'}, {"color": "#D4B739", "font-size": "25px"}],
                        ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return '(Best TP: '+format(player.BeanTier.bestTP)+')'}, {"color": "#94811B", "font-size": "17px"}],
                        "blank",
                        ["raw-html", function() {if (player.Money.moneyResetAmount.gte('1')) return '(Best Money: '+format(player.Money.bestMoney)+'$)'}, {"color": "#81F72D", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Gold.goldResetAmount.gte('1')) return '(Best Gold Bars: '+format(player.Gold.bestGold)+')'}, {"color": "#FFE77D", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Factory.factoryResetAmount.gte('1')) return '(Highest Factory Level: '+formatWhole(player.Factory.bestFactoryLevel)+')'}, {"color": "#858181", "font-size": "25px"}],
                        "blank",
                        ["raw-html", function() {if (player.Factory.ironResetAmount.gte('1')) return '(Best Iron Plates: '+format(player.Factory.bestIronPlates)+')'}, {"color": "#BABABA", "font-size": "25px"}],
                        ["display-text",
                            function() {return "―――――――――――"},
                            {"color": "#9d9d9d", "font-size": "37px"}],
                        
                    ]
                },
            }
        },
})