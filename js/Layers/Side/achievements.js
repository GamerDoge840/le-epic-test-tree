addLayer("ach", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    nodeStyle() {
        return {
            'border': '2px solid #FFFFFF',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    color: "#e7ef43",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {return format(player.ach.achievements.length,0)+" Achievements"},
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
			name: "[1]<br><span style='color:#ffffff'>The Beginning</span>",
            done() {return hasUpgrade("PointLayer", 11)},
            tooltip() {return "Start generating points.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>There is a long, long journey ahead. Are you really up for the task?"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
        12:{
			name: "[2]<br><span style='color:#ffffff'>Points I</span>",
            done() {return hasUpgrade("PointLayer", 14)},
            tooltip() {return "Buy the first row of Point upgrades.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
        13:{
			name: "[3]<br><span style='color:#ffffff'>Points II</span>",
            done() {return hasUpgrade("PointLayer", 24)},
            tooltip() {return "Buy the second row of Point upgrades.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
        14:{
			name: "[4]<br><span style='color:#ffffff'>Points III</span>",
            done() {return hasUpgrade("PointLayer", 34)},
            tooltip() {return "Buy the third row of Point upgrades.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
        15:{
			name: "[5]<br><span style='color:#ffffff'>Points IV</span>",
            done() {return hasUpgrade("PointLayer", 44)},
            tooltip() {return "Buy the fourth row of Point upgrades.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
        16:{
			name: "[6]<br><span style='color:#31aeb0'>The First of Many</span>",
            done() {return player.Prestige.total.gte('1')},
            tooltip() {return "Perform your first Prestige.<br>――――――――――――<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px",
                    "width": "100px",
                    "height": "100px",
                }
            }
        },
    },
    
    tabFormat: {
        "Achievement Hall": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> Achievements, or "+format(new Decimal(player.ach.achievements.length).div(19).mul(100))+"% of the total Achievement count."}, //change division to current numer of achievements
                ],
                ["display-text",
                    function() {return "----====Prologue====----"},
                    {"color": "Gray", "font-size": "27px"}],
                    "blank",
                    "blank",
                    ["achievements", [1]],
                    "blank",
                    ["achievements", [2]],
                    "blank",
                    ["achievements", [3]],
                    "blank",
                    ["achievements", [4]],
                    "blank",
                    ["achievements", [5]],
            ],
        },
    },
})