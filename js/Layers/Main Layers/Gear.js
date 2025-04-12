addLayer("Gear", {
    name: "Gear", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PRO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-image': 'radial-gradient(circle at center,rgb(215, 255, 216),rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Tuah Hawk Points", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Spit on that thang",
    baseResource: "Hawks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Progression<br>――――――――――――<br> <font size='2'><span style='color:#ffffff'></span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
    },
    //bars: {
        //stonebar: {
            //direction: RIGHT,
            //width: 600,
            //height: 50,
            //instant: true,
            //progress() {return new Decimal(tmp.StoneBlocks.baseAmount).dividedBy(getNextAt(this.layer, true))},
           // baseStyle: { 'background-color': 'black' },
            //fillStyle: { 'background-color': '#a4deff' },
       // },
//},
doReset(resettingLayer) {
    if (layers[resettingLayer].row <= this.row) return;
    let keptUpgrades = []
    let keptMilestones = []
    layerDataReset(this.layer);
    player[this.layer].upgrades.push(...keptUpgrades)
    player[this.layer].milestones.push(...keptMilestones)
},
    upgrades: {
        rows: 9,
        cols: 9,
        11: {    
            title: "Old Sack",
            fullDisplay() {return `<font size="3"><b>Old Sack</b><font size="2"><br>――――――――――――――――――<br>Stats: 2.00x to White Pollen capacity.<br>――――――――――――――――――<br>Costs: <span style='color:#ffdd52'>15 Honey</span>`},
              costs: {
                Honey: 15,
              },
              canAfford() {
                return player.Hive.points.gte(this.costs.Honey)
              },
              pay() {
                player.Hive.points = player.Hive.points.minus(this.costs.Honey);
              },
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Old Sack</span><br>――――――――――――<br><span style='font-size:16px'>Complexity: <span style='color:#7d837c'>Simple<br></span><span style='font-size:15px'>Stats: 2.00x to White Pollen capacity.<br>Costs: <span style='color:#ffdd52'>15 Honey</span><br>――――――――――――――――――<br></span><span style='font-size:12px'>A small sack."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#d4ffa9',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#a2a2a2' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#5dff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Wooden Spoon",
            fullDisplay() {return `<font size="3"><b>Wooden Spoon</b><font size="2"><br>――――――――――――――――――<br>Stats: 1.20x to White Pollen collection.<br>――――――――――――――――――<br>Costs: <span style='color:#ffdd52'>20 Honey</span>`}, 
              costs: {
                Honey: 20,
              },
              canAfford() {
                return player.Hive.points.gte(this.costs.Honey)
              },
              pay() {
                player.Hive.points = player.Hive.points.minus(this.costs.Honey);
              },
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Wooden Spoon</span><br>――――――――――――<br><span style='font-size:16px'>Complexity: <span style='color:#7d837c'>Simple<br></span><span style='font-size:15px'>Stats: 1.20x to White Pollen collection.<br>Costs: <span style='color:#ffdd52'>20 Honey</span><br>――――――――――――――――――<br></span><span style='font-size:12px'>A spoon to help you collect pollen faster."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#d4ffa9',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#a2a2a2' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#5dff00',
                'background-color': '#ededed',
                'color': 'black',
                        "width": "300px",
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
        "Gear": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text", function() { return " "+format(player.Hive.points)+" Honey"},
                    {"color": "#ffdd52", "font-size": "25px"}],
                    ["display-text",
                        function() {return "―――――――Collection Tools―――――――"},
                        {"color": "#9d9d9d", "font-size": "32px"}],
                        ["upgrades", [2]],
                        ["display-text",
                            function() {return "―――――――Pollen Bags―――――――"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                            ["upgrades", [1]],
                            ["display-text",
                                function() {return "―――――――――――――――――――――――――――――"},
                                {"color": "#9d9d9d", "font-size": "32px"}],
                                "buyables",
                                ["display-text",
                                    function() {return "―――――――――――――――――――――――――――――"},
                                    {"color": "#9d9d9d", "font-size": "32px"}],
                    
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