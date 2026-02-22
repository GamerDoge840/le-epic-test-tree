addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "☆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    color: "gold",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {return ""+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+" Achievements"},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    achievements: {
		1:{
			name: "<font size='3'>[1]<br><span style='color:#FFFFFF'>The Bean-ginning</span>",
            done() {return getBuyableAmount("Beans", 1).gte(1)},
            //done() {return player.points.gte('1')},
            tooltip() {return "Buy your first Bean Booster.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“Every journey has to start somewhere...”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        2:{
			name: "<font size='3'>[2]<br><span style='color:#FFFFFF'>Beans, I</span>",
            done() {return getBuyableAmount("Beans", 1).gte(10)},
            tooltip() {return "Buy the Bean Booster 10 times.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        3:{
			name: "<font size='3'>[3]<br><span style='color:#FFFFFF'>One whole Bean</span>",
            done() {return player.points.gte('1')},
            tooltip() {return "Fully grow a single Bean.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        4:{
			name: "<font size='3'>[4]<br><span style='color:#FFFFFF'>Baby's First Level</span>",
            done() {return player.BeanLevel.points.gte('1')},
            tooltip() {return "Get your first Bean Level.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        5:{
			name: "<font size='3'>[5]<br><span style='color:#FFFFFF'>Grow Quicker, Please</span>",
            done() {return getBuyableAmount("Beans", 1).gte(20)},
            tooltip() {return "Buy Bean Booster 20 times.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        6:{
			name: "<font size='3'>[6]<br><span style='color:#FFFFFF'>Level It Faster</span>",
            unlocked() { return hasAchievement("ach", 5) },
            done() {return getBuyableAmount("Beans", 2).gte(10)},
            tooltip() {return "Buy Bean Level Booster ten times.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        7:{
			name: "<font size='3'>[7]<br><span style='color:#FFFFFF'>Beans, II</span>",
            unlocked() { return hasAchievement("ach", 5) },
            done() {return getBuyableAmount("Beans", 3).gte(10)},
            tooltip() {return "Buy Bean Booster II ten times.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“They shouldn't have released the sequel so soon”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        8:{
			name: "<font size='3'>[8]<br><span style='color:#FFFFFF'>Leveling those Beans</span>",
            unlocked() { return hasAchievement("ach", 5) },
            done() {return player.BeanLevel.points.gte('10')},
            tooltip() {return "Reach Bean Level 10.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        9:{
			name: "<font size='3'>[9]<br><span style='color:#FFFFFF'>Pile of Beans</span>",
            unlocked() { return hasAchievement("ach", 5) },
            done() {return player.points.gte('100')},
            tooltip() {return "Get 100 Beans.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        10:{
			name: "<font size='3'>[10]<br><span style='color:#FFFFFF'>Cash Money</span>",
            unlocked() { return hasAchievement("ach", 5) },
            done() {return player.Money.moneyResetAmount.gte('1')},
            tooltip() {return "Perform the first reset once.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“I sell hundreds of beans and only get a few dollars? What a scam”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#1BC42F",
                    "border-width": "3px"
                }
            }
        },
        11:{
			name: "<font size='3'>[11]<br><span style='color:#FFFFFF'>Cash Money, Cash</span>",
            unlocked() { return hasAchievement("ach", 10) },
            done() {return player.Money.moneyResetAmount.gte('2')},
            tooltip() {return "Perform the first reset twice.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“As it turns out, doubling those Beans makes it a bit faster”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#1BC42F",
                    "border-width": "3px"
                }
            }
        },
        12:{
			name: "<font size='3'>[12]<br><span style='color:#FFFFFF'>Silo of Beans</span>",
            unlocked() { return hasAchievement("ach", 10) },
            done() {return player.points.gte('10000')},
            tooltip() {return "Get 10,000 Beans.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        13:{
			name: "<font size='3'>[13]<br><span style='color:#FFFFFF'>Interesting</span>",
            unlocked() { return hasAchievement("ach", 10) },
            done() {return getBuyableAmount("Money", 3).gte(1)},
            tooltip() {return "Buy Interest once.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#1BC42F",
                    "border-width": "3px"
                }
            }
        },
        14:{
			name: "<font size='3'>[14]<br><span style='color:#FFFFFF'>Shovels and Hoes</span>",
            unlocked() { return hasAchievement("ach", 10) },
            done() {return getBuyableAmount("Money", 1).gte(10)},
            tooltip() {return "Buy Farming Gear ten times.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#1BC42F",
                    "border-width": "3px"
                }
            }
        },
        15:{
			name: "<font size='3'>[15]<br><span style='color:#FFFFFF'>Boosting the Boost</span>",
            unlocked() { return hasAchievement("ach", 10) },
            done() {return getBuyableAmount("Beans", 4).gte(1)},
            tooltip() {return "Buy Bean Level Enhancer once.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#C19A6B",
                    "border-width": "3px"
                }
            }
        },
        16:{
			name: "<font size='3'>[16]<br><span style='color:#FFFFFF'>Baby's First Autobuyer</span>",
            unlocked() { return hasAchievement("ach", 15) },
            done() {return hasUpgrade('Money', 11)},
            tooltip() {return "Buy Bean Automation I.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#1BC42F",
                    "border-width": "3px"
                }
            }
        },
    },
    
    tabFormat: {
        "Achievements": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> achievements, or "+format(new Decimal(player.ach.achievements.length).div(19).mul(100))+"% of the total achievement count."}, //change division to current numer of achievements
                ],
                "blank",
                ["display-text",
                    function() {return "――――――――――――――――――――――――"},
                    {"color": "Gray", "font-size": "23px"}],
                    "blank",
                    "blank",
                    ["column", [ ["row", [ ["achievement", 1], ["achievement", 2], ["achievement", 3], ["achievement", 4], ["achievement", 5], ]]]],
                    ["column", [ ["row", [ ["achievement", 6], ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10], ]]]],
                    ["column", [ ["row", [ ["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15], ]]]],
                    ["column", [ ["row", [ ["achievement", 16], ["achievement", 17], ["achievement", 18], ["achievement", 19], ["achievement", 20], ]]]],
                    "blank",
            ],
        },
    },
})