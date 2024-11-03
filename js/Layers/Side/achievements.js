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
			name: "[1]<br><span style='color:#ffffff'>The Beginning</span>",
            done() {return hasUpgrade("Prestige", 11)},
            //done() {return player.points.gte('1')},
            tooltip() {return "Start generation of Essence.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>This should be simple enough, I hope."},
            style() {
                return {
                    "border-color": "#ffffff",
                    "border-width": "3px"
                }
            }
        },
        12:{
			name: "[2]<br><span style='color:#31aeb0'>Prestige I</span>",
            done() {return hasUpgrade("Prestige", 23)},
            tooltip() {return "Buy the first row of Prestige upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        13:{
			name: "[3]<br><span style='color:#31aeb0'>Prestige II</span>",
            done() {return hasUpgrade("Prestige", 33)},
            tooltip() {return "Buy the second row of Prestige upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        14:{
			name: "[4]<br><span style='color:#31aeb0'>Prestige III</span>",
            done() {return hasUpgrade("Prestige", 43)},
            tooltip() {return "Buy the third row of Prestige upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        15:{
			name: "[5]<br><span style='color:#69c0f6'>Levels I</span>",
            done() {return hasUpgrade("Level", 13)},
            tooltip() {return "Buy the first row of Level upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#69c0f6",
                    "border-width": "3px"
                }
            }
        },
        16:{
			name: "[6]<br><span style='color:#69c0f6'>Levels II</span>",
            done() {return hasUpgrade("Level", 23)},
            tooltip() {return "Buy the second row of Level upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#69c0f6",
                    "border-width": "3px"
                }
            }
        },
        21:{
			name: "[7]<br><span style='color:#31aeb0'>Prestige IV</span>",
            done() {return hasUpgrade("Prestige", 44)},
            tooltip() {return "Buy the fourth column of Prestige upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        22:{
			name: "[8]<br><span style='color:#faff92'>Honored Be Thy Name</span>",
            done() {return player.Honor.total.gte(1)},
            tooltip() {return "Perform your first Tier 1 reset.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>From Prestige comes Honor."},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
        23:{
			name: "[9]<br><span style='color:#faff92'>Honor I</span>",
            done() {return hasUpgrade("Honor", 13)},
            tooltip() {return "Buy the first row of Honor upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
        24:{
			name: "[10]<br><span style='color:#faff92'>Honor II</span>",
            done() {return hasUpgrade("Honor", 23)},
            tooltip() {return "Buy the second row of Honor upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
        25:{
			name: "[11]<br><span style='color:#faff92'>Honor III</span>",
            done() {return hasUpgrade("Honor", 33)},
            tooltip() {return "Buy the third row of Honor upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
        26:{
			name: "[12]<br><span style='color:#31aeb0'>Prestige V</span>",
            done() {return hasUpgrade("Prestige", 64)},
            tooltip() {return "Buy the fourth row of Prestige upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        31:{
			name: "[13]<br><span style='color:#31aeb0'>Get Softcapped, Bozo</span>",
            done() {return player.Prestige.points.gte(9.99e32)},
            tooltip() {return "Encounter your first astounding softcap (Which is, at first, more similar to a hardcap).<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        32:{
			name: "[14]<br><span style='color:#ffcd7a'>Ranks I</span>",
            done() {return player.Rank.points.gte(1)},
            tooltip() {return "Rank up.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffcd7a",
                    "border-width": "3px"
                }
            }
        },
        33:{
			name: "[15]<br><span style='color:#ffcd7a'>Ranks II</span>",
            done() {return player.Rank.points.gte(4)},
            tooltip() {return "Reach Rank 4.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffcd7a",
                    "border-width": "3px"
                }
            }
        },
        34:{
			name: "[16]<br><span style='color:#31aeb0'>Age of Softcaps</span>",
            done() {return player.Prestige.points.gte(1e40)},
            tooltip() {return "Encounter another incredible softcap.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        35:{
			name: "[17]<br><span style='color:#ffcd7a'>Ranks III</span>",
            done() {return player.Rank.points.gte(10)},
            tooltip() {return "Reach Rank 10.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffcd7a",
                    "border-width": "3px"
                }
            }
        },
        36:{
			name: "[18]<br><span style='color:#69c0f6'>Not even Levels are safe</span>",
            done() {return player.Level.points.gte(230)},
            tooltip() {return "Encounter a Level softcap.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#69c0f6",
                    "border-width": "3px"
                }
            }
        },
        41:{
			name: "[19]<br><span style='color:#31aeb0'>Master of Prestige</span>",
            done() {return player.Prestige.points.gte(10000) && !hasUpgrade("Prestige", 11)},
            tooltip() {return "Get 10,000 Prestige without Essence generation enabled.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#31aeb0",
                    "border-width": "3px"
                }
            }
        },
        42:{
			name: "[20]<br><span style='color:#c1ffee'>Energy I</span>",
            done() {return player.Energy.points.gte(1)},
            tooltip() {return "Start generating Energy.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#c1ffee",
                    "border-width": "3px"
                }
            }
        },
        43:{
			name: "[21]<br><span style='color:#c1ffee'>Energy II</span>",
            done() {return hasUpgrade("Energy", 23)},
            tooltip() {return "Buy the first row of Energy upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#c1ffee",
                    "border-width": "3px"
                }
            }
        },
        44:{
			name: "[22]<br><span style='color:#c1ffee'>Energy III</span>",
            done() {return hasUpgrade("Energy", 33)},
            tooltip() {return "Buy the second row of Energy upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#c1ffee",
                    "border-width": "3px"
                }
            }
        },
        45:{
			name: "[23]<br><span style='color:#c1ffee'>Energy IV</span>",
            done() {return hasUpgrade("Energy", 43)},
            tooltip() {return "Buy the third row of Energy upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#c1ffee",
                    "border-width": "3px"
                }
            }
        },
        46:{
			name: "[24]<br><span style='color:#faff92'>Honor IV</span>",
            done() {return hasUpgrade("Honor", 34)},
            tooltip() {return "Buy the fourth column of Honor upgrades.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
        51:{
			name: "[25]<br><span style='color:#ffcd7a'>Ranks IV</span>",
            done() {return player.Rank.points.gte(31)},
            tooltip() {return "Reach Rank 31.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#ffcd7a",
                    "border-width": "3px"
                }
            }
        },
        52:{
			name: "[26]<br><span style='color:#ffcd7a'>Glorious Age</span>",
            done() {return player.Glory.total.gte(1)},
            tooltip() {return "Revel in Glory for the first time.<br>----------------<br> <span style='font-size:11px'><span style='color:#E5E4E2'>"},
            style() {
                return {
                    "border-color": "#faff92",
                    "border-width": "3px"
                }
            }
        },
    },
    
    tabFormat: {
        "Achievement Hall": {
            content: ["blank",
                ["display-text",
                    function() {return "You have attained <h2 style='color:  gold; text-shadow: gold 0px 0px 10px;'> "+format(player.ach.achievements.length,0)+"/"+format(Object.keys(tmp.ach.achievements).length - 2,0)+"</h2> achievements, or "+format(new Decimal(player.ach.achievements.length).div(19).mul(100))+"% of the total achievement count."}, //change division to current numer of achievements
                ],
                ["display-text",
                    function() {return "----====Achievements====----"},
                    {"color": "Gray", "font-size": "27px"}],
                    "blank",
                    "blank",
                    ["achievements", [1, 2, 3, 4, 5, 6, 10]],
                    "blank",
            ],
        },
    },
})