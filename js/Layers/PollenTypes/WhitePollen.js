addLayer("WhitePollen", {
    name: "WhitePollen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() { return hasUpgrade("Honey", 11) },
		points: new Decimal(0),
        speed: new Decimal(0.01),
        cap: new Decimal(5),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-image': 'radial-gradient(circle at center, #31aeb0,rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    
    automate() {
       //Gain Rate
        gain4 = new Decimal(0.005)
        if (hasUpgrade('RoyalJelly', 11)) gain4 = gain4.times(upgradeEffect('RoyalJelly', 11))
        if (hasUpgrade('Gear', 21)) gain4 = gain4.times(1.20)

        //Cap
        hat = new Decimal(5)
        if (hasUpgrade('Gear', 11)) hat = hat.times(2)
        //
        player.WhitePollen.cap = new Decimal(0).plus(hat)
        player.WhitePollen.speed = new Decimal(0).plus(gain4)
        if ( hasUpgrade("Progression", 11) && player.WhitePollen.points.lt(player.WhitePollen.cap)) player.WhitePollen.points = player.WhitePollen.points.plus(player.WhitePollen.speed)
        },
    requires: new Decimal("0"), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Kai cenat skibi toilet",
    baseResource: "Your mother", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000000000000000000000000000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Points<br>――――――――――――<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Points</span>"
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
        "Points": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text",
                    function() {return ''+format(player.points)+' Points'},
                    {"font-size": "30px"}],
                    //["raw-html", function() {if (hasUpgrade("PointLayer", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Points/s)"}],            
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                            ["upgrades", [1, 2, 3, 4, 5, 6, 7]],
                            "blank",
                            ["upgrades", [100]],
                            "blank",     
                            //["raw-html", function() {if (hasUpgrade("PointLayer", 34)) return "("+format(player.points)+ " Points)"}, {"font-size": "20px"}],            
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