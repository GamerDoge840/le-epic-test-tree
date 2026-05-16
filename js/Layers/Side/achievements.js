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
    tooltip() {return format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+" Achievements Completed"},
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
			name: "[1]<br><span style='color:#bebe8e'>The Beginning</span>",
            done() {return hasUpgrade("e", 11)},
            //done() {return player.points.gte('1')},
            tooltip() {return "Start generation of Energy.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#bebe8e",
                    "border-width": "3px"
                }
            }
        },
        2:{
			name: "[2]<br><span style='color:#bebe8e'>Energy, I</span>",
            done() {return hasUpgrade("e", 14)},
            tooltip() {return "Buy the first row of Energy upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#bebe8e",
                    "border-width": "3px"
                }
            }
        },
        3:{
			name: "[3]<br><span style='color:#bebe8e'>Energy, II</span>",
            done() {return hasUpgrade("e", 24)},
            tooltip() {return "Buy the second row of Energy upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#bebe8e",
                    "border-width": "3px"
                }
            }
        },
        4:{
			name: "[4]<br><span style='color:#bebe8e'>Energy, III</span>",
            done() {return hasUpgrade("e", 34)},
            tooltip() {return "Buy the third row of Energy upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#bebe8e",
                    "border-width": "3px"
                }
            }
        },
        5:{
			name: "[5]<br><span style='color:#FFFFBD'>First Reset</span>",
            done() {return player.c.points.gte('1')},
            tooltip() {return "Do your first Charge reset.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#FFFFBD",
                    "border-width": "3px"
                }
            }
        },
        6:{
			name: "[6]<br><span style='color:#FFFFBD'>Charge, I</span>",
            done() {return hasUpgrade("c", 14)},
            tooltip() {return "Buy the first row of Charge upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#FFFFBD",
                    "border-width": "3px"
                }
            }
        },
        7:{
			name: "[7]<br><span style='color:#FFFFBD'>Charge, II</span>",
            done() {return hasUpgrade("c", 24)},
            unlocked() { return hasAchievement("ach", 6) },
            tooltip() {return "Buy the second row of Charge upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#FFFFBD",
                    "border-width": "3px"
                }
            }
        },
        8:{
			name: "[8]<br><span style='color:#FFFFBD'>Charge, III</span>",
            done() {return hasUpgrade("c", 34)},
            unlocked() { return hasAchievement("ach", 6) },
            tooltip() {return "Buy the third row of Charge upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#FFFFBD",
                    "border-width": "3px"
                }
            }
        },
        9:{
			name: "[9]<br><span style='color:#FFFFBD'>Charge, IV</span>",
            done() {return hasUpgrade("c", 44)},
            unlocked() { return hasAchievement("ach", 6) },
            tooltip() {return "Buy the fourth row of Charge upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#FFFFBD",
                    "border-width": "3px"
                }
            }
        },
        10:{
			name: "[10]<br><span style='color:#bebe8e'>Energy, IV</span>",
            done() {return hasUpgrade("e", 54)},
            tooltip() {return "Buy the fifth row of Energy upgrades.<br>――――――――――――<br> <span style='font-size:11px'>"},
            style() {
                return {
                    "border-color": "#bebe8e",
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
                    ["column", [ ["row", [ ["achievement", 1], ["achievement", 2], ["achievement", 3], ["achievement", 4], ["achievement", 5], ["achievement", 6], ]]]],
                    ["column", [ ["row", [ ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10], ["achievement", 11], ["achievement", 12], ]]]],
                    "blank",
            ],
        },
    },
})