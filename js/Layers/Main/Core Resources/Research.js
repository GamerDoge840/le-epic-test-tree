addLayer("Research", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
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
        let tooltip = "<font size='3'>Research<br>――――――――――――――<br> <font size='2'><span style='color:#BDF9FF'> " +format(player.points)+" Research</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    //automate() {
    //if (hasUpgrade("Research", 1))
       // {
            //buyUpgrade("Research", 2)
        //}
    //},
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    milestones: {
    },
    upgrades: {     
        1: {    
            fullDisplay() {return `<font size="3"><b>[R01] Sapience</b><font size="2"><br>――――――――――――<br>Cost: Free`},        
            cost: new Decimal(0),
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
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research,
                 `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},        
            costs: {
                Research: 0.0220,
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
        4: {    
            fullDisplay() {return `<font size="3"><b>[R04] Foraging</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+format(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},        
            costs: {
                Research: 0.0300,
                Food: 1.5,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 3],
            unlocked() {return (hasUpgrade('Research', 3))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Foraging</span><br>――――――――――――<br><span style='font-size:11px'>Develop basic foraging and hunting techniques. Unlocks the first Job.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        5: {    
            fullDisplay() {return `<font size="3"><b>[R05] Twig Gathering</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},        
            costs: {
                Research: 0.0400,
                Food: 3,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 4],
            unlocked() {return (hasUpgrade('Research', 4))},
            tooltip(){
                if (!hasUpgrade('Research', 5)) return `<span style='font-size:16px'><span style='color:#ffffff'>Twig Gathering</span><br>――――――――――――<br><span style='font-size:11px'>Start picking twigs up off the ground. Enables Wood generation.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: 0 Wood/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Wood catches on fire easily. We should pick up some more...”`
                if (hasUpgrade('Research', 5)) return `<span style='font-size:16px'><span style='color:#ffffff'>Twig Gathering</span><br>――――――――――――<br><span style='font-size:11px'>Start picking twigs up off the ground. Enables Wood generation.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` + format(player.Wood.woodGain.mul(1)) + ` Wood/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Wood catches on fire easily. We should pick up some more...”`
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
        6: {    
            fullDisplay() {return `<font size="3"><b>[R06] Lumber Gatherers</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.0300,
                Food: 3,
                Wood: 1,
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
            branches: ["Research", 5],
            unlocked() {return (hasUpgrade('Research', 5))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Lumber Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Hunter-Gatherers gain a second effect which boosts Wood gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        7: {    
            fullDisplay() {return `<font size="3"><b>[R07] Rudimentary Housing</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+format(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.0400,
                Food: 5,
                Wood: 3.5,
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
            branches: ["Research", 6],
            unlocked() {return (hasUpgrade('Research', 6))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Rudimentary Housing</span><br>――――――――――――<br><span style='font-size:11px'>Learn how to construct simple huts from sticks and mud. Unlocks the first Building.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Better than staying outside...”`
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
        8: {    
            fullDisplay() {return `<font size="3"><b>[R08] Time Keeping</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.0600,
                Food: 8,
                Wood: 1,
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
            branches: ["Research", 6],
            unlocked() {return (hasUpgrade('Research', 7))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Time Keeping</span><br>――――――――――――<br><span style='font-size:11px'>Watch the Sun and try to start keeping track of time. Doubles Research gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“What's up with that big ball of fire in the sky anyway?”`
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
        9: {    
            fullDisplay() {return `<font size="3"><b>[R09] Bigger Huts</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.0900,
                Food: 6,
                Wood: 2,
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
            branches: ["Research", 7],
            unlocked() {return (hasUpgrade('Research', 8))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Bigger Huts</span><br>――――――――――――<br><span style='font-size:11px'>Try to expand your huts to cram more people in them. Boosts huts' effect to Population gain, but also increases their Food penalty.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        10: {    
            fullDisplay() {return `<font size="3"><b>[R10] Wooden Tools</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.11,
                Food: 8,
                Wood: 3,
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
            branches: ["Research", 9],
            unlocked() {return (hasUpgrade('Research', 9))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Wooden Tools</span><br>――――――――――――<br><span style='font-size:11px'>Discover how to make rudimentary wooden tools. Unlocks the Workshop tab.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        11: {    
            fullDisplay() {return `<font size="3"><b>[R11] Knapping</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.12,
                Food: 11,
                Wood: 4,
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
            branches: ["Research", 10],
            unlocked() {return (hasUpgrade('Research', 10))},
            tooltip(){
                if (!hasUpgrade('Research', 11)) return `<span style='font-size:16px'><span style='color:#ffffff'>Knapping</span><br>――――――――――――<br><span style='font-size:11px'>Figure out how to shape rocks and begin the Stone Age for real. Enables Mineral generation by gathering rocks off the ground, and unlocks new upgrades in the workshop.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: 0 Minerals/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
                if (hasUpgrade('Research', 11)) return `<span style='font-size:16px'><span style='color:#ffffff'>Knapping</span><br>――――――――――――<br><span style='font-size:11px'>Figure out how to shape rocks and begin the Stone Age for real. Enables Mineral generation by gathering rocks off the ground, and unlocks new upgrades in the workshop.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` + format(player.Minerals.mineralGain.mul(1)) + ` Minerals/s</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
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
        12: {    
            fullDisplay() {return `<font size="3"><b>[R12] Stone Foraging</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food,
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},        
            costs: {
                Research: 0.17,
                Food: 8,
                Minerals: 1,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 11, "Research", 10],
            unlocked() {return (hasUpgrade('Research', 11))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Foraging</span><br>――――――――――――<br><span style='font-size:11px'>Hunter-Gatherers gain another effect that boosts Mineral gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Hey, that's a cool looking rock...”`
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
        13: {    
            fullDisplay() {return `<font size="3"><b>[R13] Cooking</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.10,
                Food: 10,
                Wood: 8,
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
            branches: ["Research", 12],
            unlocked() {return (hasUpgrade('Research', 12))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Cooking</span><br>――――――――――――<br><span style='font-size:11px'>Roast raw food using fire, boosting Food gain by 50%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        14: {    
            fullDisplay() {return `<font size="3"><b>[R14] Woodcutting</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},        
            costs: {
                Research: 0.10,
                Wood: 8,
                Minerals: 3,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 12],
            unlocked() {return (hasUpgrade('Research', 12))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Woodcutting</span><br>――――――――――――<br><span style='font-size:11px'>Splitting logs in half boosts Wood gain by 50%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        15: {    
            fullDisplay() {return `<font size="3"><b>[R15] Lumberjacks</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.11,
                Food: 30,
                Wood: 15,
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
            branches: ["Research", 13, "Research", 14],
            unlocked() {return (hasUpgrade('Research', 13) && hasUpgrade('Research', 14))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Lumberjacks</span><br>――――――――――――<br><span style='font-size:11px'>Unlocks the Lumberjack job.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        16: {    
            fullDisplay() {return `<font size="3"><b>[R16] Sun Dial</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},        
            costs: {
                Research: 0.15,
                Wood: 8,
                Minerals: 6,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 15],
            unlocked() {return (hasUpgrade('Research', 15))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Sun Dial</span><br>――――――――――――<br><span style='font-size:11px'>Build the first real time-tracking device using stone. Triples Research gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        17: {    
            fullDisplay() {return `<font size="3"><b>[R17] Clay Working</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},        
            costs: {
                Research: 0.4,
                Food: 40,
                Minerals: 3,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 15],
            unlocked() {return (hasUpgrade('Research', 16))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Clay Working</span><br>――――――――――――<br><span style='font-size:11px'>Investigate Clay, a substance that might be able to be used as a building material. 1.25x to Mineral gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        18: {    
            fullDisplay() {return `<font size="3"><b>[R18] Mudbricks</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},        
            costs: {
                Research: 0.5,
                Food: 30,
                Minerals: 4,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 16, "Research", 17,],
            unlocked() {return (hasUpgrade('Research', 17))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Mudbricks</span><br>――――――――――――<br><span style='font-size:11px'>Learn how to make simple types of mudbricks from clay and soil. Unlocks new upgrades in the Workshop tab and boosts Mineral gain by 1.10x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        19: {    
            fullDisplay() {return `<font size="3"><b>[R19] Agriculture</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},        
            costs: {
                Research: 0.9,
                Food: 10,
                Wood: 50,
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
            branches: ["Research", 18,],
            unlocked() {return (hasUpgrade('Research', 18))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Agriculture</span><br>――――――――――――<br><span style='font-size:11px'>Learn the basics of growing food. Unlocks the Growing Plots building, and another new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Infinite food glitch...?”`
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
        20: {    
            fullDisplay() {return `<font size="3"><b>[R20] Herbal Medicines</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food `},        
            costs: {
                Research: 0.6,
                Food: 10,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 18],
            unlocked() {return (hasUpgrade('Research', 18))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Herbal Medicines</span><br>――――――――――――<br><span style='font-size:11px'>Attempt to treat injuries and sicknesses with herbal remedies. Boosts Population gain by 1.25x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Some of them might have...different uses than the rest.”`
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
        21: {    
            fullDisplay() {return `<font size="3"><b>[R21] Taming</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food `},        
            costs: {
                Research: 0.9,
                Food: 10,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 20, "Research", 19],
            unlocked() {return (hasUpgrade('Research', 20) && hasUpgrade('Research', 19))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Taming</span><br>――――――――――――<br><span style='font-size:11px'>Learn how to tame wild animals to keep as pets. Boosts Population and Food gain by 1.05x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        22: {    
            fullDisplay() {return `<font size="3"><b>[R22] Metal Gathering</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 0.6,
                Wood: 80,
                Minerals: 10
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 21,],
            unlocked() {return (hasUpgrade('Research', 21))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Metal Gathering</span><br>――――――――――――<br><span style='font-size:11px'>Examine some of the harder rocks you keep finding while gathering stones. Boosts Minerals gain by 1.25x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        23: {    
            fullDisplay() {return `<font size="3"><b>[R23] Smelting</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 0.85,
                Wood: 92,
                Minerals: 10
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 22,],
            unlocked() {return (hasUpgrade('Research', 22))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Smelting</span><br>――――――――――――<br><span style='font-size:11px'>Figure out how to smelt minerals and bring the Stone Age to the end. Unlocks Research Tier 1, a new resource, and the Brick Furnace.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        24: {    
            fullDisplay() {return `<font size="3"><b>[R24] Mining</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metal `},                
            costs: {
                Research: 0.8,
                Metals: 1
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
              },
            unlocked() {return (hasUpgrade('Research', 23))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Mining</span><br>――――――――――――<br><span style='font-size:11px'>Venture into caves in search of more ores. Unlocks the Miners job, and more Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        25: {    
            fullDisplay() {return `<font size="3"><b>[R25] Prospecting</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+format(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1.3,
                Metals: 1.75,
                Minerals: 5
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 24,],
            unlocked() {return (hasUpgrade('Research', 24))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Prospecting</span><br>――――――――――――<br><span style='font-size:11px'>Look into techniques for better locating ore. Miners gain a new effect which also very slightly boosts Metal gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        26: {    
            fullDisplay() {return `<font size="3"><b>[R26] Stone Carving</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 0.25,
                Metals: 1,
                Minerals: 3
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 24,],
            unlocked() {return (hasUpgrade('Research', 24))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Carving</span><br>――――――――――――<br><span style='font-size:11px'>The most rudimentary technique for long-term knowledge storage. Doubles Research gain.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        27: {    
            fullDisplay() {return `<font size="3"><b>[R27] Charcoal</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1.9,
                Wood: 60,
                Minerals: 8
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 25, "Research", 26,],
            unlocked() {return (hasUpgrade('Research', 25) && hasUpgrade('Research', 26))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Charcoal</span><br>――――――――――――<br><span style='font-size:11px'>Unlocks Fuel, a new building, and new Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        28: {    
            fullDisplay() {return `<font size="3"><b>[R28] Metalworking</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},                
            costs: {
                Research: 2,
                Metals: 6,
                Fuel: 1
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            branches: ["Research", 27,],
            unlocked() {return (hasUpgrade('Research', 27))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Metalworking</span><br>――――――――――――<br><span style='font-size:11px'>Research more methods of metal production. Boost Mineral gain by 20% and Metal gain by 10%.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        29: {    
            fullDisplay() {return `<font size="3"><b>[R29] Tin</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1.5,
                Minerals: 7,
                Metals: 3
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 27,],
            unlocked() {return (hasUpgrade('Research', 27))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Tin</span><br>――――――――――――<br><span style='font-size:11px'>Discover Tin ore. Boost Minerals gain by 5% and unlock a new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        30: {    
            fullDisplay() {return `<font size="3"><b>[R30] Stoneworking</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 2,
                Minerals: 12,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 27,],
            unlocked() {return (hasUpgrade('Research', 27))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stoneworking</span><br>――――――――――――<br><span style='font-size:11px'>Figure out how to effectively use stone as a building material. Boosts Minerals gain by 10% and unlocks a new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        31: {    
            fullDisplay() {return `<font size="3"><b>[R31] Stone Housing</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 1.4,
                Minerals: 11,
                Food: 150,
                Wood: 50
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Wood.woodPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);

              },
            branches: ["Research", 28, "Research", 29, "Research", 30,],
            unlocked() {return (hasUpgrade('Research', 28) && hasUpgrade('Research', 29) && hasUpgrade('Research', 30))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Housing</span><br>――――――――――――<br><span style='font-size:11px'>Design a more comfortable kind of housing. Unlocks a new building.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        32: {    
            fullDisplay() {return `<font size="3"><b>[R32] Copper</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1.5,
                Minerals: 7,
                Metals: 8
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 31,],
            unlocked() {return (hasUpgrade('Research', 31))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Copper</span><br>――――――――――――<br><span style='font-size:11px'>Discover Copper ore. Boost Minerals gain by 5% again and unlock a new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        33: {    
            fullDisplay() {return `<font size="3"><b>[R33] Storage Theory</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, 
                `+formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood`},                
            costs: {
                Research: 1.5,
                Minerals: 13,
                Wood: 70
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ["Research", 31,],
            unlocked() {return (hasUpgrade('Research', 31))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Storage Theory</span><br>――――――――――――<br><span style='font-size:11px'>Unlocks another new building.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Figuring out how to store things...”`
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
        34: {    
            fullDisplay() {return `<font size="3"><b>[R34] Leatherworking</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 1.5,
                Food: 50
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 32, "Research", 33,],
            unlocked() {return (hasUpgrade('Research', 32) && hasUpgrade('Research', 33))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Leatherworking</span><br>――――――――――――<br><span style='font-size:11px'>Clothing and armor from animal skins. Boosts Hunter-Gatherers by 10% but divides Food gain by /0.30.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        35: {    
            fullDisplay() {return `<font size="3"><b>[R35] Straw Working</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 1.3,
                Food: 60,
                Wood: 50
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
            branches: ["Research", 34,],
            unlocked() {return (hasUpgrade('Research', 34))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Straw Working</span><br>――――――――――――<br><span style='font-size:11px'>Look into using dry stalk byproducts from farming as a new building material. Unlocks new Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        36: {    
            fullDisplay() {return `<font size="3"><b>[R36] Digging Tools</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1,
                Minerals: 10,
                Wood: 30
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
              },
            branches: ["Research", 34,],
            unlocked() {return (hasUpgrade('Research', 34))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Digging Tools</span><br>――――――――――――<br><span style='font-size:11px'>Implements for soil collection and more. Unlocks a new workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        37: {    
            fullDisplay() {return `<font size="3"><b>[R37] Culture</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Population)+` Population`},                
            costs: {
                Research: 1.5,
                Population: 125,
                Food: 90
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Population.populationPoints.gte(this.costs.Population)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Population.populationPoints = player.Population.populationPoints.minus(this.costs.Population);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ["Research", 36, 'Research', 35],
            unlocked() {return (hasUpgrade('Research', 36) && hasUpgrade('Research', 35))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Culture</span><br>――――――――――――<br><span style='font-size:11px'>Unlocks a new resource and tab in the Homeworld layer.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        38: {    
            fullDisplay() {return `<font size="3"><b>[R38] Stone Monoliths</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture`},                
            costs: {
                Research: 3,
                Culture: 1,
                Minerals: 25
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Culture.culturePoints.gte(this.costs.Culture)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ['Research', 37],
            unlocked() {return (hasUpgrade('Research', 36))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Monoliths</span><br>――――――――――――<br><span style='font-size:11px'>Unlocks the first Culture building.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“Inventing Stonehenge.”`
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
        39: {    
            fullDisplay() {return `<font size="3"><b>[R39] Water Logistics</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 1.4,
                Food: 80,
                Minerals: 6
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ['Research', 38],
            unlocked() {return (hasUpgrade('Research', 36))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Water Logistics</span><br>――――――――――――<br><span style='font-size:11px'>New methods of obtaining and transporting water. Unlocks several new Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        40: {    
            fullDisplay() {return `<font size="3"><b>[R40] Torches</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},                
            costs: {
                Research: 3,
                Wood: 70,
                Fuel: 9,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            branches: ['Research', 39],
            unlocked() {return (hasUpgrade('Research', 39))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Torches</span><br>――――――――――――<br><span style='font-size:11px'>A basic source of lighting that will help mining. Boosts Miners' Metal boost by 1.5x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        41: {    
            fullDisplay() {return `<font size="3"><b>[R41] Aluminium</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                 +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 0.850,
                Metals: 6,
                Minerals: 20
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ['Research', 40],
            unlocked() {return (hasUpgrade('Research', 40))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Aluminium</span><br>――――――――――――<br><span style='font-size:11px'>Discover Aluminium from Bauxite. Unlocks a new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        42: {    
            fullDisplay() {return `<font size="3"><b>[R42] Metal Collecting</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 2,
                Metals: 4,
                Minerals: 35,
                Food: 200
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ['Research', 41],
            unlocked() {return (hasUpgrade('Research', 41))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Metal Collecting</span><br>――――――――――――<br><span style='font-size:11px'>Identify and gather natural metallic rocks laying on the ground. Hunter-Gatherers gain a new effect which provides a small boost to Metals.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        43: {    
            fullDisplay() {return `<font size="3"><b>[R43] Agriculture II</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food`},                
            costs: {
                Research: 1.5,
                Wood: 205,
                Food: 130
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Food.foodPoints.gte(this.costs.Food)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
              },
            branches: ['Research', 42],
            unlocked() {return (hasUpgrade('Research', 42))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Agriculture II</span><br>――――――――――――<br><span style='font-size:11px'>Better methods for agriculture. Upgrades Growing Plots into Fields, boosts their effect by 1.25x, and unlocks a new Workshop upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        44: {    
            fullDisplay() {return `<font size="3"><b>[R44] Fire Handling</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture`},                
            costs: {
                Research: 2.20,
                Wood: 80,
                Culture: 10
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            branches: ['Research', 43],
            unlocked() {return (hasUpgrade('Research', 43))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Fire Handling</span><br>――――――――――――<br><span style='font-size:11px'>Bigger fires. Unlocks the second Culture building.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        45: {    
            fullDisplay() {return `<font size="3"><b>[R45] Storage Containers</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals`},                
            costs: {
                Research: 1.6,
                Wood: 60,
                Minerals: 15
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
              },
            branches: ['Research', 43],
            unlocked() {return (hasUpgrade('Research', 43))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Storage Containers</span><br>――――――――――――<br><span style='font-size:11px'>Design more methods for resource storage. Unlocks new Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        46: {    
            fullDisplay() {return `<font size="3"><b>[R46] Charcoal Piles</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},                
            costs: {
                Research: 4.5,
                Wood: 135,
                Fuel: 7
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
              },
            branches: ['Research', 44],
            unlocked() {return (hasUpgrade('Research', 44))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Charcoal Piles</span><br>――――――――――――<br><span style='font-size:11px'>Bigger pits for better Charcoal production. Boosts Charcoal Pits' effect and penalty by 1.25x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        47: {    
            fullDisplay() {return `<font size="3"><b>[R47] Exploration</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Food)+` Food, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Population)+` Population`},                
            costs: {
                Research: 1.5,
                Food: 200,
                Population: 310
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Food.foodPoints.gte(this.costs.Food)
                    && player.Population.populationPoints.gte(this.costs.Population)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Food.foodPoints = player.Food.foodPoints.minus(this.costs.Food);
                player.Population.populationPoints = player.Population.populationPoints.minus(this.costs.Population);
              },
            branches: ['Research', 45],
            unlocked() {return (hasUpgrade('Research', 45))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Exploration</span><br>――――――――――――<br><span style='font-size:11px'>Send more of your people out in order to explore the wilds more thoroughly. Boost Hunter-Gatherers' effect to Minerals and Metals by 1.15x and Research gain by 1.25x, but divide population gain by /1.30.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        48: {    
            fullDisplay() {return `<font size="3"><b>[R48] Building Materials</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Minerals)+` Minerals, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Metals)+` Metals `},                
            costs: {
                Research: 2,
                Wood: 140,
                Minerals: 80,
                Metals: 11
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Minerals.mineralPoints.gte(this.costs.Minerals)
                    && player.Metals.metalPoints.gte(this.costs.Metals)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.minus(this.costs.Minerals);
                player.Metals.metalPoints = player.Metals.metalPoints.minus(this.costs.Metals);
              },
            branches: ['Research', 46, 'Research', 47],
            unlocked() {return (hasUpgrade('Research', 46) && hasUpgrade('Research', 47))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Building Materials</span><br>――――――――――――<br><span style='font-size:11px'>New materials for building. Unlocks new Workshop upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        49: {    
            fullDisplay() {return `<font size="3"><b>[R49] Firewood</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Wood)+` Wood, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture, `
                +formatWhole(tmp[this.layer].upgrades[this.id].costs.Fuel)+` Fuel`},                
            costs: {
                Research: 4.8,
                Wood: 115,
                Culture: 44,
                Fuel: 2
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
                    && player.Wood.woodPoints.gte(this.costs.Wood)
                    && player.Culture.culturePoints.gte(this.costs.Culture)
                    && player.Fuel.fuelPoints.gte(this.costs.Fuel)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
                player.Wood.woodPoints = player.Wood.woodPoints.minus(this.costs.Wood);
                player.Fuel.fuelPoints = player.Fuel.fuelPoints.minus(this.costs.Fuel);
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            branches: ['Research', 48],
            unlocked() {return (hasUpgrade('Research', 48))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Firewood</span><br>――――――――――――<br><span style='font-size:11px'>Better, more flammable wood. Boost Fuel gain and Bonfires' first effect by 1.25x and unlock more Culture upgrades.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
        50: {    
            fullDisplay() {return `<font size="3"><b>[R50] Mathematics</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Research)+` Research `
                },                
            costs: {
                Research: 4,
              },
              canAfford() {
                return player.points.gte(this.costs.Research)
              },
              pay() {
                player.points = player.points.minus(this.costs.Research);
              },
            branches: ['Research', 49],
            unlocked() {return (hasUpgrade('Research', 49))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Mathematics</span><br>――――――――――――<br><span style='font-size:11px'>Beginning of new research methods. Boosts Research gain by 1.50x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
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
                    {"color": "#BDF9FF", "font-size": "32px"}],
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
                    function() {return "Research Tier 0: Prehistoric"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 5)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "―――――――――――――――――――――――――――――"}, {"color": "#BDF9FF",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 2], "blank", ["upgrade", 3], "blank", ["upgrade", 4], ]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 5], "blank", ["upgrade", 6], "blank",  ["upgrade", 8],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 7], "blank", ["upgrade", 9], "blank",]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 10], "blank", ["upgrade", 11],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 12]]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 13], "blank", ["upgrade", 14]]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 16], "blank", ["upgrade", 15], "blank", ["upgrade", 17]]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 18]]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 19], "blank", ["upgrade", 20]]]]],
                    "blank",
                    ["column", [ ["row", [["upgrade", 21]]]]],
                    "blank",
                    ["column", [ ["row", [["upgrade", 22]]]]],
                    "blank",
                    ["column", [ ["row", [["upgrade", 23]]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                    ]
                },
                "[RT1]": {
                    unlocked() { return hasUpgrade('Research', 23) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                        ["display-text",
                    function() {return "Research Tier 1: Primitive"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "(" + format(player.Food.foodPoints) + " Food)"}, {"color": "#8ED47F", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 5)) return '('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 11)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 23)) return '('+format(player.Metals.metalPoints)+' Metals)'}, {"color": "#BABABA", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 27)) return '('+format(player.Fuel.fuelPoints)+' Fuel)'}, {"color": "#b37171", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "―――――――――――――――――――――――――――――"}, {"color": "#BDF9FF",}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 24],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 25], "blank", ["upgrade", 26],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 27],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 28], "blank", ["upgrade", 29], "blank", ["upgrade", 30],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 32], "blank", ["upgrade", 31], "blank", ["upgrade", 33],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 34],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 35], "blank", ["upgrade", 36],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 37], "blank", ["upgrade", 38], "blank", ["upgrade", 39],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 40], "blank", ["upgrade", 41], "blank", ["upgrade", 42],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 43],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 44], "blank", ["upgrade", 45],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 46], "blank", ["upgrade", 47],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 48],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 49], "blank", ["upgrade", 50],]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#BDF9FF", "font-size": "32px"}],

                    ]
                },
            }
        },
})