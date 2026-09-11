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
            'border': '3px solid #E1C16E',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    color: "gold",
    requires: new Decimal("10"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {return +format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+" Achievements Completed"},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    achievements: {
		1:{
			name: "[1]<br><span style='color:#ffffff'>The Bee-ginning</span>",
            done() {return player.p.points.gte('1')},
            tooltip() {return "Start gathering White Pollen.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>You have no bees but that won't stop you from gathering pollen yourself."},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        2:{
			name: "[2]<br><span style='color:#ffffff'>White Pollen, 1</span>",
            done() {return player.p.points.gte('3')},
            tooltip() {return "Get 3 White Pollen.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        3:{
			name: "[3]<br><span style='color:#ffffff'>White Pollen, 2</span>",
            done() {return player.p.points.gte('7')},
            tooltip() {return "Get 7 White Pollen.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
         4:{
			name: "[4]<br><span style='color:#ffffff'>Honey, 1</span>",
            done() {return player.h.Honey.gte('1')},
            tooltip() {return "Do your first Honey reset.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        5:{
			name: "[5]<br><span style='color:#ffffff'>Honey, 2</span>",
            done() {return getBuyableAmount("h", 1).gte(8)},
            tooltip() {return "Buy 8 Gathering Boosters.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        6:{
			name: "[6]<br><span style='color:#ffffff'>White Pollen, 3</span>",
            done() {return player.p.points.gte('14')},
            tooltip() {return "Get 14 White Pollen.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        7:{
			name: "[7]<br><span style='color:#ffffff'>Honey, 3</span>",
            done() {return getBuyableAmount("h", 2).gte(12)},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Buy 12 White Pollinators and unlock your first automation.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        8:{
			name: "[8]<br><span style='color:#ffffff'>White Pollen, 4</span>",
            done() {return player.p.points.gte('25')},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Get 25 White Pollen.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        9:{
			name: "[9]<br><span style='color:#ffffff'>White Pollen, 5</span>",
            done() {return getBuyableAmount("p", 4).gte(1)},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Buy a Camellia.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        10:{
			name: "[10]<br><span style='color:#ffffff'>Honey, 4</span>",
            done() {return getBuyableAmount("h", 2).gte(15)},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Buy 15 White Pollinators and unlock your second automation.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        11:{
			name: "[11]<br><span style='color:#ffffff'>White Pollen, 6</span>",
            done() {return getBuyableAmount("h", 3).gte(1)},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Buy a White Enhancer and unlock White Pollen's boost to GP.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        12:{
			name: "[12]<br><span style='color:#ffffff'>Honey, 5</span>",
            done() {return getBuyableAmount("h", 4).gte(1)},
            unlocked() {return (hasAchievement('ach', 6))},
            tooltip() {return "Buy some Honeyed Honey.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        13:{
			name: "[13]<br><span style='color:#ffffff'>Honey, 6</span>",
            done() {return getBuyableAmount("h", 1).gte(24)},
            unlocked() {return (hasAchievement('ach', 12))},
            tooltip() {return "Buy 24 Gathering Boosters.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#C2B261",
                    "border-width": "3px"
                }
            }
        },
        14:{
			name: "[14]<br><span style='color:#ffffff'>White Pollen, 7</span>",
            done() {return getBuyableAmount("p", 5).gte(1)},
            unlocked() {return (hasAchievement('ach', 12))},
            tooltip() {return "Buy an Angel's Trumpet.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
    },
    
    tabFormat: {
        "Main": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> achievements, or "+format(new Decimal(player.ach.achievements.length).div(19).mul(100))+"% of the total achievement count."}, //change division to current numer of achievements
                ],
                "blank",
                ["display-text",
                    function() {return "――――――――――――――――――――――――"},
                    {"color": "Gray", "font-size": "23px"}],
                    "blank",
                    ["column", [ ["row", [ ["achievement", 1], ["achievement", 2], ["achievement", 3], ["achievement", 4], ["achievement", 5], ["achievement", 6], ]]]],
                    ["column", [ ["row", [ ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10], ["achievement", 11], ["achievement", 12], ]]]],
                    ["column", [ ["row", [ ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18], ]]]],
                    "blank",
            ],
        },
    },
})