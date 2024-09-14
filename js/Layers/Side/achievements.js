addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "📊", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    nodeStyle() {
        return {
            'border': '3px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    color: "#b9b7b3",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {return format(player.ach.achievements.length,0)+" Achievements completed."},
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
		11:{
			name: "[1]<br><span style='color:#ffffff'>Operation Begin</span>",
            done() {return hasUpgrade("Level", 11)},
            tooltip() {return "Begin incrementing the Number.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>This should be simple enough, I hope."},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        12:{
			name: "[2]<br><span style='color:#ffffff'>Must Go Up</span>",
            done() {return hasUpgrade("Level", 21)},
            tooltip() {return "Buy Multiplier 1.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        13:{
			name: "[3]<br><span style='color:#ffffff'>First Upgrade Row</span>",
            done() {return hasUpgrade("Level", 24)},
            tooltip() {return "Buy Multiplier 4.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        14:{
			name: "[4]<br><span style='color:#ffffff'>Second Upgrade Row</span>",
            done() {return hasUpgrade("Level", 34)},
            tooltip() {return "Buy Multiplier 8.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        15:{
			name: "[5]<br><span style='color:#ffffff'>Third Upgrade Row</span>",
            done() {return hasUpgrade("Level", 44)},
            tooltip() {return "Buy Quintupler.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        
    },
    
    
    tabFormat: {
        "ACHIEVEMENTS": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> achievements, or "+format(new Decimal(player.ach.achievements.length).div(11).mul(100))+"% of the total achievement count."}, //change division to current numer of achievements
                ],
                ["display-text",
                    function() {return "----====Achievements====----"},
                    {"color": "Gray", "font-size": "27px"}],
                    "blank",
                    "blank",
                    ["achievements", [1, 2, 3, 4, 5, 10]],
                    "blank",
            ],
        },
    },
})