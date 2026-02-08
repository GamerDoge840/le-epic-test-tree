addLayer("Workshop", {
    name: "Workshop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚙️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#5E5D5D",
    nodeStyle() {
        return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
            'border': '2px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    branches: ["Homeworld", "Research"],
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Workshop<br>――――――――――――――<br> <font size='2'><span style='color:#BDF9FF'></span>"
        return tooltip
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('Research', 10))},
    milestones: {
    },
    upgrades: {     
        1: {    
            fullDisplay() {return `<font size="3"><b>[WO1] Throwing Spears</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.1,
                Food: 8,
                Wood: 5,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 10))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Throwing Spears</span><br>――――――――――――<br><span style='font-size:11px'>Long wooden sticks with a sharp pointed tip. Slightly increases Hunter-Gatherer's Food effect.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        2: {    
            fullDisplay() {return `<font size="3"><b>[WO2] Wooden Axe</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.105,
                Food: 9,
                Wood: 5,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Workshop', 1))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Wooden Axe</span><br>――――――――――――<br><span style='font-size:11px'>A crude wood-gathering tool with a blunt stone edge. Boosts Hunter-Gatherer's Wood effect by 25%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        3: {    
            fullDisplay() {return `<font size="3"><b>[WO3] Stone Axe</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 1,
                Food: 10,
                Wood: 4,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 11))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Axe</span><br>――――――――――――<br><span style='font-size:11px'>Slightly better wood-gathering tool with a sharp stone edge. Boosts Hunter-Gatherer's Wood effect by 25%, again.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        4: {    
            fullDisplay() {return `<font size="3"><b>[WO4] Stone Huts</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 2,
                Food: 11,
                Wood: 5,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Workshop', 3))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Huts</span><br>――――――――――――<br><span style='font-size:11px'>Build new huts made out of stone. Boosts Huts' population effect and Food penalty.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        5: {    
            fullDisplay() {return `<font size="3"><b>[WO5] Bow and Arrow</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.175,
                Food: 5,
                Wood: 7,
              },
             canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Workshop', 4))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Bow and Arrow</span><br>――――――――――――<br><span style='font-size:11px'>Invent a better ranged weapon. Further increases Hunter-Gatherer Food gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        6: {    
            fullDisplay() {return `<font size="3"><b>[WO6] Brick Housing</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 5,
                Food: 28,
                Wood: 25,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 18))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Brick Housing</span><br>――――――――――――<br><span style='font-size:11px'>Build better shelter using bricks. Upgrades Huts into Brick Houses, boosting their effect by 1.50x, but also their consumption by 1.75x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        7: {    
            fullDisplay() {return `<font size="3"><b>[WO7] Walls</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 3,
                Food: 11,
                Wood: 26,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Workshop', 6))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Walls</span><br>――――――――――――<br><span style='font-size:11px'>Build rudimentary walls around your settlement to keep animals and intruders out. Boosts Population, Food, Wood, and Minerals by 1.05x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        }, 
        8: {    
            fullDisplay() {return `<font size="3"><b>[WO8] Stone Farming Tools</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 10,
                Food: 10,
                Wood: 50,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 19))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Farming Tools</span><br>――――――――――――<br><span style='font-size:11px'>Makeshift stone tools to aid with farming. Boosts Growing Plots' effect by 1.05x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Cow Tools”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#A35F00',
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
                'background-color': '#918D80',
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
        "Workshop": {
        style() {return  {'background-color': '#262521'}},
        content: [
                    "blank",
                           ["microtabs", "WorkshopTabs"],

                ]
            
        },
    },
        microtabs: {
            WorkshopTabs: {
                "[WT0]": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Workshop Tier 0: Rudimentary"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4],]]]],
                    ["column", [ ["row", [ ["upgrade", 5], ["upgrade", 6], ["upgrade", 7], ["upgrade", 8],]]]],
                    "blank",
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "19px"}],

                    ]
                },
            }
        },
})