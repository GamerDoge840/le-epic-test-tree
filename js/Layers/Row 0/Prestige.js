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
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    resetDescription: "Form Essence into Prestige.<br>----------<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Prestige<br>----------------<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Essence</span>"
        if(player.Prestige.total.gte(1)) tooltip = tooltip + "<br><span style='color:#31aeb0'>"+formatWhole(player.Prestige.points)+" Prestige</font>"
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
        rows: 5,
        cols: 4,
        11: {    
            title: "Formation",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Formation</span></b><font size="2"><br>Start generating Essence.<br>-------------<br>Currently: `+format(getPointGen()) +`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>Formation</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
        },
        21: {    
            title: "The First Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>The First Upgrade</span></b><font size="2"><br>Increases Essence gain.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(1.50)
                if (hasUpgrade('Prestige', 22)) effect = effect.times(upgradeEffect('Prestige', 22))
                return effect
              },   
            unlocked() {return hasUpgrade("Prestige", 11)},
            tooltip() {return "<span style='color:#ffffff'>The First Upgrade</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
        },
        22: {    
            title: "An Upgrade for an Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>An Upgrade for an Upgrade</span></b><font size="2"><br>Increases the power of The First Upgrade.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Prestige</span>`},        
            cost: new Decimal(3),
            effect() {
                effect = new Decimal(1.35)
                return effect
              },   
            unlocked() {return hasUpgrade("Prestige", 21)},
            tooltip() {return "<span style='color:#ffffff'>An Upgrade for an Upgrade</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "Prestige": {
            content: [ 
                ['display-text',function(){return '<h4>You have <span style="color:#31aeb0">'+quickBigColor(format(player.Prestige.points),'#31aeb0') +' Prestige</span>.'}],
                "blank",
                 "prestige-button",
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#31aeb0", "font-size": "32px"}],
                            ["upgrades", [1]],
                            "blank",
                            ["upgrades", [2]],
                    
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