addLayer("Culture", {
    name: "Culture", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#cd87b6",
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    row: '0', // Row the layer is in on the tree (0 is the first row)
    milestones: {
    },
    upgrades: {                                                                                          
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: {
        "Culture": {
        style() {return  {'background-color': '#4d0f2d'}},
        content: [
            ["raw-html", function() {if (hasUpgrade('Research', 37)) return '('+format(player.Culture.culturePoints)+' Population)'}, {"color": "#FFF5C7", "font-size": "25px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 37)) return '(+' + format(player.Culture.cultureGain.mul(1)) + '/s)'}, {"color": "#FFF5C7", "font-size": "20px"}],
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "WorkshopTabs"],

                ]
            
        },
    },
        microtabs: {
            WorkshopTabs: {
                "[WT0]": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Workshop Tier 0: Rudimentary Tools"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "19px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "―――――――――――――――――――――――――――――"}, {"color": "#5E5D5D",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4],]]]],
                    ["column", [ ["row", [ ["upgrade", 5], ["upgrade", 6], ["upgrade", 7], ["upgrade", 8],]]]],
                    "blank",
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],

                    ]
                },
                "[WT1]": {
                    unlocked() { return hasUpgrade('Research', 24) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Workshop Tier 1: Basic Tools"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "19px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 23)) return '('+format(player.Metals.metalPoints)+' Metals)'}, {"color": "#BABABA", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 27)) return '('+format(player.Fuel.fuelPoints)+' Fuel)'}, {"color": "#b37171", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "―――――――――――――――――――――――――――――"}, {"color": "#5E5D5D",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 9], ["upgrade", 10], ["upgrade", 11], ["upgrade", 12],]]]],
                    ["column", [ ["row", [ ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],]]]],
                    ["column", [ ["row", [ ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 20],]]]],
                    "blank",
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ]
                },
            }
        },
})