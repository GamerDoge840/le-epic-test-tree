addLayer("Energy", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Form Essence into Prestige.<br>----------<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Whitespace<br>----------------<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Essence</span>"
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
        rows: 6,
        cols: 6,
        11: {    
            title: "Essence",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[E01] Essence</span></b><font size="2"><br>Start generating <span style='color:#9d9d9d'> Essence</span>.<br>-------------<br>Currently: `+format(getPointGen()) +`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#9d9d9d'> Essence</span>`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Essence</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Birth of creation."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#cfcccc',
                    "width": "200px",
            "height": "175px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'border': '7px solid',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#B9B9AF' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'color': 'white'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
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
        "Whitespace": {
            style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text",
                    function() {return ''+format(player.points)+' Essence'},
                    {"font-size": "30px"}],
                    ["display-text",
                        function() {return '(+'+formatSmall(getPointGen())+' Essence/s)'},
                        {"font-size": "17px"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#31aeb0", "font-size": "32px"}],                
                        "blank",
                 "blank",
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#31aeb0", "font-size": "32px"}],
                            ["upgrades", [1]],
                            "blank",
                            ["upgrades", [2, 3, 4, 6]],
                            "blank",                            ["display-text",
                                function() {return "--------------------"},
                                {"color": "#31aeb0", "font-size": "32px"}],
                            "blank",
                            ["upgrades", [5]],
                    
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