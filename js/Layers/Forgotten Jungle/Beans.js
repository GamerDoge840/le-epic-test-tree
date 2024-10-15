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
    baseResource: "EXP", // Name of resource prestige is based on
    baseAmount() {return player.EXP.points}, // Get the current amount of baseResource
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
        growthbar: {
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
        11: {
            display() {return `<font size="3"><b><span style="color:#C19A6B">Bean Booster</span></b><font size="2"><br>Increases <span style="color:#C19A6B">Beans</span> by 100% every purchase. <br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#C19A6B">Beans</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.25);
                return cost;
              },
              effect(x) { return new getBuyableAmount(this.layer, this.id).mul(1).add(1) },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {return hasUpgrade("Beans", 25) ? 100 : 100},
            tooltip() {return "<span style='color:#C19A6B'>Bean Booster</span><br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.25).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 11))) setBuyableAmount('Beans', 11, max.add(1).floor())
            },
            style: {
                "width": "225px",
                "height": "200px",
                'background-color': '#f4eac6' 
                },
    
        },
        12: {
            display() {return `<font size="3"><b><span style="color:#C19A6B">Beany XP</span></b><font size="2"><br>Increases <span style="color:#C19A6B">EXP</span> by 100% every purchase. <br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#C19A6B">Beans</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.35);
                let cost = base.pow(x).times(15);
                return cost;
              },
              effect(x) { return new getBuyableAmount(this.layer, this.id).mul(1).add(1) },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {return hasUpgrade("Beans", 25) ? 100 : 100},
            tooltip() {return "<span style='color:#C19A6B'>Beany XP</span><br>----------------<br>Buying this once will unlock Growth Level and XP"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(15).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 12))) setBuyableAmount('Beans', 12, max.add(1).floor())
            },
            style: {
                "width": "225px",
                "height": "200px",
                'background-color': '#f4eac6' 
                },
    
        },
    },
     tabFormat: {
        "Overgrown Field": {
            content: [ 
                ["infobox", "KnowledgeLore"],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#C19A6B", "font-size": "32px"}],
                            ["raw-html", function() {if (getBuyableAmount("Beans", 12).gte(1)) return "bar", "growthbar"}],

                ["display-text",
                    function() {return "========Bean Upgrades========="},
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