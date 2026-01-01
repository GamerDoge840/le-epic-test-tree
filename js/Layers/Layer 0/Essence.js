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
    autoUpgrade() {return hasUpgrade('Essence', 44)},
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
    automate() {
        if(hasUpgrade('Purity', 32)) buyMaxBuyable('Essence', 11)
        if(hasUpgrade('Purity', 33)) buyMaxBuyable('Essence', 21)
    },
doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        if (hasUpgrade('Purity', 33) && hasUpgrade('Essence', 41) ) keptUpgrades.push(41)
        if (hasUpgrade('Purity', 33) && hasUpgrade('Essence', 42) ) keptUpgrades.push(42)
        if (hasUpgrade('Purity', 33) && hasUpgrade('Essence', 43) ) keptUpgrades.push(43)
        if (hasUpgrade('Purity', 33) && hasUpgrade('Essence', 44) ) keptUpgrades.push(44)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
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
            tooltip() {return "<span style='color:#ffffff'>Essence Generation</span><br>――――――――――――<br><span style='font-size:11px'>“The beginning of a long, long journey...”"},
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
            cost: new Decimal(0.1),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 33)},
            tooltip() {return "<span style='color:#ffffff'>Broken Essence</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#666363',
                    "width": "350px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "225px",
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
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        11: {    
            title: "First Upgrade",
            fullDisplay() {return `<font size="3"><b>[E11] First Upgrade</b><font size="2"><br>Increases Essence gain.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0025),
            effect() {
                effect = new Decimal(1.50)
                if (hasUpgrade('Essence', 12)) effect = effect.times(upgradeEffect('Essence', 12))
                if (hasUpgrade('Essence', 23)) effect = effect.times(upgradeEffect('Essence', 23))
                if (hasUpgrade('Essence', 31)) effect = effect.times(upgradeEffect('Essence', 31))
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.15)
                if (hasUpgrade('Purity', 12)) effect = effect.times(1.25)
                if (hasUpgrade('Essence', 42)) effect = effect.times(upgradeEffect('Essence', 42))
                return effect
              },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 111)},
            tooltip() {return "<span style='color:#ffffff'>First Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Upgrade Improvement",
            fullDisplay() {return `<font size="3"><b>[E12] Upgrade Improvement</b><font size="2"><br>Increases the effect of the previous upgrade.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0050),
            effect() {
                effect = new Decimal(1.50)
                if (hasUpgrade('Essence', 13)) effect = effect.times(upgradeEffect('Essence', 13))
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.15)
                return effect
              },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 11)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Improvement</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Upgrade Power",
            fullDisplay() {return `<font size="3"><b>[E13] Upgrade Power</b><font size="2"><br>Increases the effect of E12 based on Essence upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0075),
            effect() {
                let eff = Decimal.pow(1.10, player.Essence.upgrades.length);
                if (hasUpgrade('EssenceShards', 21)) eff = eff.times(upgradeEffect('EssenceShards', 21))
                if (hasUpgrade('Essence', 14)) effect = effect.times(1.15)
                scpow = 0.05
                eff = softcap(eff, new Decimal("6.041"), scpow)
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 12)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Power</span><br>――――――――――――<br><span style='font-size:11px'><span style=color:#FFF28A>Effect weaker after 6.00x"},
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
            fullDisplay() {return `<font size="3"><b>[E14] Row Leader</b><font size="2"><br>Boosts every upgrade in this row by 1.15x, and unlocks a new Essence buyable.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 5,
                EssenceShards: 20,
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
            unlocked() {return hasUpgrade("EssenceShards", 23)},
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
            title: "Self-Synergism",
            fullDisplay() {return `<font size="3"><b>[E21] Self-Synergism</b><font size="2"><br>Essence boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0125),
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                if (hasUpgrade('Essence', 32)) eff = eff.times(upgradeEffect('Essence', 32))
                if (hasUpgrade('EssenceShards', 31)) eff = eff.times(upgradeEffect('EssenceShards', 31))
                scpow = 0.05
                eff = softcap(eff, new Decimal("10"), scpow)
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 13)},
            tooltip() {return "<span style='color:#ffffff'>Self-Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFF28A'>Effect weaker after 10.00x"},
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
            title: "Upgrade Refinement",
            fullDisplay() {return `<font size="3"><b>[E22] Upgrade Refinement</b><font size="2"><br>E12's effect also directly boosts Essence gain at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0225),
            effect() {
                let eff = upgradeEffect('Essence', 12).pow(0.35);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 21)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Refinement</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Upgrade Synergism",
            fullDisplay() {return `<font size="3"><b>[E23] Upgrade Synergism</b><font size="2"><br>Boost E11 based on Essence.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0300),
            effect() {
                let eff = player.points.plus(2).pow(0.3);
                scpow = 0.05
                eff = softcap(eff, new Decimal("2"), scpow)
                return eff;
            },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 22)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFF28A'>Effect weaker after 2.00x"},
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
        24: {    
            title: "Booster Rebuilding",
            fullDisplay() {return `<font size="3"><b>[E24] Booster Rebuilding</b><font size="2"><br>ES11 is boosted by E11, at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 35,
                EssenceShards: 40,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence)
                    && player.EssenceShards.points.gte(this.costs.EssenceShards)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
              },
              effect() {
                let eff = upgradeEffect('Essence', 11).pow(0.07);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 14)},
            tooltip() {return "<span style='color:#ffffff'>Booster Rebuilding</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Improved Power",
            fullDisplay() {return `<font size="3"><b>[E31] Improved Power</b><font size="2"><br>E13 boosts E11 with reduced effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.0500),
            effect() {
                let eff = upgradeEffect('Essence', 13).pow(0.5);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 23)},
            tooltip() {return "<span style='color:#ffffff'>Improved Power</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Synergism Power",
            fullDisplay() {return `<font size="3"><b>[E32] Synergism Power</b><font size="2"><br>E13 boosts E21 with reduced effect.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.1),
            effect() {
                let eff = upgradeEffect('Essence', 13).pow(0.25);
                return eff;
            },   
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 31)},
            tooltip() {return "<span style='color:#ffffff'>Synergism Power</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
            title: "Just a Flat Boost",
            fullDisplay() {return `<font size="3"><b>[E33] Just a Flat Boost</b><font size="2"><br>Increases Essence gain by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            cost: new Decimal(0.125),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade('Essence', 32)},
            tooltip() {return "<span style='color:#ffffff'>Just a Flat Boost</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        34: {    
            title: "Booster Reconstruction",
            fullDisplay() {return `<font size="3"><b>[E34] Booster Reconstruction</b><font size="2"><br>Total amount of Essence Shards boosts ES11.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.EssenceShards)+` Essence Shards`},        
            costs: {
                Essence: 60,
                EssenceShards: 80,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence)
                    && player.EssenceShards.points.gte(this.costs.EssenceShards)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.EssenceShards.points = player.EssenceShards.points.minus(this.costs.EssenceShards);
              },
              effect() {
                let eff = player.EssenceShards.total.plus(2).pow(0.03);
                if (hasUpgrade('EssenceShards', 32)) eff = eff.times(upgradeEffect('EssenceShards', 32))
                return eff;
            },  
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 24)},
            tooltip() {return "<span style='color:#ffffff'>Booster Reconstruction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ABFF8A'>Also unlocks a new column of Essence Shard upgrades!"},
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
        41: {    
            title: "Better Fracturation",
            fullDisplay() {return `<font size="3"><b>[E41] Better Fracturation</b><font size="2"><br>Increase Essence Shard generation rate from 5% ---> 15%.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                Essence: 125000,
                Purity: 20,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence) && !hasUpgrade("Essence", 44)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
            unlocked() {return hasUpgrade("Purity", 33)},
            tooltip() {return "<span style='color:#ffffff'>Better Fracturation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        42: {    
            title: "Upgrade Recursion",
            fullDisplay() {return `<font size="3"><b>[E42] Upgrade Recursion</b><font size="2"><br>E11 boosts itself.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                Essence: 200000,
                Purity: 25,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence) && !hasUpgrade("Essence", 44)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
              effect() {
                let eff = upgradeEffect('Essence', 11).pow(0.05);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 41)},
            tooltip() {return "<span style='color:#ffffff'>Upgrade Recursion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        43: {    
            title: "Pure Synergism",
            fullDisplay() {return `<font size="3"><b>[E43] Pure Synergism</b><font size="2"><br>E21 boosts Pure Essence gain at a reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                Essence: 250000,
                Purity: 30,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence) && !hasUpgrade("Essence", 44)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
              effect() {
                let eff = upgradeEffect('Essence', 21).pow(0.15);
                return eff;
            }, 
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 42)},
            tooltip() {return "<span style='color:#ffffff'>Pure Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        44: {    
            title: "Essence Automation",
            fullDisplay() {return `<font size="3"><b>[E44] Essence Automation</b><font size="2"><br>Autobuy Essence upgrades. Unlock a new row of Essence Shard upgrades.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].costs.Essence)+` Essence and `+format(tmp[this.layer].upgrades[this.id].costs.Purity)+` Pure Essence`},        
            costs: {
                Essence: 350000,
                Purity: 40,
              },
              canAfford() {
                return player.points.gte(this.costs.Essence) && !hasUpgrade("Essence", 44)
                    && player.Purity.points.gte(this.costs.Purity)
              },
              pay() {
                player.points = player.points.minus(this.costs.Essence);
                player.Purity.points = player.Purity.points.minus(this.costs.Purity);
              },
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Essence", 43)},
            tooltip() {return "<span style='color:#ffffff'>Essence Automation</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
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
        11: {
            display() {return `<font size="3"><b>[E11-B] Essence Gatherer</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            cost(x) {
                let base = new Decimal(1.385);
                let cost = base.pow(x).times(0.050);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Essence', 11).mul(0.10).plus(1)
                if (hasUpgrade('Purity', 23)) eff = eff.times(1.20)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.050).log(1.385) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 11))) setBuyableAmount('Essence', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Gatherer</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>“Gathers Essence from the void.”"},
            style() {
                if(!this.canAfford()){return {'background-color':'#FFFFFF', 'color':'black','border': '5px solid','border-color':'#666363'}}
                else return {'background-color':'#FFFFFF', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("EssenceShards", 13)},
    
        },
        21: {
            display() {return `<font size="3"><b>[E21-B] Essence Machine</b><font size="2"><br>――――――――――――――――――――<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence Shards</b><br><b>Amount: `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(2);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Essence', 21).mul(0.15).plus(1)
                return eff
            },   
            canAfford() { if (player.EssenceShards.points.gte(this.cost())) {return true}},
            buy() {
                player.EssenceShards.points = player.EssenceShards.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.EssenceShards.points.div(this.cost(0)).add(2).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 21))) setBuyableAmount('Essence', 21, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Machine</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>“A machine to boost Essence gain, made out of shards.”"},
            style() {
                if(!this.canAfford()){return {'background-color':'#666363', 'color':'black','border': '5px solid','border-color':'#FFFFFF'}}
                else return {'background-color':'#666363', 'color':'black','border': '3px solid','border-color':'green','box-shadow':'0px 0px 5px #8eff00'}
            },
            unlocked() {return hasUpgrade("Essence", 14)},
    
        },
    },
     tabFormat: {
        "Essence": {
        content: [
            ["raw-html", function() {if (hasUpgrade("Purity", 33)) return '('+formatWhole(player.Purity.points)+'  Pure Essence)'}, {"color": "#E6FCFC", "font-size": "19px"}],
            ["raw-html", function() {if (player.EssenceShards.total.gte(1)) return '('+formatWhole(player.EssenceShards.points)+'  Essence Shards)'}, {"color": "#666363", "font-size": "19px"}],
            ["raw-html", function() {if (player.EssenceShards.total.gte(1) || hasUpgrade("Purity", 33)) return '―――――――――――――――――――――――――――――'}, {"color": "#FFFFFF", "font-size": "23px"}],
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
                        ["column", [ ["row", [ ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44],]]]],
                         "blank",
                        ["column", [ ["row", [ ["upgrade", 112],]]]],
                        "blank",




                    ]
                },
                "Buyables": {
                    unlocked() {return hasUpgrade("EssenceShards", 13)},
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["buyable", 11]]]]],
                        "blank",
                        ["raw-html", function() {if (hasUpgrade("Essence", 14)) return '―――――――――――――――――――――――――――――'}, {"color": "#666363", "font-size": "23px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 21]]]]],
                        "blank",

                    ]
                },
            }
        },
})