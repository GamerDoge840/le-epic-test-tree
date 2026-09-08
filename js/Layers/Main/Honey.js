addLayer("h", {
    name: "Honey", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        Honey: new Decimal(0),
        honeyToGet: new Decimal(0),
        honeyResetAmount: new Decimal(0),
    }},
    color: "#C2B261",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    branches: ["p"],
    tooltip() {
        let tooltip = "<font size='3'>Honey<br>――――――――――――――<br> <font size='2'><span style='color:#C2B261'> " +format(player.h.Honey)+" Honey</span>"
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
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Honey Gain
        player.h.honeyToGet = player.p.points.div(10)
    },
    honeyReset()
    {
     player.points = new Decimal(0)
     
     player.p.points = new Decimal(0)
     
    for (let i in player.p.buyables) {
         player.p.buyables[i] = new Decimal(0)
    }

    },
    milestones: {
    },
    upgrades: { 
    },
    buyables: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Convert White Pollen into Honey.<br><font size='4'>(Requires 10 White Pollen)" },
            canClick() { return player.h.honeyToGet.gte(1) && player.p.points.gte(10)},
            //unlocked() { return !getBuyableAmount("Gold", 5).gte(1) },
            onClick() {
                layers.h.honeyReset()
                player.h.Honey = player.h.Honey.add(player.h.honeyToGet)
                player.h.honeyResetAmount = player.h.honeyResetAmount.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
    },
     tabFormat: {
        "Honey": {
        style() {return  {'background-color': '#14130A'}},
        content: [
            ["display-text",
            function() {return '('+formatWhole(player.p.points)+' White Pollen)'},
            {"color": "#FFFFFF", "font-size": "20px"}],
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
        ["display-text",
            function() {return ''+format(player.h.Honey)+' Honey'},
            {"color": "#C2B261", "font-size": "35px"}],
                                    ["raw-html", function() {if (player.p.points.gte(10)) return "(+" + format(player.h.honeyToGet) + ")"}, {"color": "#C2B261", "font-size": "20px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                                        ["row", [["clickable", 1]]],

                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "HoneyTabs"],

                ]
            
        },
    },
        microtabs: {
            HoneyTabs: {
                "Info": {
                    content: [
                        ["display-text",
                    function() {return "――――――Layer 1 Reset――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                    ["display-text",
                    function() {return "Converting White Pollen into Honey resets Gathering Power, Pollen, and Pollen Upgrades in exchange for Honey which you can spend on new upgrades."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],                        
                    ]
                },
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})