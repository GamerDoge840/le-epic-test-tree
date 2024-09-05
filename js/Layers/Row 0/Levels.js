addLayer("Levels", {
    name: "Levels", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ⓟ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffe497",
    nodeStyle() {
        return {
            'border': '6px solid #64beb0',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Luminosity", // Name of prestige currency
    resetDescription: "Level Up.<br>----------<br>",
    autoPrestige: true,
    resetsNothing: true,
    canBuyMax: true,
    baseResource: "Lumens", // Name of resource prestige is based on
    baseAmount() {return player.Lumens.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult=mult.dividedBy(buyableEffect('Particles', 12))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    bars: {
        LevelBar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {return new Decimal(tmp.Levels.baseAmount).dividedBy(getNextAt(this.layer, true))},
            fillStyle: { 'background-color': '#ffe497' },
          
    },
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b><span style="color:#887812">Illumination I</span></b><font size="2"><br>Increases <span style="color:#64beb0">Particles</span> gain by 1.15x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#887812">Luminosity</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Levels', 11).pow_base(1.15)
                eff=eff.times(buyableEffect('Levels', 21))
                return eff
            },   
            canAfford() { if (player.Levels.points.gte(this.cost())) {return true}},
            buy() {
                player.Levels.points = player.Levels.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#887812'>Illumination I</span><br>----------------<br>"},
            buyMax() {
                let max = player.Levels.points.div(this.cost(0)).add(1).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Levels', 11))) setBuyableAmount('Levels', 11, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return true },
    
        },
        21: {
            display() {return `<font size="3"><b><span style="color:#887812">Illumination II</span></b><font size="2"><br>Increases the power of the <span style="color:#887812">Illumination I</span> upgrade by 1.15x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#887812">Luminosity</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.95);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Levels', 21).pow_base(1.15)
                eff=eff.times(buyableEffect('Levels', 31))
                return eff
            },   
            canAfford() { if (player.Levels.points.gte(this.cost())) {return true}},
            buy() {
                player.Levels.points = player.Levels.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#887812'>Illumination II</span><br>----------------<br>"},
            buyMax() {
                let max = player.Levels.points.div(this.cost(0)).add(1).log(1.95) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Levels', 21))) setBuyableAmount('Levels', 21, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Levels", 11).gte(5)},
    
        },
        31: {
            display() {return `<font size="3"><b><span style="color:#887812">Illumination III</span></b><font size="2"><br>Increases the power of the <span style="color:#887812">Illumination II</span> upgrade by 1.15x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#887812">Luminosity</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(2.25);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Levels', 31).pow_base(1.15)
                return eff
            },   
            canAfford() { if (player.Levels.points.gte(this.cost())) {return true}},
            buy() {
                player.Levels.points = player.Levels.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#887812'>Illumination III</span><br>----------------<br>"},
            buyMax() {
                let max = player.Levels.points.div(this.cost(0)).add(1).log(2.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Levels', 31))) setBuyableAmount('Levels', 31, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Levels", 21).gte(5)},
    
        },
    },
    tabFormat: [
        ["infobox", "CropLore"],
        ['display-text',function(){return '<h4>You have '+quickBigColor(format(player.Levels.points),'#ffe497') +'<span style="color:#ffe497"> Luminosity</span>.'}],
        ["display-text",
            function() {return "--------"},
            {"color": "#ffe497", "font-size": "32px"}],
                ["display-text",
                    function() {return "--------------------"},
                    {"color": "#ffe497", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Luminosity Progress"},
                        {"color": "#c6bc85", "font-size": "22px"}], 
                        ["display-text",
                            function() {return "--------"},
                            {"color": "#ffe497", "font-size": "32px"}],
                        ['display-text',function(){return '<h4>'+quickBigColor(format(player.Lumens.points),'#c6bc85') +' <span style="color:#c6bc85">Lumens</span>'}],
    
                    ["bar", "LevelBar"],
                    ["display-text",
                        function() {return "============================="},
                        {"color": "#ffe497", "font-size": "32px"}], 
            ["display-text",
                function() {return "--------------------"},
                {"color": "#ffe497", "font-size": "32px"}],
                "buyables",   
            ["display-text",
                function() {return "--------------------"},
                {"color": "#ffe497", "font-size": "32px"}],  
                "milestones",
            
    ],
    infoboxes:{
        CropLore: {
         title: "Introduction",
         titleStyle: {'color': '#000000'},
         body: "Actually fill this in later idiot",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})