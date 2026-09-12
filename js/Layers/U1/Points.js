addLayer("p", {
    name: "Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    tooltip() {
        let tooltip = "<font size='3'>Points<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFFF'> " +format(player.points)+" Points</span>"
        return tooltip
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
    },
    upgrades: { 
        0: {    
            fullDisplay() {return `<font size="2"><b>[P00] Begin</b><font size="1"><br>Begin the game!
                <br>――――――――――――――――――<br>Currently: `+formatSmall(getPointGen())+`/s
                <br>――――――――――――――――――<br>Cost: Free!`},        
            cost: new Decimal(0),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Begin</span><br>――――――――――――<br><span style='font-size:11px'>Enables generation of Points."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "155px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "155px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        1: {    
            fullDisplay() {return `<font size="2"><b>[P01] The First Upgrade</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain and unlock a buyable.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.10),
            currencyInternalName: "points",
            branches: [0],
            unlocked() {return (hasUpgrade("p", 0))},
            effect() {
              	let eff = new Decimal(0.010)
                if(hasUpgrade('p', 9)) eff = eff.add(upgradeEffect("p", 9))
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>The First Upgrade</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        2: {    
            fullDisplay() {return `<font size="2"><b>[P02] The Second Upgrade</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.45),
            currencyInternalName: "points",
            branches: [1],
            unlocked() {return getBuyableAmount("p", 1).gte(2)},
            effect() {
              	let eff = new Decimal(0.020)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>The Second Upgrade</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        3: {    
            fullDisplay() {return `<font size="2"><b>[P03] Buy It Thrice</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain and P01-B can be bought one more time.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.8),
            currencyInternalName: "points",
            branches: [1],
            unlocked() {return (hasUpgrade("p", 2))},
            effect() {
              	let eff = new Decimal(0.010)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Buy It Thrice</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        4: {    
            fullDisplay() {return `<font size="2"><b>[P04] Buy It Four Times</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain and P01-B can be bought one more time.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            branches: [1, 2],
            unlocked() {return getBuyableAmount("p", 1).gte(3)},
            effect() {
              	let eff = new Decimal(0.005)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Buy It Four Times</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        5: {    
            fullDisplay() {return `<font size="2"><b>[P05] Another Addition</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            branches: [1, 3],
            unlocked() {return getBuyableAmount("p", 1).gte(3)},
            effect() {
              	let eff = new Decimal(0.020)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Another Addition</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        6: {    
            fullDisplay() {return `<font size="2"><b>[P06] Another Addition...</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1.75),
            currencyInternalName: "points",
            branches: [1],
            unlocked() {return (hasUpgrade("p", 4)) && (hasUpgrade("p", 5))},
            effect() {
              	let eff = new Decimal(0.0150)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Another Addition...</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        7: {    
            fullDisplay() {return `<font size="2"><b>[P07] Easy but Weak</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(0.65),
            currencyInternalName: "points",
            branches: [6],
            unlocked() {return (hasUpgrade("p", 6))},
            effect() {
              	let eff = new Decimal(0.020)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Easy but Weak</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        8: {    
            fullDisplay() {return `<font size="2"><b>[P08] Hard but Strong</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(5),
            currencyInternalName: "points",
            branches: [6],
            unlocked() {return (hasUpgrade("p", 6))},
            effect() {
              	let eff = new Decimal(0.1)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Hard but Strong</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        9: {    
            fullDisplay() {return `<font size="2"><b>[P09] Upgrade Upgrader</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to P01's effect.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(4.5),
            currencyInternalName: "points",
            branches: [4],
            unlocked() {return (hasUpgrade("p", 7) && hasUpgrade("p", 8))},
            effect() {
              	let eff = new Decimal(0.04)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Upgrade Upgrader</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        10: {    
            fullDisplay() {return `<font size="2"><b>[P10] Buy It Six Times</b><font size="1"><br>P01-B can be bought two more times and unlock a new buyable.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(6.5),
            currencyInternalName: "points",
            branches: [5],
            unlocked() {return (hasUpgrade("p", 7) && hasUpgrade("p", 8))},
            effect() {
              	let eff = new Decimal(0.04)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Buy It Six Times</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        11: {    
            fullDisplay() {return `<font size="2"><b>[P11] Buyable Upgrader</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to P01-B's effect.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(13),
            currencyInternalName: "points",
            branches: [9],
            unlocked() {return getBuyableAmount("p", 2).gte(6) && hasUpgrade("p", 9)},
            effect() {
              	let eff = new Decimal(0.08)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Buyable Upgrader</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            fullDisplay() {return `<font size="2"><b>[P12] Yet Another Boring Addition</b><font size="1"><br>Add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(13),
            currencyInternalName: "points",
            branches: [10],
            unlocked() {return getBuyableAmount("p", 2).gte(8) && hasUpgrade("p", 11)},
            effect() {
              	let eff = new Decimal(0.30)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Yet Another Boring Addition</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            fullDisplay() {return `<font size="2"><b>[P13] Multiplier</b><font size="1"><br>Multiply Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(30),
            currencyInternalName: "points",
            branches: [6],
            unlocked() {return hasUpgrade("p", 12)},
            effect() {
              	let eff = new Decimal(1.75)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Multiplier</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            fullDisplay() {return `<font size="2"><b>[P14] Two In One</b><font size="1"><br>Multiply Point gain by `+format((tmp.p.upgrades[14].effect1))+`x and add +`+format((tmp.p.upgrades[14].effect2))+` to it.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(35),
            currencyInternalName: "points",
            branches: [13],
            unlocked() {return hasUpgrade("p", 13)},
            effect1() {
              	let eff = new Decimal(1.25)
                return eff
            },
            effect2() {
              	let eff = new Decimal(0.30)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Two In One</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        15: {    
            fullDisplay() {return `<font size="2"><b>[P15] Multiplier 2</b><font size="1"><br>Multiply Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(25),
            currencyInternalName: "points",
            branches: [13],
            unlocked() {return hasUpgrade("p", 13)},
            effect() {
              	let eff = new Decimal(1.5)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Multiplier 2</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        16: {    
            fullDisplay() {return `<font size="2"><b>[P16] Easy but Weak 2</b><font size="1"><br>Multiply Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(15),
            currencyInternalName: "points",
            branches: [7, 9],
            unlocked() {return hasUpgrade("p", 14) && hasUpgrade("p", 15)},
            effect() {
              	let eff = new Decimal(1.1)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Easy but Weak 2</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        17: {    
            fullDisplay() {return `<font size="2"><b>[P17] Hard but Strong 2</b><font size="1"><br>Multiply Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(150),
            currencyInternalName: "points",
            branches: [8, 10],
            unlocked() {return hasUpgrade("p", 14) && hasUpgrade("p", 15)},
            effect() {
              	let eff = new Decimal(2.5)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Hard but Strong 2</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        18: {    
            fullDisplay() {return `<font size="2"><b>[P18] Point Buyable Expander</b><font size="1"><br>Unlock 2 new Point buyables and add +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(200),
            currencyInternalName: "points",
            branches: [13],
            unlocked() {return hasUpgrade("p", 16) && hasUpgrade("p", 17)},
            effect() {
              	let eff = new Decimal(2)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Point Buyable Expander</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        19: {    
            fullDisplay() {return `<font size="2"><b>[P19] The Illusion</b><font size="1"><br>Multiplies Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(500),
            currencyInternalName: "points",
            branches: [18],
            unlocked() {return hasUpgrade("p", 18)},
            effect() {
              	let eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>The Illusion</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        20: {    
            fullDisplay() {return `<font size="2"><b>[P20] of Choice...</b><font size="1"><br>Multiplies Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(500),
            currencyInternalName: "points",
            branches: [18],
            unlocked() {return hasUpgrade("p", 18)},
            effect() {
              	let eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>of Choice...</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            fullDisplay() {return `<font size="2"><b>[P21] Another Illusion,</b><font size="1"><br>Multiplies Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(750),
            currencyInternalName: "points",
            branches: [19],
            unlocked() {return hasUpgrade("p", 19) && hasUpgrade("p", 20)},
            effect() {
              	let eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Another Illusion,</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            fullDisplay() {return `<font size="2"><b>[P22] Another Choice...</b><font size="1"><br>Multiplies Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(750),
            currencyInternalName: "points",
            branches: [20],
            unlocked() {return hasUpgrade("p", 19) && hasUpgrade("p", 20)},
            effect() {
              	let eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Another Choice...</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            fullDisplay() {return `<font size="2"><b>[P23] To Add</b><font size="1"><br>Adds +`+format(upgradeEffect(this.layer, this.id))+` to base point gain.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1000),
            currencyInternalName: "points",
            branches: [14, 16, 21],
            unlocked() {return hasUpgrade("p", 21) && hasUpgrade("p", 22)},
            effect() {
              	let eff = new Decimal(10)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>To Add</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            fullDisplay() {return `<font size="2"><b>[P24] Or To Multiply?</b><font size="1"><br>Multiply Point gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(1000),
            currencyInternalName: "points",
            branches: [15, 17, 22],
            unlocked() {return hasUpgrade("p", 21) && hasUpgrade("p", 22)},
            effect() {
              	let eff = new Decimal(1.30)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>Or To Multiply?</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        25: {    
            fullDisplay() {return `<font size="2"><b>[P25] Research Unlocker</b><font size="1"><br>Unlocks Research layer and enables ability to perform the reset.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Points`},        
            cost: new Decimal(2500),
            currencyInternalName: "points",
            branches: [19, 20],
            unlocked() {return hasUpgrade("p", 23) && hasUpgrade("p", 24)},
            tooltip() {return "<span style='color:#ffffff'>Research Unlocker</span><br>――――――――――――<br><span style='font-size:11px'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#ffffff',
                'color': 'black',
                        "width": "135px",
            "height": "145px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    buyables: {
        1: {
            display() {return `<font size="2"><b>[P01-B] Buy It Twice</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Adds +` +format(tmp[this.layer].buyables[this.id].effect) + ` to base point gain.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Points`}, 
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(0.250);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 1).div(200)
		       if(hasUpgrade('p', 11)) eff = eff.add(upgradeEffect("p", 11))
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(2)
                if(hasUpgrade('p', 3)) cap = cap.add(1)
                if(hasUpgrade('p', 4)) cap = cap.add(1)
                if(hasUpgrade('p', 10)) cap = cap.add(2)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.250).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 1))) setBuyableAmount('p', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Buy It Twice</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase adds +0.005 to base Point gain."},
            style() {
                if(!this.canAfford()){return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

                else return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade("p", 1))},
    
        },
        2: {
            display() {return `<font size="2"><b>[P02-B] Repetitive Addition</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Adds +` +format(tmp[this.layer].buyables[this.id].effect) + ` to base point gain.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Points`}, 
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 2).div(25)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(1).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 2))) setBuyableAmount('p', 2, max.add(1).floor())
            },
            branches: ["1"],
            tooltip() {return "<span style='color:#ffffff'>Repetitive Addition</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase adds +0.04 to base Point gain."},
            style() {
                if(!this.canAfford()){return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

                else return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade("p", 10))},
    
        },
        3: {
            display() {return `<font size="2"><b>[P03-B] Multiplicator 1</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Multiplies Point gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Points`}, 
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(10);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 3).mul(0.05).plus(1)
                return eff
            },       
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(25)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(10).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 3))) setBuyableAmount('p', 3, max.add(1).floor())
            },
            branches: ["2"],
            tooltip() {return "<span style='color:#ffffff'>Multiplicator 1</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase multiplies Point gain by 1.05x."},
            style() {
                if(!this.canAfford()){return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

                else return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade("p", 18))},
    
        },
        4: {
            display() {return `<font size="2"><b>[P04-B] Multiplicator 2</b><font size="1"><br>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)
                Multiplies Point gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x.<br>――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Points`}, 
            cost(x) {
                let base = new Decimal(2.50);
                let cost = base.pow(x).times(10);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("p", 4).mul(0.15).plus(1)
                return eff
            },       
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(10).log(2.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('p', 4))) setBuyableAmount('p', 4, max.add(1).floor())
            },
            branches: ["2"],
            tooltip() {return "<span style='color:#ffffff'>Multiplicator 2</span><br>――――――――――――<br><span style='font-size:11px'>Each purchase multiplies Point gain by 1.15x."},
            style() {
                if(!this.canAfford()){return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',}}

                else return {
                'background-color': '#E3E3E3',
                    "width": "135px",
            "height": "145px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade("p", 18))},
    
        },
    },
     tabFormat: {
        "Points": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Points'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            ["display-text",
            function() {return "<font size='4'>(+"+formatSmall(getPointGen())+"/s)"},
            {"color": "#FFFFFF", "font-size": "30px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "PointTabs"],

                ]
            
        },
    },
        microtabs: {
            PointTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], "blank", ["upgrade", 2], "blank", ["upgrade", 1], "blank", ["upgrade", 3], "blank", ["upgrade", 12],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 9], "blank", ["upgrade", 4], ["blank", "1px"], ["upgrade", 0], "blank", ["upgrade", 5], "blank", ["upgrade", 10], ]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 16], "blank", ["upgrade", 7], "blank", ["upgrade", 6],"blank", ["upgrade", 8], "blank", ["upgrade", 17], ]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 23], "blank", ["upgrade", 14], "blank", ["upgrade", 13],"blank", ["upgrade", 15], "blank", ["upgrade", 24], ]]]],
                    "blank",
                    ["column", [ ["row", [  ["upgrade", 21], "blank", ["upgrade", 18], "blank", ["upgrade", 22], ]]]],
                    "blank",
                    ["column", [ ["row", [  "blank", ["upgrade", 19], "blank", ["upgrade", 20], "blank", ]]]],
                    "blank",
                    ["column", [ ["row", [  "blank", ["upgrade", 25], "blank", ]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
                "Buyables": {
                    unlocked() {return (hasUpgrade("p", 1))},
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["buyable", 1],]]]],
                    "blank",
                    ["column", [ ["row", [ ["buyable", 3], "blank", ["buyable", 2], "blank", ["buyable", 4],]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})