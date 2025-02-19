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
    tooltip() {return format(player.ach.achievements.length,0)+" Fulfilments gained."},
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
			name: "[1]<br><span style='color:#ffffff'>Genesis</span>",
            done() {return hasUpgrade("Shards", 11)},
            //done() {return player.points.gte('1')},
            tooltip() {return "Begin.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>There is a long journey ahead."},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                    "width": "135px",
                    "height": "100px",
                }
            }
        },
        21:{
			name: "[2]<br><span style='color:#ffffff'>The First of Countless</span>",
            done() {return hasUpgrade("Shards", 21)},
            tooltip() {return "Buy your first upgrade.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        31:{
			name: "[3]<br><span style='color:#ffffff'>Shards I</span>",
            done() {return hasUpgrade("Shards", 24)},
            tooltip() {return "Buy the first row of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        32:{
			name: "[4]<br><span style='color:#ffffff'>Shards II</span>",
            done() {return hasUpgrade("Shards", 34)},
            tooltip() {return "Buy the second row of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        33:{
			name: "[5]<br><span style='color:#ffffff'>Shards III</span>",
            done() {return hasUpgrade("Shards", 44)},
            tooltip() {return "Buy the third row of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        34:{
			name: "[6]<br><span style='color:#ffffff'>Shards IV</span>",
            done() {return hasUpgrade("Shards", 54)},
            tooltip() {return "Buy the fourth row of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        35:{
			name: "[7]<br><span style='color:#ffffff'>Shards V</span>",
            done() {return hasUpgrade("Shards", 64)},
            tooltip() {return "Buy the fifth row of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
        41:{
			name: "[8]<br><span style='color:#fcf4e1'>Rebuilding</span>",
            done() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "Start rebuilding the Core.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#fcf4e1",
                    "border-width": "3px",
                    "width": "115px",
                    "height": "100px",
                }
            }
        },
        51:{
			name: "[9]<br><span style='color:#ffffff'>Shards VI</span>",
            done() {return hasUpgrade("Shards", 65)},
            tooltip() {return "Buy the fifth column of Shard upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px",
                }
            }
        },
    },
    
    tabFormat: {
        "Tree of Recollection": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> Fulfilments, or "+format(new Decimal(player.ach.achievements.length).div(19).mul(100))+"% of the total Fulfilment count."}, //change division to current numer of achievements
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