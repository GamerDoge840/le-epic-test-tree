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
    layerShown(){return true},
    achievements: {
		1:{
			name: "[1]<br><span style='color:#ffffff'>Essence I</span>",
            done() {return hasUpgrade("Essence", 11)},
            //done() {return player.points.gte('1')},
            tooltip() {return "Start generation of Essence.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“Every number comes from somewhere.”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#FFFFFF",
                    "border-width": "3px"
                }
            }
        },
        2:{
			name: "[2]<br><span style='color:#D5E5F4'>Levels I</span>",
            done() {return player.Level.points.gte(1)},
            tooltip() {return "Level up for the first time.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#D5E5F4",
                    "border-width": "3px"
                }
            }
        },
        3:{
			name: "[3]<br><span style='color:#FFFFFF'>Essence II</span>",
            done() {return hasUpgrade("Essence", 22)},
            tooltip() {return "Buy the sixth Essence upgrade.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#FFFFFF",
                    "border-width": "3px"
                }
            }
        },
        4:{
			name: "[4]<br><span style='color:#D5E5F4'>Levels II</span>",
            done() {return player.Level.points.gte(10)},
            tooltip() {return "Reach Level 10.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#D5E5F4",
                    "border-width": "3px"
                }
            }
        },
        5:{
			name: "[5]<br><span style='color:#DA8F81'>Apples I</span>",
            done() {return hasUpgrade("Fruits", 11)},
            tooltip() {return "Unlock apples.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#DA8F81",
                    "border-width": "3px"
                }
            }
        },
        6:{
			name: "[6]<br><span style='color:#FFFFFF'>Essence III</span>",
            done() {return hasUpgrade("Essence", 24)},
            unlocked() {return hasAchievement("ach", 5)},
            tooltip() {return "Buy the eighth Essence upgrade.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>“”"},
            style() {
                return {
                    "width": "110px",
                    "height": "110px",
                    "border-color": "#FFFFFF",
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
                    ["column", [ ["row", [ ["achievement", 1], ["achievement", 2], ["achievement", 3], ["achievement", 4], ["achievement", 5],   ]]]],
                    ["column", [ ["row", [ ["achievement", 6], ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10],   ]]]],
                    "blank",
            ],
        },
    },
})