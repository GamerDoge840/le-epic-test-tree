addLayer("Shards", {
    name: "Shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⠀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '1px solid white',
            'background-image': 'radial-gradient(circle at center, #fcf4e1,rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Form Essence into Prestige.<br>----------<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>The Core<br>――――――――――――<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Shards</span>"
        if(player.Fragments.total.gte(1)) tooltip = tooltip + "<br><span style='color:#fcf4e1'>"+formatWhole(player.Fragments.points)+" Fragments</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
    },
    automate() {
        if(hasUpgrade('Fragments', 61)) buyMaxBuyable('Shards', 11)
        if(hasUpgrade('Fragments', 62)) buyMaxBuyable('Shards', 12)
    },
    //bars: {
        //stonebar: {
            //direction: RIGHT,
            //width: 600,
            //height: 50,
            //instant: true,
            //progress() {return new Decimal(tmp.StoneBlocks.baseAmount).dividedBy(getNextAt(this.layer, true))},
           // baseStyle: { 'background-color': 'black' },
            //fillStyle: { 'background-color': '#a4deff' },
       // },
//},
doReset(resettingLayer) {
    if (layers[resettingLayer].row <= this.row) return;
    let keptUpgrades = []
    let keptMilestones = []
    if (hasUpgrade('Fragments', 51) && hasUpgrade('Shards', 71) ) keptUpgrades.push(71)
    if (hasUpgrade('Fragments', 51) && hasUpgrade('Shards', 72) ) keptUpgrades.push(72)
    if (hasUpgrade('Fragments', 51) && hasUpgrade('Shards', 73) ) keptUpgrades.push(73)
    if (hasUpgrade('Fragments', 51) && hasUpgrade('Shards', 74) ) keptUpgrades.push(74)
    if (hasUpgrade('Fragments', 51) && hasUpgrade('Shards', 75) ) keptUpgrades.push(75)
    layerDataReset(this.layer);
    player[this.layer].upgrades.push(...keptUpgrades)
    player[this.layer].milestones.push(...keptMilestones)
},
    upgrades: {
        rows: 9,
        cols: 9,
        11: {    
            title: "Born Anew",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S01] Born Anew</span></b><font size="2"><br>Start gathering Shards.<br>――――――――――――――――――<br>Currently: `+format(getPointGen()) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shard`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Born Anew</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Birth of recreation."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#B9B9AF' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'color': 'white'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
        12: {    
            title: "Shard Formation",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S02] Shard Formation</span></b><font size="2"><br>Unlock the first reset layer.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(1000),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 64)},
            tooltip() {return "<span style='color:#ffffff'>Shard Formation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Continuation of recreation."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
        21: {    
            title: "Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S11] Double</span></b><font size="2"><br>Double Shards gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0100),
            //branches: [11],
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 11)},
            tooltip() {return "<span style='color:#ffffff'>Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        22: {    
            title: "Half-Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S12] Half-Double</span></b><font size="2"><br>Increase Shards gain by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0250),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 21)},
            tooltip() {return "<span style='color:#ffffff'>Half-Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        23: {    
            title: "Quarter-Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S13] Quarter-Double</span></b><font size="2"><br>Increase Shards gain by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0400),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 22)},
            tooltip() {return "<span style='color:#ffffff'>Quarter-Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        24: {    
            title: "Tenth of Two",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S14] Tenth of Two</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0600),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 23)},
            tooltip() {return "<span style='color:#ffffff'>Tenth of Two</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        31: {    
            title: "Third of Two",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S21] Third of Two</span></b><font size="2"><br>Increase Shards gain by 1.30x and unlocks a Shard buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0700),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 24)},
            tooltip() {return "<span style='color:#ffffff'>Third of Two</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        32: {    
            title: "Half-Double, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S22] Half-Double, Again</span></b><font size="2"><br>Increase Shards gain by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.12),
            currencyInternalName: "points",
            unlocked() { return getBuyableAmount("Shards", 11).gte(5)},            
            tooltip() {return "<span style='color:#ffffff'>Half-Double, Again</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        33: {    
            title: "Third of Two, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S23] Third of Two, Again</span></b><font size="2"><br>Increase Shards gain by 1.30x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.30),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 32)},
            tooltip() {return "<span style='color:#ffffff'>Third of Two, Again</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        34: {    
            title: "Quarter-Double, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S24] Quarter-Double, Again</span></b><font size="2"><br>Increase Shards gain by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.40),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 33)},
            tooltip() {return "<span style='color:#ffffff'>Quarter-Double, Again</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        41: {    
            title: "More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S31] More Repeatable</span></b><font size="2"><br>S11-B can be purchased three more times.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 34)},
            tooltip() {return "<span style='color:#ffffff'>More Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        42: {    
            title: "Almost Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S32] Almost Double</span></b><font size="2"><br>Increase Shards gain by 1.99x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.75),
            currencyInternalName: "points",
            unlocked() { return getBuyableAmount("Shards", 11).gte(8)}, 
            tooltip() {return "<span style='color:#ffffff'>Almost Double</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        43: {    
            title: "Faster Gathering",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S33] Faster Gathering</span></b><font size="2"><br>Shards boost their own gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(1.75),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log10().pow(0.9).plus(1);
                if (hasUpgrade('Shards', 74)) eff = eff.times(upgradeEffect('Shards', 74))
                if (hasUpgrade('Shards', 84)) eff = eff.times(upgradeEffect('Shards', 84))
                return eff;
            },
            unlocked() {return hasUpgrade("Shards", 42)},
            tooltip() {return "<span style='color:#ffffff'>Faster Gathering</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        44: {    
            title: "Even More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S34] Even More Repeatable</span></b><font size="2"><br>S11-B can be purchased two more times.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(2.50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 43)},
            tooltip() {return "<span style='color:#ffffff'>Even More Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        51: {    
            title: "Upgrade-Powered Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S41] Upgrade-Powered Upgrade</span></b><font size="2"><br>Boost Shard gain based on Shard upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(2.25),
            currencyInternalName: "points",
            effect() {
                let eff = Decimal.pow(1.03, player.Shards.upgrades.length);
                if (hasUpgrade('Shards', 61)) eff = eff.times(upgradeEffect('Shards', 61))
                if (hasUpgrade('Shards', 72)) eff = eff.times(upgradeEffect('Fragments', 33))
                return eff;
            },
            unlocked() { return getBuyableAmount("Shards", 11).gte(10)}, 
            tooltip() {return "<span style='color:#ffffff'>Upgrade-Powered Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        52: {    
            title: "Upgraded Buyable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S42] Upgraded Buyable</span></b><font size="2"><br>Repeatable Tenth's effect is twice as strong.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(3.50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 51)},
            tooltip() {return "<span style='color:#ffffff'>Upgraded Buyable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        53: {    
            title: "Two and a Half",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S43] Two and a Half</span></b><font size="2"><br>Increase Shards gain by 2.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(8),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 52)},
            tooltip() {return "<span style='color:#ffffff'>Two and a Half</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        54: {    
            title: "Yet Even More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S44] Even More Repeatable</span></b><font size="2"><br>S11-B can be purchased five more times.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(25),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 53)},
            tooltip() {return "<span style='color:#ffffff'>Even More Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        61: {    
            title: "Shard-Powered Upgrade-Powered Upgrade",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S51] Shard-Powered Upgrade-Powered Upgrade</span></b><font size="2"><br>S41 is stronger based on Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(45),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log(10000).pow(0.99).plus(1);
                return eff;
            },
            unlocked() { return getBuyableAmount("Shards", 11).gte(15)}, 
            tooltip() {return "<span style='color:#ffffff'>Shard-Powered Upgrade-Powered Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        62: {    
            title: "A Tenth",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S52] A Tenth</span></b><font size="2"><br>Increases Shards gain by 1.10x.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(30),
            currencyInternalName: "points",
            effect() {
                effect = new Decimal(1.10)
                if (hasUpgrade('Shards', 63)) effect = effect.times(2)
                if (hasUpgrade('Fragments', 32)) effect = effect.times(2)
                return effect
              },   
            unlocked() {return hasUpgrade("Shards", 61)},
            tooltip() {return "<span style='color:#ffffff'>A Tenth</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        63: {    
            title: "Upgrade Upgrader",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S53] Upgrade Upgrader</span></b><font size="2"><br>The previous upgrade is twice as strong.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(60),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 62)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Upgrader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        64: {    
            title: "Triple",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S54] Triple</span></b><font size="2"><br>Increase Shards gain by 3.00x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(175),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 63)},
            tooltip() {return "<span style='color:#ffffff'>Triple</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        25: {    
            title: "Shards Bonus I",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S15] Shard Bonus I</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.145),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 24) && hasUpgrade("Fragments", 22) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        35: {    
            title: "Shards Bonus II",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S25] Shard Bonus II</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.600),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 25) && hasUpgrade("Shards", 34) && hasUpgrade("Fragments", 22) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        45: {    
            title: "Shards Bonus III",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S35] Shard Bonus III</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(3.200),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 35) && hasUpgrade("Shards", 44) && hasUpgrade("Fragments", 22) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        55: {    
            title: "Shards Bonus IV",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S45] Shard Bonus IV</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 45) && hasUpgrade("Shards", 54) && hasUpgrade("Fragments", 22) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus IV</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        65: {    
            title: "Shards Bonus V",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S55] Shard Bonus V</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(300),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Shards", 55) && hasUpgrade("Shards", 64) && hasUpgrade("Fragments", 22) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus V</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        71: {    
            title: "Two-in-One Bonus",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S61] Two-in-One Bonus</span></b><font size="2"><br>Increases both Shards and Fragments gain by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Shards)+` Shards and `+format(tmp[this.layer].upgrades[this.id].costs.Fragments)+` Fragments`},        
            costs: {
                Shards: 225000,
                Fragments: 6,
              },
              canAfford() {
                return player.points.gte(this.costs.Shards)
                    && player.Fragments.points.gte(this.costs.Fragments)
              },
              pay() {
                player.points = player.points.minus(this.costs.Shards);
                player.Fragments.points = player.Fragments.points.minus(this.costs.Fragments);
              },
            unlocked() {return hasUpgrade("Shards", 65) && hasUpgrade("Fragments", 51) || hasUpgrade("Shards", 71) },
            tooltip() {return "<span style='color:#ffffff'>Two-in-One Bonus</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        72: {    
            title: "Upgraded Upgrade Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S62] Upgraded Upgrade Recursion</span></b><font size="2"><br>S41 is boosted by F23.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Shards)+` Shards and `+format(tmp[this.layer].upgrades[this.id].costs.Fragments)+` Fragments`},        
            costs: {
                Shards: 400000,
                Fragments: 11,
              },
              canAfford() {
                return player.points.gte(this.costs.Shards)
                    && player.Fragments.points.gte(this.costs.Fragments)
              },
              pay() {
                player.points = player.points.minus(this.costs.Shards);
                player.Fragments.points = player.Fragments.points.minus(this.costs.Fragments);
              },
            unlocked() {return hasUpgrade("Shards", 71) || hasUpgrade("Fragments", 72) },
            tooltip() {return "<span style='color:#ffffff'>Upgraded Upgrade Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        73: {    
            title: "Somehow Even More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S63] Somehow Even More Repeatable</span></b><font size="2"><br>S11-B's cap is multiplied by 1.60x as long as you have S44.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Shards)+` Shards and `+format(tmp[this.layer].upgrades[this.id].costs.Fragments)+` Fragments`},        
            costs: {
                Shards: 600000,
                Fragments: 18,
              },
              canAfford() {
                return player.points.gte(this.costs.Shards)
                    && player.Fragments.points.gte(this.costs.Fragments)
              },
              pay() {
                player.points = player.points.minus(this.costs.Shards);
                player.Fragments.points = player.Fragments.points.minus(this.costs.Fragments);
              },
            unlocked() {return hasUpgrade("Shards", 65) && hasUpgrade("Shards", 72) || hasUpgrade("Shards", 73) },
            tooltip() {return "<span style='color:#ffffff'>Somehow Even More Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        74: {    
            title: "Recursive Recursion",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S64] Recursive Recursion</span></b><font size="2"><br>S33 is boosted based on it's own effect.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Shards)+` Shards and `+format(tmp[this.layer].upgrades[this.id].costs.Fragments)+` Fragments`},        
            costs: {
                Shards: 1e6,
                Fragments: 25,
              },
              canAfford() {
                return player.points.gte(this.costs.Shards)
                    && player.Fragments.points.gte(this.costs.Fragments)
              },
              pay() {
                player.points = player.points.minus(this.costs.Shards);
                player.Fragments.points = player.Fragments.points.minus(this.costs.Fragments);
              },
            unlocked() {return hasUpgrade("Shards", 65) && hasUpgrade("Shards", 73) || hasUpgrade("Shards", 74) },
            effect() {
                let eff = upgradeEffect("Shards", 43).plus(1).pow(0.13);
                return eff;
            },  
            tooltip() {return "<span style='color:#ffffff'>Recursive Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        75: {    
            title: "Shard Bonus VI",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S65] Shard Bonus VI</span></b><font size="2"><br>Increase Shards gain by 1.30x and unlock new Fragment upgrades.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Shards)+` Shards and `+format(tmp[this.layer].upgrades[this.id].costs.Fragments)+` Fragments`},        
            costs: {
                Shards: 2.5e6,
                Fragments: 50,
              },
              canAfford() {
                return player.points.gte(this.costs.Shards)
                    && player.Fragments.points.gte(this.costs.Fragments)
              },
              pay() {
                player.points = player.points.minus(this.costs.Shards);
                player.Fragments.points = player.Fragments.points.minus(this.costs.Fragments);
              },
            unlocked() {return hasUpgrade("Shards", 65) && hasUpgrade("Shards", 74) || hasUpgrade("Shards", 75) },
            tooltip() {return "<span style='color:#ffffff'>Shard Bonus VI</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b><b><span style='color:#9d9d9d'>[S11-B] Repeatable Tenth</span></b></b><font size="2"><br>Increases Shards gain by 1.10x with every purchase.<br>――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Shards</b> <br>――――――――――――――――――<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.750);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Shards', 11).mul(0.10).plus(1)
                if (hasUpgrade('Shards', 52)) eff = eff.times(2)
                if (hasUpgrade('Fragments', 41)) eff = eff.times(1.50)
                if (hasUpgrade('Fragments', 63)) eff = eff.times(1.15)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(5)
                if (hasUpgrade('Shards', 41)) cap = cap.times(1.60)
                if (hasUpgrade('Shards', 44)) cap = cap.times(1.25)
                if (hasUpgrade('Shards', 54)) cap = cap.times(1.50)
                if (hasUpgrade('Shards', 54) && hasUpgrade('Shards', 73)) cap = cap.times(1.60)
                if (hasUpgrade('Fragments', 64)) cap = cap.times(upgradeEffect('Fragments', 64))
                return cap
            },
            tooltip() {return "Repeatable Tenth<br>――――――――――――<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.750) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Shards', 11))) setBuyableAmount('Shards', 11, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#757573',
                    "width": "325px",
            "height": "175px",
            //"background-image": 'url("resources/glorygradient.png")',        
                    //'background-position': 'center center',
                     //'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Shards", 31) },
    
        },
        12: {
            display() {return `<font size="3"><b><b><span style='color:#9d9d9d'>[S12-B] Shard Booster</span></b></b><font size="2"><br>Increases Shards gain by 1.015x compounding with every purchase.<br>――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Shards</b> <br>――――――――――――――――――<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(2.250);
                let cost = base.pow(x).times(0.1);
                return cost;
              },
              effect() { 
                    let extra = new Decimal(0)
                    return getBuyableAmount('Shards', 12).add(extra).pow_base(1.015) },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "Shard Booster<br>――――――――――――<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.1).log(2.250) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Shards', 12))) setBuyableAmount('Shards', 12, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#757573',
                    "width": "325px",
            "height": "175px",
            //"background-image": 'url("resources/glorygradient.png")',        
                    //'background-position': 'center center',
                     //'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Fragments", 42) && hasUpgrade("Shards", 11) },
    
        },
    },
     tabFormat: {
        "Shards": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["raw-html", function() {if (player.Fragments.total.gte(1)) return "(<span style='color:#fcf4e1'>"+format(player.Fragments.points)+" Fragments</span>)"}, {"font-size": "18px"}],
                ["raw-html", function() {if (player.Fragments.total.gte(1)) return "<span style='color:#fcf4e1'>―――――――――――――――――――――――――――――――――――</span>"}, {"font-size": "15px"}],
                ["display-text",
                    function() {return ''+format(player.points)+' Shards'},
                    {"font-size": "30px"}],
                    ["raw-html", function() {if (hasUpgrade("Shards", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Shards/s)"}],            
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                            ["upgrades", [1, 2, 3, 4, 5, 6, 7]],
                            "blank",
                            
                            ["raw-html", function() {if (hasUpgrade("Fragments", 51)) return ""+format(player.points)+" Shards</span>"}],
                            ["raw-html", function() {if (hasUpgrade("Fragments", 51)) return "<span style='color:#fcf4e1'>"+format(player.Fragments.points)+" Fragments</span>"}],

                            "blank",                            ["display-text",
                                function() {return "――――――――――――――――――――――――――――――――――――――――――――――――――――――――"},
                                {"color": "#9d9d9d", "font-size": "32px"}],
                            "buyables",
                    
            ]
            
        },
        "Fragments": {
            style() {return  {'background': '#292929'}},
            //style() {
                //return {
                    //"background-image": "linear-gradient(to top,rgb(33, 33, 36),rgb(63, 59, 73))",
                    //"background-size": "cover"
                //};
           // },
            unlocked() {return hasUpgrade('Shards', 12) || player.Fragments.total.gte(1)},
            buttonStyle: {"border-color": "#fcf4e1"},
            embedLayer: 'Fragments',
        },
    },
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})