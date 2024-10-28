addLayer("Energy", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#c1ffee",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of prestige currency
    resetDescription: "You're looking through the code aren't you.<br>----------<br>",
    baseResource: "poop", // Name of resource prestige is based on
    baseAmount() {return player.Prestige.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000000000000000000000000000000000000000000000000000000000000000000001, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    powerExp() {
        let exp = new Decimal(1 / 100);
        return exp;
    },
    effect() {
        return player.Energy.points.plus(1).pow(this.powerExp());
    },
    passiveGeneration() {
        if (hasUpgrade('Energy', 11)) return 1
	return 0
    },
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
            title: "Activate Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Activate Generator</span></b><font size="2"><br>Enables Energy generation.<br>-------------<br>Currently: `+(format(getResetGain("Energy")))+`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Honor)+`<span style='color:#000000'> Honor</span>`},        
            costs: {
                Prestige: 1,
                Honor: 1e10,
              },
              canAfford() {
                return player.Prestige.points.gte(this.costs.Prestige)
                    && player.Honor.points.gte(this.costs.Honor)
              },
              pay() {
                player.Prestige.points = player.Prestige.points.minus(this.costs.Prestige);
                player.Honor.points = player.Honor.points.minus(this.costs.Honor);
              },
            unlocked() {return hasUpgrade("Honor", 61)},
            tooltip() {return "<span style='color:#ffffff'>Activate Generator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#c1ffee',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#7fffdb' ,
                    "width": "250px",
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
    tabFormat: [
       ["display-text",
           function() {return '('+format(player.points)+' Essence)'},
           {"font-size": "14px"}],
       ["display-text",
           function() {return '<span style="color:#31aeb0">('+format(player.Prestige.points)+' Prestige)</span>'},
           {"font-size": "14px"}],
           "blank",
           ['display-text',function(){return '<h4><span style="color:#faff92">'+quickBigColor(format(player.Honor.points),'#faff92') +' Honor</span>'}],
           ["raw-html", function() {if (hasMilestone("Rank", 5)) return "<font size='5'>(+" + (format(getResetGain("Honor"))) + " Honor/s)"}],
       ["display-text",
           function() {return "--------------------"},
           {"color": "#c1ffee", "font-size": "32px"}],
           ['display-text',function(){return '<h4>You have <span style="color:#c1ffee">'+quickBigColor(format(player.Energy.points),'#c1ffee') +' Energy</span>, which boosts <span style="color:#31aeb0">Prestige</span> by <span style="color:#c1ffee">'+ format(tmp.Energy.effect) +'x</span>.'}],
           ["raw-html", function() {if (hasUpgrade("Energy", 11)) return "<font size='5'>(+" + (format(getResetGain("Energy"))) + " Energy/s)"}],
           ["display-text",
            function() {return "--------------------"},
            {"color": "#c1ffee", "font-size": "32px"}],
            ["upgrades", [1]],
            "blank",
            ["upgrades", [2, 3, 4, 6]],
            ["display-text",
                function() {return "--------------------"},
                {"color": "#c1ffee", "font-size": "32px"}],

      
                   
                       ],
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})