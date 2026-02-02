addLayer("Homeworld", {
    name: "Homeworld", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌎", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(50deg, #8CC4FF, #8CFF99)",
            'border': '2px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Homeworld<br>――――――――――――――<br> <font size='2'></span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade("Research", 2))},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: {
        "Buildings": {
        content: [
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '('+format(player.Population.populationPoints)+' Population)'}, {"color": "#FFF5C7", "font-size": "25px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '(+' + format(player.Population.populationGain.mul(1)) + '/s)'}, {"color": "#FFF5C7", "font-size": "20px"}],
        "blank",
        ["display-text",
            function() {return ''+format(player.Food.foodPoints)+' Food'},
            {"color": "#8ED47F", "font-size": "18px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 2)) return "(+" + format(player.Food.foodGain.mul(1)) + "/s)"}, {"color": "#8ED47F", "font-size": "15px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "EssenceTabs"],

                ]
            
        },
    },
        microtabs: {
            EssenceTabs: {
                "Bonfire": {
                    unlocked() { return hasUpgrade('Research', 5) },
                    content: [
                        "blank",

                    ]
                },
            }
        },
})