addLayer("Honor", {
    name: "Honor", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#faff92",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1e10"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    branches: ["Prestige"],
    resetDescription: "Become honored.<br>----------<br>",
    baseResource: "Prestige", // Name of resource prestige is based on
    baseAmount() {return player.Prestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Honor<br>----------------<br> <font size='2'><span style='color:#faff92'> " +formatWhole(player.Honor.points)+" Honor</span>"
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
    layerShown(){return hasUpgrade("Level", 31) || player.Honor.total.gte(1)},
    //passiveGeneration() {
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
            title: "Honored Power",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honored Power</span></b><font size="2"><br>Increases Essence and Prestige gain.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Honor</span>`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(2.50)
                return effect
              },   
            tooltip() {return "<span style='color:#ffffff'>Honored Power</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#faff92',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
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
        "Honor": {
            content: [ 
                ['display-text',function(){return '<h4>You have <span style="color:#faff92">'+quickBigColor(format(player.Honor.points),'#faff92') +' Honor</span>.'}],
                //["raw-html", function() {if (hasUpgrade("Level", 22)) return "<font size='5'>(+" + (format(getResetGain("Prestige"))) + "/s)"}],
                "blank",
                "prestige-button",
                 "blank",
                 ['display-text',function(){return '<span style="color:#31aeb0">'+format(player.Prestige.points)+' Prestige</span>'}],
                 ['display-text',function(){return '<span style="color:#faff92">'+format(player.Honor.total)+' total Honor</span>'}],
                 ["display-text",
                    function() {return "============================="},
                    {"color": "#faff92", "font-size": "32px"}],
                 ["display-text",
                    function() {return "----------Tier 1 Reset Layer----------"},
                    {"color": "#faff92", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Honor resets <span style='color:#31aeb0'>Prestige</span> features (Essence, <span style='color:#31aeb0'>Prestige, Prestige Upgrades,</span> <span style='color:#69c0f6'>Levels, and Level Upgrades</span>) in exchange for <span style='color:#faff92'>Honor</span> to spend on powerful new upgrades."},
                        {"font-size": "16px"}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#faff92", "font-size": "32px"}],
                            ["display-text",
                                function() {return "============================="},
                                {"color": "#faff92", "font-size": "32px"}],
                            ["upgrades", [1]],
                            ["display-text",
                                function() {return "============================="},
                                {"color": "#faff92", "font-size": "32px"}],
                    
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