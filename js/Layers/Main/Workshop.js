addLayer("Workshop", {
    name: "Workshop", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
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
                return `<span style='font-size:16px'><span style='color:#ffffff'>Brick Housing</span><br>――――――――――――<br><span style='font-size:11px'>Build better shelter using clay bricks. Upgrades Huts into Brick Houses, boosting their effect by 1.50x, but also their Food penalty by 1.75x.</span><br>――――――――――――――――――<br>
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
        9: {    
            fullDisplay() {return `<font size="3"><b>[WO9] Stone Pickaxe</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 5,
                Food: 50,
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
            unlocked() {return (hasUpgrade('Research', 24))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Pickaxe</span><br>――――――――――――<br><span style='font-size:11px'>Simple mining implement. Boosts Miners' effect by 1.15x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        10: {    
            fullDisplay() {return `<font size="3"><b>[WO10] Kilns</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 5,
                Food: 20,
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
            unlocked() {return (hasUpgrade('Workshop', 9))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Kilns</span><br>――――――――――――<br><span style='font-size:11px'>A simple type of versatile oven made out of bricks. Boosts Food gain by 1.05x and Brick Smelters' boost and penalties by 1.20x. </span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        11: {    
            fullDisplay() {return `<font size="3"><b>[WO11] Charcoal-Fueled Furnaces</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},        
            costs: {
                Minerals: 7,
                Wood: 20,
                Fuel: 2,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            unlocked() {return (hasUpgrade('Research', 27))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Charcoal-Fueled Furnaces</span><br>――――――――――――<br><span style='font-size:11px'>Upgrade Brick Furnaces with better fuel. Boosts furnaces' Metal boost by 50%, and they now halve Fuel instead of Wood.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        12: {    
            fullDisplay() {return `<font size="3"><b>[WO12] Tin Tools</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},        
            costs: {
                Minerals: 8,
                Metals: 2,
                Fuel: 2,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            unlocked() {return (hasUpgrade('Research', 29))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Tin Tools</span><br>――――――――――――<br><span style='font-size:11px'>Tin axes, farming tools, and pickaxes. Boosts Wood, Food, and Minerals gain by 25%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        13: {    
            fullDisplay() {return `<font size="3"><b>[WO13] Stone Wall</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Minerals: 4,
                Wood: 80,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 30))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Wall</span><br>――――――――――――<br><span style='font-size:11px'>Reinforce wooden walls with stone. Boosts Population gain by 10% and Food gain by 5%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        14: {    
            fullDisplay() {return `<font size="3"><b>[WO14] Copper Tools</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},        
            costs: {
                Minerals: 10,
                Metals: 3,
                Fuel: 6,
              },
              canAfford() {
                return player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            unlocked() {return (hasUpgrade('Research', 32))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Copper Tools</span><br>――――――――――――<br><span style='font-size:11px'>Copper axes, farming tools, and pickaxes. Boosts Wood, Food, and Minerals gain by 10%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        15: {    
            fullDisplay() {return `<font size="3"><b>[WO15] Straw Baskets</b><font size="2"><br>――――――――――――<br>
                  Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Food: 15,
                Wood: 22
              },
              canAfford() {
                return player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            unlocked() {return (hasUpgrade('Research', 35))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Straw Baskets</span><br>――――――――――――<br><span style='font-size:11px'>Better implements for gathering. Boosts Hunter-Gatherers' effects by 5%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        16: {    
            fullDisplay() {return `<font size="3"><b>[WO16] Straw Bedding</b><font size="2"><br>――――――――――――<br>
                  Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Food: 35,
                Wood: 55,
                Minerals: 23
              },
              canAfford() {
                return player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            unlocked() {return (hasUpgrade('Workshop', 15))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Straw Bedding</span><br>――――――――――――<br><span style='font-size:11px'>Bedding made out of straw. Boosts Stone Cabins' Population effect by 25%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
        17: {    
            fullDisplay() {return `<font size="3"><b>[WO17] Copper Shovels</b><font size="2"><br>――――――――――――<br>
                Costs: `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},        
            costs: {
                Wood: 58,
                Metals: 7,
                Fuel: 7,
              },
              canAfford() {
                return player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            unlocked() {return (hasUpgrade('Research', 36))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Copper Shovels</span><br>――――――――――――<br><span style='font-size:11px'>Shovels for digging. Boosts Mineral gain by 10%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(60deg, #da8977, #f4bbb5)",
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
                    function() {return "Workshop Tier 0: Rudimentary Tools"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "19px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "―――――――――――――――――――――――――――――"}, {"color": "#5E5D5D",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1], ["upgrade", 2], ["upgrade", 3], ["upgrade", 4],]]]],
                    ["column", [ ["row", [ ["upgrade", 5], ["upgrade", 6], ["upgrade", 7], ["upgrade", 8],]]]],
                    "blank",
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],

                    ]
                },
                "[WT1]": {
                    unlocked() { return hasUpgrade('Research', 24) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Workshop Tier 1: Basic Tools"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "19px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 23)) return '('+format(player.Metals.metalPoints)+' Metals)'}, {"color": "#BABABA", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 27)) return '('+format(player.Fuel.fuelPoints)+' Fuel)'}, {"color": "#b37171", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 10)) return "―――――――――――――――――――――――――――――"}, {"color": "#5E5D5D",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 9], ["upgrade", 10], ["upgrade", 11], ["upgrade", 12],]]]],
                    ["column", [ ["row", [ ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16],]]]],
                    ["column", [ ["row", [ ["upgrade", 17], ["upgrade", 18], ["upgrade", 19], ["upgrade", 20],]]]],
                    "blank",
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ]
                },
            }
        },
})