addLayer("Level", {
    name: "Level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🖥️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#cacdc8",
    nodeStyle() {
        return {
            'border': '5px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Sus", // Name of prestige currency
    resetDescription: "Do somthin sussy<br>----------<br>",
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetsNothing: true,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>The Machine<br>----------------<br> <font size='2'><span style='color:#ffffff'>Number " +formatWhole(player.points)+"</span>"
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
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Start The Machine",
            fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Start The Machine</span></b><font size="2"><br>Activate The Machine, and start slowly incrementing the <span style="color:#ffffff">Number</span>.<br>-----------------<br><b>Currently: `+format(getPointGen()) +`/s</b><br>-----------------<br>`},    
            cost: new Decimal(0),
            currencyInternalName: "points",
            tooltip() {return "<span style='color:#ffffff'>Start The Machine</span><br>----------------<br><span style='font-size:11px'><span style='color:#7d837c'>It's just a machine running math calculations. Nothing can go wrong."},
            style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#aada81',
                        "width": "600px",
                "height": "145px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#ff7768' ,
                        "width": "195px",
                "height": "145px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                    else if (canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#ff7768' ,
                        "width": "195px",
                "height": "145px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                },
        },
        21: {    
            title: "Multiplier 1",
            // versoin wif effect             fullDisplay() {return `<font size="3"><b><span style='color:#e8c375'>Increaser I</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.1x<br>-----------------<br><b>Currently: `+format(upgradeEffect(this.layer, this.id))+`x</b><br>-----------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
            fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 1</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.10x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
            cost: new Decimal(0.000001),
            currencyInternalName: "points",
            unlocked() { return hasUpgrade("Level", 11) },
            tooltip() {return "<span style='color:#ffffff'>Multiplier 1</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Basic math upgrade. Makes the Number go up faster."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#92be78',
                    "width": "125px",
            "height": "105px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "125px",
            "height": "105px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b9b7b3' ,
                    "width": "160px",
            "height": "100px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
    },
    22: {    
        title: "Multiplier 2",
        // versoin wif effect             fullDisplay() {return `<font size="3"><b><span style='color:#e8c375'>Increaser I</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.1x<br>-----------------<br><b>Currently: `+format(upgradeEffect(this.layer, this.id))+`x</b><br>-----------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 2</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.20x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.000004),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 21) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 2</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the Number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
},
    23: {    
        title: "Multiplier 3",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 3</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.30x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.00001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 22) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 3</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the Number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    24: {    
        title: "Multiplier 4",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 4</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.40x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.00001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 23) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 4</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the Number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    31: {    
        title: "Multiplier 5",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 5</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.50x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.00001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 24) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 5</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    32: {    
        title: "Multiplier 6",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 6</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.60x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.00001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 31) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 6</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    33: {    
        title: "Multiplier 7",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 7</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.70x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.00001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 32) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 7</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    34: {    
        title: "Multiplier 8",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 8</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.80x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 33) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 8</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Also unlocks a row of new upgrades."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    41: {    
        title: "Doubler",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Doubler</span></b><font size="2"><br><span style="color:#ffffff">Number</span> is doubled<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 34) },
        tooltip() {return "<span style='color:#ffffff'>Doubler</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    42: {    
        title: "Tripler",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Tripler</span></b><font size="2"><br><span style="color:#ffffff">Number</span> is tripled<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0001),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 41) },
        tooltip() {return "<span style='color:#ffffff'>Tripler</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    43: {    
        title: "Quadrupler",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Quadrupler</span></b><font size="2"><br><span style="color:#ffffff">Number</span> is quadrupled<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0007),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 42) },
        tooltip() {return "<span style='color:#ffffff'>Quadrupler</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    44: {    
        title: "Quintupler",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Quintupler</span></b><font size="2"><br><span style="color:#ffffff">Number</span> is quintupled<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0025),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 43) },
        tooltip() {return "<span style='color:#ffffff'>Quintupler</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Multiplication data still insufficient..."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    51: {    
        title: "Multiplier 9",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 9</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 1.90x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0100),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 44) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 9</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    52: {    
        title: "Multiplier 10",
        fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Multiplier 10</span></b><font size="2"><br><span style="color:#ffffff">Number</span> boosted by 2.00x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#ffffff'> Number</span>`},    
        cost: new Decimal(0.0200),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("Level", 51) },
        tooltip() {return "<span style='color:#ffffff'>Multiplier 10</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Makes the number go up faster."},
        style() {
            if (hasUpgrade(this.layer, this.id)) return {
                'background-color': '#92be78',
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else if (!canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#bf8f8f' ,
                "width": "125px",
        "height": "105px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
            else if (canAffordUpgrade(this.layer, this.id)) {
                return {
                'background-color': '#b9b7b3' ,
                "width": "160px",
        "height": "100px",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            }
        },
    },
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "The Machine": {
            content: [ 
                ["infobox", "KnowledgeLore"],
                ['display-text',function(){return '<h4>The <span style="color:#ffffff">Number</span> is '+quickBigColor(format(player.points),'#ffffff') +'.'}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#cacdc8", "font-size": "32px"}],
                ["display-text",
                    function() {return "============================="},
                    {"color": "#cacdc8", "font-size": "32px"}], 
                    ["upgrades", [1]],
                    "blank",
                    ["upgrades", [2, 3, 5]],
                    "blank",
                    ["upgrades", [4]],
                ["display-text",
                    function() {return "============================="},
                    {"color": "#cacdc8", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#cacdc8", "font-size": "32px"}], 
                    
            ]
            
        },
        //"Scroll Rack": {
            //unlocked() {return hasMilestone('Knowledge', 2)||player.Scrolls.best.gte(1)},
            //buttonStyle: {"border-color": "#CD7F32"},
            //embedLayer: 'Scrolls',
       // },
    },
    infoboxes:{
        KnowledgeLore: {
         title: "NUMBER",
         titleStyle: {'color': '#000000'},
         body: "?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})