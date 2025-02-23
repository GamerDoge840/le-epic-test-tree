addLayer("Fragments", {
    name: "Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⠀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fcf4e1",
    requires: new Decimal("1000"), // Can be a function that takes requirement increases into account
    resource: "Fragments", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Combine Shards to create Fragments of something greater.<br>――――――――――――――――――――――<br>",
    baseResource: "Shards", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Shards', 71)) mult = mult.times(1.25)
        if (hasUpgrade('Fragments', 73)) mult = mult.times(upgradeEffect('Fragments', 73))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
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
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 9,
        cols: 9,
        11: {    
            title: "The Fractured Core",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F▢-1] The Fractured Core</span></b><font size="2"><br>Use Fragments to begin rebuilding the Core.<br>――――――――――――――――――<br>Core Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(3.00)
                if (hasUpgrade('Fragments', 21)) effect = effect.times(1.6667)
                if (hasUpgrade('Fragments', 24)) effect = effect.times(1.40)
                if (hasUpgrade('Fragments', 34)) effect = effect.times(1.4285)
                if (hasUpgrade('Fragments', 44)) effect = effect.times(1.30)
                if (hasUpgrade('Fragments', 71)) effect = effect.times(upgradeEffect('Fragments', 71))
                if (hasUpgrade('Fragments', 72)) effect = effect.times(upgradeEffect('Fragments', 72))
                if (hasUpgrade('Fragments', 74)) effect = effect.times(upgradeEffect('Fragments', 74))
                if (hasUpgrade('Fragments', 81)) effect = effect.times(1.15)
                if (hasUpgrade('Fragments', 82)) effect = effect.times(upgradeEffect('Fragments', 82))
                if (hasUpgrade('Fragments', 83)) effect = effect.times(upgradeEffect('Fragments', 83))
                return effect
              },  
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>The Fractured Core</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Effect boosts Shards gain."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#fcf4e1, #ffebb2)',
            

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ffcf5a' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'
                //'background': 'linear-gradient(#fcf4e1, #ffcd7a)',

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#ffcf5a' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#8eff00',
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Rebuilding I",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F11] Rebuilding I</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by exactly 1.6667x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "Bonus Column",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F12] Bonus Column</span></b><font size="2"><br>Unlocks a new column of uninteresting but helpful Shard upgrades.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Bonus Column</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Fragmented Shards",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F13] Fragmented Shards</span></b><font size="2"><br>Every total Fragment formed boosts Shards gain by 1.10x compounding, but only until 10 total Fragments.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            effect() {
                let eff = player.Fragments.total.pow_base(1.10);
                return eff.min(2.594);
            }, 
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Fragmented Shards</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            title: "Rebuilding II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F14] Rebuilding II</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by 1.40x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "Need for Speed",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F21] Need for Speed</span></b><font size="2"><br>Doubles Shards gain, but only when under a single Shard.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("Fragments", 21) && hasUpgrade("Fragments", 22) && hasUpgrade("Fragments", 23) && hasUpgrade("Fragments", 24)},
            tooltip() {return "<span style='color:#ffffff'>Need for Speed</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {    
            title: "Another Upgrade Upgrader",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F22] Another Upgrade Upgrader</span></b><font size="2"><br>S52's effect is doubled again.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("Fragments", 31)},
            tooltip() {return "<span style='color:#ffffff'>Another Upgrade Upgrader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {    
            title: "Upgrade-Powered Upgrade 2",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F23] Upgrade-Powered Upgrade 2</span></b><font size="2"><br>Boosts Shards gain based on Fragment upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(3),
            effect() {
                let eff = Decimal.pow(1.03, player.Fragments.upgrades.length);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 32)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade-Powered Upgrade 2</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        34: {    
            title: "Rebuilding III",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F24] Rebuilding III</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(4),
            unlocked() {return hasUpgrade("Fragments", 33)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by exactly 1.4285x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        41: {    
            title: "Upgraded Buyable 2",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F31] Upgraded Buyable 2</span></b><font size="2"><br>S11-B's effect is 1.50x stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(5),
            unlocked() {return hasUpgrade("Fragments", 34)},
            tooltip() {return "<span style='color:#ffffff'>Upgraded Buyable 2</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        42: {    
            title: "Another Buyable",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F32] Another Buyable</span></b><font size="2"><br>Unlocks another Shard buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(6),
            unlocked() {return hasUpgrade("Fragments", 41)},
            tooltip() {return "<span style='color:#ffffff'>Another Buyable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>This new buyable is also reset on forming Fragments."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        43: {    
            title: "We All Need Extra Speed",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F33] We All Need Extra Speed</span></b><font size="2"><br>F21's effect is active when above one Shard.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(6),
            unlocked() {return hasUpgrade("Fragments", 42)},
            tooltip() {return "<span style='color:#ffffff'>We All Need Extra Speed</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        44: {    
            title: "Rebuilding IV",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F34] Rebuilding IV</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(8),
            unlocked() {return hasUpgrade("Fragments", 43)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding IV</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by 1.30x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        51: {    
            title: "Shards Expansion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F▢-2] Shards Expansion</span></b><font size="2"><br>Unlocks a new row of Shard upgrades.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("Fragments", 44)},
            branches: [41, 42, 43, 44],
            tooltip() {return "<span style='color:#ffffff'>Shards Expansion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>These upgrades cost both Fragments and Shards at the same time and are not reset on Forming Fragments."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "500px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#fcf4e1, #ffebb2)',
            

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ffcf5a' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': 'yellow',
                'box-shadow':'0px 0px 15px #fffeb2'

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#ffcf5a' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#8eff00',
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        61: {    
            title: "Shard Buyable Automation I",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F41] Shard Buyable Automation I</span></b><font size="2"><br>Automatically buys S11-B without spending any Shards.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Shards", 75)},
            branches: [51],
            tooltip() {return "<span style='color:#ffffff'>Shard Buyable Automation I</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        62: {    
            title: "Shard Buyable Automation II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F42] Shard Buyable Automation II</span></b><font size="2"><br>Automatically buys S12-B without spending any Shards.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Shards", 75)},
            branches: [51],
            tooltip() {return "<span style='color:#ffffff'>Shard Buyable Automation II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        63: {    
            title: "Upgraded Buyable 3",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F43] Upgraded Buyable 3</span></b><font size="2"><br>S11-B's effect is 1.15x stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Shards", 75)},
            branches: [51],
            tooltip() {return "<span style='color:#ffffff'>Upgraded Buyable 3</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        64: {    
            title: "Something Something Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F44] Something Something Repeatable</span></b><font size="2"><br>Boosts S11-B's purchase cap based on total Fragments.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(30),
            effect() {
                let eff = player.Fragments.total.add(1).log10().pow(0.45);
                return eff.min(10);
            },
            unlocked() {return hasUpgrade("Shards", 75)},
            branches: [51],
            tooltip() {return "<span style='color:#ffffff'>Something Something Repeatable</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Effect capped at 10x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        71: {    
            title: "Shard Rebuilding",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F51] Shard Rebuilding</span></b><font size="2"><br>Boosts the Fractured Core based on Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(60),
            effect() {
                let eff = player.points.plus(8).log(8).pow(0.07);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 61) && hasUpgrade("Fragments", 62) && hasUpgrade("Fragments", 63) && hasUpgrade("Fragments", 64)},
            tooltip() {return "<span style='color:#ffffff'>Shard Rebuilding</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        72: {    
            title: "Fragment Rebuilding",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F52] Fragment Rebuilding</span></b><font size="2"><br>Boosts the Fractured Core based on total Fragments.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(70),
            effect() {
                let eff = player.Fragments.total.plus(12).log(8).pow(0.12);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 71)},
            tooltip() {return "<span style='color:#ffffff'>Shard Rebuilding</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        73: {    
            title: "Sharded Fragments",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F53] Sharded Fragments</span></b><font size="2"><br>Boosts Fragments based on Shards.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(70),
            effect() {
                let eff = player.points.plus(8).log(8).pow(0.13);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 72)},
            tooltip() {return "<span style='color:#ffffff'>Sharded Fragments</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        74: {    
            title: "Recursive Rebuilding",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F54] Recursive Rebuilding</span></b><font size="2"><br>Boost the Fractured Core based on S33's effect.<br>――――――――――――――――――<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(110),
            effect() {
                let eff = upgradeEffect("Shards", 43).plus(1).pow(0.04);
                return eff;
            },  
            unlocked() {return hasUpgrade("Fragments", 73)},
            tooltip() {return "<span style='color:#ffffff'>Recursive Rebuilding</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        81: {    
            title: "Rebuilding V",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F61] Rebuilding V</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(170),
            unlocked() {return hasUpgrade("Fragments", 74)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding V</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by 1.15x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        82: {    
            title: "Fragment Rebuilding II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F62] Fragment Rebuilding II</span></b><font size="2"><br>Boosts the Fractured Core based on current Fragments.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(200),
            effect() {
                let eff = player.Fragments.points.plus(8).log(8).pow(0.25);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 81)},
            tooltip() {return "<span style='color:#ffffff'>Fragment Rebuilding II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        83: {    
            title: "Self-Rebuilding",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F63] Self-Rebuilding</span></b><font size="2"><br>Boosts the Fractured Core based on it's own effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(225),
            effect() {
                let eff = upgradeEffect("Fragments", 11).plus(1).pow(0.07);
                return eff;
            },  
            unlocked() {return hasUpgrade("Fragments", 82)},
            tooltip() {return "<span style='color:#ffffff'>Self-Rebuilding</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        84: {    
            title: "Core-Powered Gathering",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F64] Core-Powered Gathering</span></b><font size="2"><br>The Fractured Core boosts S33's effect at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},       
            cost: new Decimal(250),
            effect() {
                let eff = upgradeEffect("Fragments", 11).plus(1).pow(0.06);
                return eff;
            },  
            unlocked() {return hasUpgrade("Fragments", 83)},
            tooltip() {return "<span style='color:#ffffff'>Core-Powered Gathering</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #fffeb2'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
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
    },
     tabFormat: [
        ["infobox", "FragmentLore"],
                ["display-text",
                    function() {return '<span style="color:#fcf4e1">'+format(player.Fragments.points)+' Fragments'},
                    {"font-size": "30px"}],
            ["display-text",
                function() {return "―――――――――――――――――――――――――――――"},
                {"color": "#fcf4e1", "font-size": "32px"}],
                function() {if (hasUpgrade("Shards", 12)) return "prestige-button"}, 
                ["raw-html", function() {if (!hasUpgrade("Shards", 12)) return 'To form fragments, you need Shard upgrade S02.'}],
                ["display-text",
                    function() {return '('+format(player.points)+' Shards)'},
                    {"font-size": "14px"}],   
                    ["display-text",
                        function() {return "(<span style='color:#fcf4e1'>"+format(player.Fragments.total)+" total Fragments</span>)"},
                        {"color": "#fcf4e1", "font-size": "12px"}],      
                        "blank", 
                        ["display-text",
                            function() {return "―――――――――――――――――――――――――――――"},
                            {"color": "#fcf4e1", "font-size": "32px"}],
                                "blank",
                            ["upgrades", [1]],
                            "blank",    
                            ["upgrades", [2, 3, 4]],
                            "blank",
                            ["upgrades", [5]],
                            "blank",
                            ["upgrades", [6, 7, 8]],  
                            "blank",   
                            ["upgrades", [9]],
                            "blank", 
                            ["upgrades", [10, 11, 12]],                      ["display-text",
                                function() {return "―――――――――――――――――――――――――――――"},
                                {"color": "#fcf4e1", "font-size": "32px"}],
                                
                            "buyables",
                
            
                            ],
    infoboxes:{
        FragmentLore: {
         title: "Forming Fragments",
         titleStyle: {'color': '#000000'},
         body: "―――――――――――――――――――――――――――――――――――――――――――――――――――――――――<br>Combines all of your Shards, resetting them and their upgrades in exchange for Fragments to be spent on new upgrades.<br>―――――――――――――――――――――――――――――――――――――――――――――――――――――――――",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})