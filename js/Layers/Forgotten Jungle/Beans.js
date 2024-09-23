addLayer("Beans", {
    name: "Beans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌱", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e3f4c6",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("10"), // Can be a function that takes requirement increases into account
    resource: "Levels", // Name of prestige currency
    resetDescription: "Do somthin sussy<br>----------<br>",
    baseResource: "Data", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Forgotten Jungle<br>----------------<br> <font size='2'><span style='color:#C19A6B'> " +formatWhole(player.points)+" Beans</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    bars: {
        databar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {return new Decimal(tmp.Beans.baseAmount).dividedBy(getNextAt(this.layer, true))},
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#a4deff' },
        },
},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "Overgrown Field": {
            content: [ 
                ["infobox", "KnowledgeLore"],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#C19A6B", "font-size": "32px"}],
                ["display-text",
                    function() {return "========-=-Bean Upgrades-=-========="},
                    {"color": "#C19A6B", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "---------"},
                        {"color": "#C19A6B", "font-size": "32px"}], 
                    ['display-text',function(){return '<h4><span style="color:#C19A6B">'+quickBigColor(format(player.points),'#C19A6B') +' Beans</span>'}],

                    ["buyables", [1]],
                    "blank",
                    ["upgrades", [6]],
                    "blank",
                ["display-text",
                    function() {return "============================="},
                    {"color": "#C19A6B", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#C19A6B", "font-size": "32px"}], 
                    
            ]
            
        },

    },
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})