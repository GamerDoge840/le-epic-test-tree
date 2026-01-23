addLayer("Level", {
    name: "Level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "↑", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasUpgrade("Essence", 22)},
		points: new Decimal(0),
        bestLevel: new Decimal(0),
    }},
    color: "#D5E5F4",
    nodeStyle() {
        return {
            "background": "linear-gradient(200deg, #FFFFFF, #D5E5F4)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("1.5"), // Can be a function that takes requirement increases into account
    resource: "Level", // Name of prestige currency
    baseResource: "Essence", // Name of resource prestige is based on
    resetDescription: "Reset Essence amount, but Level up.<br>―――――――――――<br>",
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    branches: ["Essence"],
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Levels<br>――――――――――――――<br> <font size='2'><span style='color:#D5E5F4'> Level " +formatWhole(player.Level.points)+"</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        //Fix Static only doubling on first amount
        if (player.Level.points.gte(1) && !player.Level.points.gte(2)) mult = mult.dividedBy(1.25)

        //Upgrades
	    if (hasUpgrade('Essence', 24)) mult = mult.dividedBy(upgradeEffect('Essence', 24))

        //Buyables
	    mult = mult.dividedBy(tmp.Essence.buyables[9].effect2)

        //Milestones
        if (hasMilestone('Level', 7)) mult = mult.dividedBy(tmp.Level.milestones[7].effect)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("Essence", 22)},
    update() {
        //Get best Level
        if (player.Level.bestLevel.lt(player.Level.points)) player.Level.bestLevel = player.Level.points
    },
    essenceEffect() {
         let eff = player.Level.points.mul(0.2).add(1).pow(1.15)
        eff=eff.times(buyableEffect('Fruits', 5))
         return eff
    },
    onPrestige() {
        if (!hasUpgrade("Essence", 1011)) player.points = new Decimal(0)
    },
    bars: {
        levelbar: {
            unlocked() { return true},
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {
                return player.points.div(tmp.Level.nextAt)
            },
            display() {
                return "<h5>" + format(player.points) + "/" + format(tmp.Level.nextAt) + "<h5> Essence to next Level</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#87919C' },
       },
    },
    milestones: {
        1: {
        requirementDescription: "<font size='3'><b>(Level 3) Milestone Booster</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Boost Essence gain based on how many Level milestones you have.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Level.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Level.points.gte(3)},
        unlocked() {return true},
        effect() {
                let eff = Decimal.pow(1.50, player.Level.milestones.length);
                return eff
            },
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    2: {
        requirementDescription: "<font size='3'><b>(Level 7) Essence Expansion</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks a powerful new Essence upgrade.'},
        done() {return player.Level.points.gte(7)},
        unlocked() {return hasMilestone('Level', 1)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    3: {
        requirementDescription: "<font size='3'><b>(Level 13) Essence Expansion II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks another new Essence upgrade.'},
        done() {return player.Level.points.gte(13)},
        unlocked() {return hasMilestone('Level', 2)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    4: {
        requirementDescription: "<font size='3'><b>(Level 18) Fruits of Your Labor</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock Fruits.'},
        done() {return player.Level.points.gte(18)},
        unlocked() {return hasMilestone('Level', 3)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    5: {
        requirementDescription: "<font size='3'><b>(Level 24) Apple-Powered Essence</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Boost Essence gain based on Apples.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Level.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Level.points.gte(24)},
        unlocked() {return hasMilestone('Level', 4)},
        effect() {
                let eff = player.Fruits.apples.plus(1).pow(0.12);
                return eff;
            }, 
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    6: {
        requirementDescription: "<font size='3'><b>(Level 33) Fruits of Your Labor II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock more Fruit upgrades.'},
        done() {return player.Level.points.gte(33)},
        unlocked() {return hasMilestone('Level', 5)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    7: {
        requirementDescription: "<font size='3'><b>(Level 39) Pear-Powered Levels</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Divide Level requirement based on Pears.<br>――――――――――――――<br> Currently: /'+format(+format(tmp.Level.milestones[this.layer, this.id].effect))+'</span>'},
        done() {return player.Level.points.gte(39)},
        tooltip() {return "<span style='font-size:11px'><span style='color:#FFEB00'>Milestone effect softcapped after /1000."},
        unlocked() {return hasMilestone('Level', 6)},
        effect() {
                let eff = player.Fruits.pears.plus(1).pow(0.50);
                scpow = 0.25
                eff = softcap(eff, new Decimal("1000"), scpow)
                return eff;
            }, 
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    8: {
        requirementDescription: "<font size='3'><b>(Level 48) Purity</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock Purity, the first reset layer. Double Essence gain.'},
        done() {return player.Level.points.gte(48)},
        unlocked() {return hasMilestone('Level', 6)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background-color": "#D5E5F4",
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
    },
    challenges: {
    },
    clickables: {
    },
    componentStyles: {
        "prestige-button": {
            "background-color": "D5E5F4",
               "width": "225px",
                "height": "125px",
           },
    },
     tabFormat: {
        "Levels": {
        style() {return  {'background-color': '#1C1F21'}},
        content: [
            ["display-text",
            function() {return 'Level '+formatWhole(player.Level.points)+''},
            {"color": "#D5E5F4", "font-size": "30px"}],
            ["display-text",
            function() {return "Boosting Essence by <span style='color:#FFFFFF'> "+ format(tmp.Level.essenceEffect) +"x</span>"},
            {"font-size": "19px"}],
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#D5E5F4", "font-size": "32px"}],
                    function() {if (!hasUpgrade("Essence", 1011)) return "prestige-button"},
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#D5E5F4", "font-size": "32px"}],
                    ["bar", "levelbar"],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#D5E5F4", "font-size": "32px"}],
                    "milestones",
                ]
            
        },
    },
})