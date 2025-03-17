addLayer("Prestige", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#31aeb0",
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
    requires: new Decimal("2500"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Perform a Prestige.<br>――――――――――――――――――<br>",
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
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
    automate() {
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
            title: "Prestige Booster",
            fullDisplay() {return `<font size="3"><b><span style='color: black'>[PR11] Prestige Booster</span></b><font size="2"><br>Boosts Point gain by 1.750x.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Prestige`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('PointLayer', 1001) || player.Prestige.total.gte(1)},
            effect() {
                effect = new Decimal(1.75)
                return effect
              },  
            tooltip() {return "<span style='color:#ffffff'>Prestige Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>P23's cooler cousin."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#31aeb0',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#31aeb0' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#31aeb0',
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
    tabFormat: [
        ["infobox", "PrestigeLore"],
                ["display-text",
                    function() {return '<span style="color:#31aeb0">'+format(player.Prestige.points)+' Prestige'},
                    {"font-size": "30px"}],
                    //["raw-html", function() {if (hasUpgrade("Fragments", 91)) return "<font size='4'>(+" + (format(getResetGain("Fragments"))) + " Fragments/s)"}, {"color": "#fcf4e1",}],
            ["display-text",
                function() {return "―――――――――――――――――――――――――――――"},
                {"color": "#31aeb0", "font-size": "32px"}],
                function() {if (hasUpgrade("PointLayer", 1001)) return "prestige-button"}, 
                ["raw-html", function() {if (!hasUpgrade("PointLayer", 1001)) return 'To Prestige, you need Point upgrade P-U.'}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#31aeb0", "font-size": "32px"}],
                ["display-text",
                    function() {return '('+format(player.points)+' Points)'},
                    {"font-size": "17px"}],                       
                        ["raw-html", function() {if (!hasUpgrade("Prestige", 91)) return "(<span style='color:#31aeb0'>"+format(player.Prestige.total)+" total Prestige</span>)"}, {"font-size": "12px"}],
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#31aeb0", "font-size": "32px"}],
                                "blank",
                            ["upgrades", [1]],
                            "blank",    
                            ["upgrades", [2, 3, 4]],
                            "blank",
                            ["upgrades", [5]],
                            "blank",
                            ["upgrades", [6, 7, 8]],  
                            "blank",   
                            ["upgrades", [9]],
                            "blank", 
                            ["upgrades", [10, 11, 12]],                      ["display-text",
                                function() {return "―――――――――――――――――――――――――――――"},
                                {"color": "#31aeb0", "font-size": "32px"}],
                                //["raw-html", function() {if (hasUpgrade("Fragments", 51)) return "(<span style='color:#fcf4e1'>"+format(player.Fragments.points)+" Fragments</span>)"}, {"font-size": "18px"}],

                                
                            "buyables",
                
            
                            ],
    infoboxes:{
        PrestigeLore: {
         title: "Prestige",
         titleStyle: {'color': '#000000'},
         body: "―――――――――――――――――――――――――――――――――――――――――――――――――――――――――<br>Prestige is the first of many reset layers in this game.<br><br>Prestiging will reset Points and Point Upgrades in exchange for Prestige, which can be spent on new upgrades which will allow for you to get back to where you were faster.<br>―――――――――――――――――――――――――――――――――――――――――――――――――――――――――",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})