addLayer("Start", {
    name: "Start", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        racePoints: new Decimal(0),
        racePointAmount: new Decimal(0),
        planetPoints: new Decimal(0),
        planetPointAmount: new Decimal(0),
        gotPoints: new Decimal(0),
        gameStarted: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "#FFFFFF",
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
    branches: ["Homeworld"],
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Origin<br>――――――――――――――<br>"
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
    layerShown(){return !player.Start.gameStarted.gte(1)},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    update(delta){
        let onepersec = new Decimal(1)
        //DNA Amount
        player.Start.racePointAmount = new Decimal(1)
        //if (hasUpgrade('Research', 1)) player.Start.racePointAmount = player.Start.racePointAmount.times(2)
        //Homeworld Amount
        player.Start.planetPointAmount = new Decimal(1)
    
    },
    milestones: {
    },
    upgrades: {  
        1: {    
            fullDisplay() {return `<font size="3"><b>Humans</b><font size="2"><br>――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` DNA`},        
            cost: new Decimal(1),
            currencyLocation() { return player.Start },
            currencyInternalName: "racePoints",
            unlocked() {return true},
            tooltip(){
                if (!hasUpgrade('Research', 11111)) return `<span style='font-size:18px'><span style='color:#ffffff'>Humans</span><br>――――――――――――<br><span style='font-size:11px'>Diverse pink-skinned creatures with a natural curiosity for the universe.</span><span style='font-size:13px'><br>――――――――――――――――――<br>Unique Features: ???<br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#E5E4E2'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#CAFF73',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        }, 
        1000: {    
            fullDisplay() {return `<font size="3"><b>Continental World</b><font size="2"><br>――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` DNA`},        
            cost: new Decimal(1),
            currencyLocation() { return player.Start },
            currencyInternalName: "planetPoints",
            unlocked() {return true},
            tooltip(){
                if (!hasUpgrade('Research', 11111)) return `<span style='font-size:18px'><span style='color:#ffffff'>Continental World</span><br>――――――――――――<br><span style='font-size:11px'>A common lush planet with large landmasses surrounded by vast seas.</span><span style='font-size:13px'><br>――――――――――――――――――<br>Unique Features: ???<br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#E5E4E2'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#CAFF73',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },       
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Evolve to gain DNA and a Homeworld.<font size='4'>" },
            canClick() { return !player.Start.gotPoints.gte(1)},
            unlocked() { return !player.Start.gotPoints.gte(1)},
            onClick() {
                player.Start.gotPoints = player.Start.gotPoints.add(1)
                player.Start.racePoints = player.Start.racePointAmount
                player.Start.planetPoints = player.Start.planetPointAmount
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        2: {
            title() { return "<font size='5'>Begin the game.<font size='4'><br>Req: A chosen Race and a Homeworld" },
            canClick() { return player.Start.racePoints.lte(0.1) && player.Start.planetPoints.lte(0.1) && player.Start.gotPoints.gte(1)},
            unlocked() { return player.Start.gotPoints.gte(1) && !player.Start.gameStarted.gte(1)},
            onClick() {
                player.Start.gameStarted = player.Start.gameStarted.add(1)
                player.tab = "Research"
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },

    },
     tabFormat: {
        "Primordial Soup": {
        content: [            
             ["display-text",
                         function() {return ''+formatWhole(player.Start.racePoints)+' DNA'},
                        {"color": "#FFFFFF", "font-size": "30px"}],
                        ["display-text",
                         function() {return ''+formatWhole(player.Start.planetPoints)+' Homeworlds'},
                        {"color": "#FFFFFF", "font-size": "30px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "StartTabs"],

                ]
            
        },
    },
        microtabs: {
            StartTabs: {
                "Evolve": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["row", [["clickable", 1]]],
                    ["row", [["clickable", 2]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ]
                },
                "Race": {
                    unlocked() { return player.Start.gotPoints.gte(1) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 1],]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        
                    ]
                },
                "Homeworld": {
                    unlocked() { return player.Start.gotPoints.gte(1) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 1000],]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        
                    ]
                },
            }
        },
})