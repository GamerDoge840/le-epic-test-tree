addLayer("Essence", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '5px solid #666363',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    baseResource: "???", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Essence<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFFF'> " +formatWhole(player.points)+" Essence</span>"
        if(player.EssenceShards.total.gte(1)) tooltip = tooltip + "<br><span style='color:#666363'>"+formatWhole(player.EssenceShards.points)+" Essence Shards</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        111: {    
            title: "Essence Generation",
            fullDisplay() {return `<font size="3"><b>[E01] Essence Generation</b><font size="2"><br>Enables Essence generation.<br>――――――――――――――――――<br>Currently: `+format(getPointGen()) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Essence Generation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>“The beginning of a long, long journey...”"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        112: {    
            title: "Broken Essence",
            fullDisplay() {return `<font size="3"><b>[E02] Broken Essence</b><font size="2"><br>Unlocks Essence Shards.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 33)},
            tooltip() {return "<span style='color:#ffffff'>Broken Essence</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "350px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        11: {    
            title: "Essence Booster",
            fullDisplay() {return `<font size="3"><b>[E11] Essence Booster</b><font size="2"><br>Increases Essence gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0020),
            effect() {
                scpow = 0.01
                scpow2 = 5
                effect = new Decimal(2.00)
                if (hasUpgrade('Essence', 12)) effect = effect.times(upgradeEffect('Essence', 12))
                if (hasUpgrade('Essence', 23)) effect = effect.times(upgradeEffect('Essence', 23))
                if (!hasUpgrade('EssenceShards', 23)) effect = softcap(effect, new Decimal("40"), scpow)
                if (hasUpgrade('EssenceShards', 23)) effect = softcap(effect, new Decimal("100"), scpow)
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.20)
                effect = softcap(effect, new Decimal("120"), scpow2)
                return effect
              },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 111)},
            tooltip() {return "<span style='color:#ffffff'>Essence Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Effect weakened after 40x and 120x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            title: "Essence Booster-2",
            fullDisplay() {return `<font size="3"><b>[E12] Essence Booster-2</b><font size="2"><br>Increases the effect of the previous upgrade.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0050),
            effect() {
                effect = new Decimal(2.00)
                if (hasUpgrade('Essence', 13)) effect = effect.times(upgradeEffect('Essence', 13))
                if (hasUpgrade('Essence', 32)) effect = effect.times(upgradeEffect('Essence', 32))
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.20)
                return effect
              },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 11)},
            tooltip() {return "<span style='color:#ffffff'>Essence Booster-2</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            title: "Essence Booster-3",
            fullDisplay() {return `<font size="3"><b>[E13] Essence Booster-3</b><font size="2"><br>Increases the effect of the previous upgrade.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0120),
            effect() {
                effect = new Decimal(2.00)
                if (hasUpgrade('Essence', 33)) effect = effect.times(upgradeEffect('Essence', 33))
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.20)
                return effect
              },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 12)},
            tooltip() {return "<span style='color:#ffffff'>Essence Booster-3</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Row Leader",
            fullDisplay() {return `<font size="3"><b>[E14] Row Leader</b><font size="2"><br>Boosts every upgrade in this row by 1.20x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 200,
                EssenceShards: 500,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence)
                    && player.EssenceShards.points.gte(this.costs.EssenceShards)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
              },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("EssenceShards", 33)},
            tooltip() {return "<span style='color:#ffffff'>Row Leader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Essence Upgrader",
            fullDisplay() {return `<font size="3"><b>[E21] Essence Upgrader</b><font size="2"><br>Increases Essence gain based on Essence upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0255),
            effect() {
                let eff = Decimal.pow(1.08, player.Essence.upgrades.length);
                if (hasUpgrade('EssenceShards', 21)) eff = eff.times(upgradeEffect('EssenceShards', 21))
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 13)},
            tooltip() {return "<span style='color:#ffffff'>Essence Upgrader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "Essence Synergism",
            fullDisplay() {return `<font size="3"><b>[E22] Essence Synergism</b><font size="2"><br>Increases Essence gain based on Essence amount.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0500),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 21)},
            tooltip() {return "<span style='color:#ffffff'>Essence Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Boosted Synergism",
            fullDisplay() {return `<font size="3"><b>[E23] Boosted Synergism</b><font size="2"><br>Essence boosts the effect of E11.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0700),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.45).plus(1);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 22)},
            tooltip() {return "<span style='color:#ffffff'>Boosted Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Row Leader",
            fullDisplay() {return `<font size="3"><b>[E14] Row Leader</b><font size="2"><br>Boosts every upgrade in this row by 1.20x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 200,
                EssenceShards: 500,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence)
                    && player.EssenceShards.points.gte(this.costs.EssenceShards)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
              },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("EssenceShards", 33)},
            tooltip() {return "<span style='color:#ffffff'>Row Leader</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "A Static Upgrade",
            fullDisplay() {return `<font size="3"><b>[E31] A Static Upgrade</b><font size="2"><br>Doubles Essence gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.11),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 23)},
            tooltip() {return "<span style='color:#ffffff'>A Static Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {    
            title: "Boosted Synergism II",
            fullDisplay() {return `<font size="3"><b>[E32] Boosted Synergism II</b><font size="2"><br>Essence boosts the effect of E12.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.2),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.05).plus(1);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 31)},
            tooltip() {return "<span style='color:#ffffff'>Boosted Synergism II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {    
            title: "Upgrader Synergism Booster",
            fullDisplay() {return `<font size="3"><b>[E33] Upgrader Synergism Booster</b><font size="2"><br>Boost E13 based on Essence upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.6),
            effect() {
                let eff = Decimal.pow(1.05, player.Essence.upgrades.length);
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 32)},
            tooltip() {return "<span style='color:#ffffff'>Upgrader Synergism Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#FFFFFF',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
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
     tabFormat: {
        "Essence": {
        content: [
            ["raw-html", function() {if (player.EssenceShards.total.gte(1)) return '('+formatWhole(player.EssenceShards.points)+'  Essence Shards)'}, {"color": "#666363", "font-size": "17px"}],
            ["raw-html", function() {if (player.EssenceShards.total.gte(1)) return '―――――――――――――――――――――――――――――'}, {"color": "#FFFFFF", "font-size": "23px"}],
        ["display-text",
            function() {return ''+format(player.points)+' Essence'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            
                                            ["raw-html", function() {if (hasUpgrade("Essence", 111)) return "<font size='4'>(+"+formatSmall(getPointGen())+"/s)"}, {"font-size": "30px"}],                  
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "EssenceTabs"],

                ]
            
        },
        "Essence Shards": {
            //style() {
                //return {
                    //"background-image": "linear-gradient(to top, #ff856f,#f7ebff",
                    //"background-size": "cover"
                //};
            //},
            unlocked() {return hasUpgrade('Essence', 112)},
            buttonStyle: {"border-color": "#A6A1A1"},
            embedLayer: 'EssenceShards',
        },
    },
        microtabs: {
            EssenceTabs: {
                "Upgrades": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 111],]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],]]]],
                        ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],]]]],
                        ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34],]]]],
                         "blank",
                        ["column", [ ["row", [ ["upgrade", 112],]]]],
                        "blank",




                    ]
                },
            }
        },
})