addLayer("Research", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🔍", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#BDF9FF",
    nodeStyle() {
        return {
            "background": "linear-gradient(100deg, #BDF9FF, #8CF9FF)",
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
        let tooltip = "<font size='3'>Research<br>――――――――――――――<br> <font size='2'><span style='color:#BDF9FF'> " +formatWhole(player.points)+" Research</span>"
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
    layerShown(){return player.Start.gameStarted.gte(1)},
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
        1: {    
            fullDisplay() {return `<font size="3"><b>[R01] Sapience</b><font size="2"><br>――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Sapience</span><br>――――――――――――<br><span style='font-size:11px'>Attain the ability to understand. Begin learning more about the world around you.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: `+format(getPointGen()) +` Research/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“I think, therefore I am.”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
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
                'background-color': '#8CF9FF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },   
        2: {    
            fullDisplay() {return `<font size="3"><b>[R02] Gathering</b><font size="2"><br>――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.0150),
            branches: ["Research", 1],
            currencyInternalName: "points",
            unlocked() {return (hasUpgrade('Research', 1))},
            tooltip(){
                if (!hasUpgrade('Research', 2)) return `<span style='font-size:16px'><span style='color:#ffffff'>Gathering</span><br>――――――――――――<br><span style='font-size:11px'>Start gathering Food. Unlocks a new tab.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: 0 Food/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“I need to eat to survive.”`
                if (hasUpgrade('Research', 2)) return `<span style='font-size:16px'><span style='color:#ffffff'>Gathering</span><br>――――――――――――<br><span style='font-size:11px'>Start gathering Food. Unlocks a new tab.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` + format(player.Food.foodGain.mul(1)) + ` Food/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“I need to eat to survive.”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
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
                'background-color': '#8CF9FF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        }, 
        3: {    
            fullDisplay() {return `<font size="3"><b>[R03] Fire</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research and `+format(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},        
            costs: {
                Research: 0.0250,
                Food: 1,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 2],
            unlocked() {return (hasUpgrade('Research', 2))},
            tooltip(){
                if (!hasUpgrade('Research', 3)) return `<span style='font-size:16px'><span style='color:#ffffff'>Fire</span><br>――――――――――――<br><span style='font-size:11px'>The discovery of Fire will bring your people together, enabling the generation of Population.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: 0 Population/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Hitting rocks together makes a strange, dangerous, hot, orange...thing. How could this be helpful?”`
                if (hasUpgrade('Research', 3)) return `<span style='font-size:16px'><span style='color:#ffffff'>Fire</span><br>――――――――――――<br><span style='font-size:11px'>The discovery of Fire will bring your people together, enabling the generation of Population.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` + format(player.Population.populationGain.mul(1)) + ` Population/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Hitting rocks together makes a strange, dangerous, hot, orange...thing. How could this be helpful?”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
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
                'background-color': '#8CF9FF',
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
    },
     tabFormat: {
        "Research Tree": {
        style() {return  {'background-color': '#00171A'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Research'},
            {"color": "#BDF9FF", "font-size": "30px"}],
            
                                            ["raw-html", function() {if (hasUpgrade("Research", 1)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Research/s)"}, {"font-size": "30px"}],                  
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "ResearchTabs"],

                ]
            
        },
    },
        microtabs: {
            ResearchTabs: {
                "[RT0]": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Research Tier 0: Pre-Historic"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 2], "blank", ["upgrade", 3],]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],

                    ]
                },
            }
        },
})