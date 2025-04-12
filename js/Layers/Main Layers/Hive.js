addLayer("Hive", {
    name: "Hive", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffdd52",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-color': '#ffdd52',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Honey", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Convert Pollen into Honey.<br>―――――――――<br>",
    branches: ["Progression"],
    baseResource: "White Pollen", // Name of resource prestige is based on
    baseAmount() {return player.WhitePollen.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Hive<br>――――――――――――<br> <font size='2'><span style='color:#ffdd52'> " +formatWhole(player.Hive.points)+" Honey</span>"
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
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "Honey": {
            content: [
                ["display-text", function() { return " "+format(player.Hive.points)+" Honey"},
                    {"color": "#ffdd52", "font-size": "35px"}],
                    ["display-text",
                        function() {return "―――――――――――――――――――――――――――――"},
                        {"color": "#ffdd52", "font-size": "32px"}],
                "prestige-button",
                ["display-text",
                    function() {return "――――――――――――――――"},
                    {"color": "#ffdd52", "font-size": "22px"}],
                ["display-text",
                    function() {return ''+format(player.WhitePollen.points)+'/'+format(player.WhitePollen.cap)+' White Pollen'},
                    {"font-size": "15px"}],                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#ffdd52", "font-size": "32px"}],
                            ["upgrades", [1, 2, 3, 4, 5, 6, 7]],
                            "blank",
                            ["upgrades", [100]],
                            "blank",                         
            ]
            
        },
        "Bees": {
            //style() {return  {'background': '#292929'}},
            //style() {
                //return {
                    //"background-image": "linear-gradient(to top,rgb(33, 33, 36),rgb(63, 59, 73))",
                    //"background-size": "cover"
                //};
           // },
            unlocked() {return true},
            buttonStyle: {"border-color": "#97d9ff"},
            embedLayer: 'RoyalJelly',
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