addLayer("Stardust", {
    name: "Stardust", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⋆:･", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#f3d9ff",
    nodeStyle() {
        return {
            'border': '4px solid rgb(255, 255, 255)',
            'background-image': 'radial-gradient(circle at center, #f7f7f7, #f3d9ff)',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
        }
    },
    requires: new Decimal("25000"), // Can be a function that takes requirement increases into account
    resource: "Stardust", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    branches: ["BaseLayer"],
    resetDescription: "Form Stardust from Replicanti.<br>――――――――――――<br>",
    baseResource: "Replicanti", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.5, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Stardust<br>――――――――――――<br> <font size='2'>" +formatWhole(player.Stardust.points)+" <span style='color:#f3d9ff'>Star</span><span style='color:#f3fffe'>dust</span>"
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
    layerShown(){return player.points.gte('25000') || player.Stardust.total.gte('1')},
    passiveGeneration() {
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
addToBase() {
    let base = new Decimal(0);
    return base;
},
effectBase() {
    let base = new Decimal(1.25);
    base = base.plus(tmp.Stardust.addToBase);
    return base.pow(tmp.Stardust.power);
},
power() {
    let power = new Decimal(1);
    return power;
},
effect() {
    return Decimal.pow(tmp.Stardust.effectBase, player.Stardust.points);
},
milestones: {
        0: {
            requirementDescription: "<font size='3'><b>2 Stardust</b><font size='2'>",
            effectDescription() {return '――――――――――――――<br><font size="2">Unlocks Replicator 5.</span>'},
            done() {return player.Stardust.total.gte(2)},
            unlocked() {return player.Stardust.total.gte('1')},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    "background-image": 'radial-gradient(circle at center, #f7f7f7, #f3d9ff)',       
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
},
    upgrades: {
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
    componentStyles: {
        "prestige-button": {
             "background-image": 'radial-gradient(circle at center, #f7f7f7, #f3d9ff)',        
            'background-position': 'center center',
            'background-size': '160%',},
    },
    tabFormat: {
        "Stardust": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text",
                    function() {return ''+formatWhole(player.Stardust.points)+' <span style="color:#f3d9ff">Star</span><span style="color:#f3fffe">dust</span>'},
                    {"color": "#f3d9ff", "font-size": "33px"}],
                    ["raw-html", function() {if (player.Stardust.total.gte('1')) return "Which boosts all Replicators by "+quickBigColor(format(tmp.Stardust.effect),'#f3d9ff') +"x</span>"}, {"font-size": "19px"}],
                    ["display-text",
                        function() {return "―――――――――――――――――――――――――――――"},
                        {"color": "#9d9d9d", "font-size": "32px"}],
                    "prestige-button",
                    ["display-text",
                        function() {return "―――――――――――――――――――――――――――――"},
                        {"color": "#9d9d9d", "font-size": "32px"}],
                        "milestones",
            ]
            
        },
    },
})