addLayer("RoyalJelly", {
    name: "RoyalJelly", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#97d9ff",
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
    requires: new Decimal("10"), // Can be a function that takes requirement increases into account
    resource: "Royal Jelly", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Convert Honey into Jelly.<br>―――――――――<br>",
    canBuyMax() {return true},
    baseResource: "Honey", // Name of resource prestige is based on
    baseAmount() {return player.Hive.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.90, // Prestige currency exponent
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
    onPrestige(){
        player["Hive"].points = new Decimal(0)
},
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
            title: "Regular Bee",
            fullDisplay() {return `<font size="3"><b>Regular Bee</b><font size="2"><br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x to White Pollen gain<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Jelly`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(1.25)
                return effect
              },  
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Regular Bee</span><br>――――――――――――<br><span style='font-size:16px'>Rarity: <span style='color:#7d837c'>Common<br></span><span style='font-size:13px'>Ability: <i>White Gathering</i> -- Boosts White Pollen gain.<br>――――――――――――――――――<br></span><span style='font-size:12px'>A small flying insect eager to help you collect more pollen."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffdd52',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#c6c6c6' ,
                    "width": "200px",
            "height": "165px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
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
       "Regular Bees": {
           //style() {return  {'background-color': '#292929'}},
           content: [
               ["display-text", function() { return " "+format(player.RoyalJelly.points)+" Royal Jelly"},
                   {"color": "#97d9ff", "font-size": "35px"}],
                   ["display-text",
                       function() {return "―――――――――――――――――――――――――――――"},
                       {"color": "#97d9ff", "font-size": "32px"}],
               "prestige-button",
               ["display-text",
                   function() {return "――――――――――――――――"},
                   {"color": "#97d9ff", "font-size": "22px"}],
               ["display-text",
                   function() {return ''+format(player.Hive.points)+' Honey'},
                   {"color": "#ffdd52", "font-size": "15px"}],
                   //["raw-html", function() {if (hasUpgrade("PointLayer", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Points/s)"}],            
                       ["display-text",
                           function() {return "―――――――――――――――――――――――――――――"},
                           {"color": "#97d9ff", "font-size": "32px"}],
                           ["upgrades", [1, 2, 3, 4, 5, 6, 7]],
                           "blank",
                           ["upgrades", [100]],
                           "blank",     
                           //["raw-html", function() {if (hasUpgrade("PointLayer", 34)) return "("+format(player.points)+ " Points)"}, {"font-size": "20px"}],            
                   
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