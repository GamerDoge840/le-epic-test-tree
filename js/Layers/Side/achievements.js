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
			name: "[1]<br><span style='color:#ffffff'>The Beginning</span>",
            done() {return (hasUpgrade("p", 0))},
            tooltip() {return "Start generating Points.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        2:{
			name: "[2]<br><span style='color:#ffffff'>Tenth of a Point</span>",
            done() {return player.points.gte('0.1')},
            tooltip() {return "Get 0.1 points.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        3:{       
			name: "[3]<br><span style='color:#ffffff'>Buy it more than twice</span>",
            done() {return getBuyableAmount("p", 1).gte(3)},
            tooltip() {return "Buy P01-B thrice.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        4:{
			name: "[4]<br><span style='color:#ffffff'>One Whole Point</span>",
            done() {return player.points.gte('1')},
            tooltip() {return "Get 1 point.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
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
                    //["column", [ ["row", [ ["achievement", 7], ["achievement", 8], ["achievement", 9], ["achievement", 10], ["achievement", 11], ["achievement", 12], ]]]],
                    //["column", [ ["row", [ ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16], ["achievement", 17], ["achievement", 18], ]]]],
                    "blank",
            ],
        },
    },
})