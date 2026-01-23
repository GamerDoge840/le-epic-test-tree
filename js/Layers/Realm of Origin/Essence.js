addLayer("Essence", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        accumulatorImprovements: new Decimal(0),
        bestEssence: new Decimal(0.0000000000001),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(200deg, #FFFFFF, #818281)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Essence<br>――――――――――――――<br> <font size='2'></span>"
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
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    update(delta){
        //Get best Essence
        if (player.Essence.bestEssence.lt(player.points) && hasUpgrade("Essence", 11) ) player.Essence.bestEssence = player.points
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    accumulatorMiniReset()
    {
        player.points = new Decimal(0)
        player.Essence.buyables[1] = new Decimal(0)
        player.Essence.buyables[2] = new Decimal(0)
        player.Essence.buyables[3] = new Decimal(0)
        player.Essence.buyables[4] = new Decimal(0)
        player.Essence.buyables[5] = new Decimal(0)
        player.Essence.buyables[6] = new Decimal(0)
        player.Essence.buyables[7] = new Decimal(0)
        player.Essence.buyables[8] = new Decimal(0)
        player.Essence.buyables[9] = new Decimal(0)
    },
    milestones: {
    },
    upgrades: {        
        11: {
            fullDisplay() {return `<font size="2"><b>[E11] Genesis</b><font size="1"><br>Enables Essence generation.<br>――――――――――――――――――<br>
                Effect: `+formatSmall(getPointGen())+`/s <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return true },
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#ffffff'>[E11] Genesis</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            fullDisplay() {return `<font size="2"><b>[E12] Accretion </b><font size="1"><br>Unlocks the Essence Accumulator.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 11) },
            cost: new Decimal(0.0025),
            tooltip() {return "<span style='color:#ffffff'>[E12] Accretion</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay() {return `<font size="2"><b>[E13] Sacrifice </b><font size="1"><br>Unlocks the Accumulator Improvement reset.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 12) },
            cost: new Decimal(0.025),
            tooltip() {return "<span style='color:#ffffff'>[E13] Sacrifice</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay() {return `<font size="2"><b>[E14] Improvement Improver</b><font size="1"><br>Each Accumulator Improvement also boosts Essence gain by 50% each.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return player.Essence.accumulatorImprovements.gte('3') },
            effect() {
                let eff = player.Essence.accumulatorImprovements.mul(0.50).plus(1);
                return eff
            },
            cost: new Decimal(0.0100),
            tooltip() {return "<span style='color:#ffffff'>[E14] Improvement Improver</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {
            fullDisplay() {return `<font size="2"><b>[E21] Meta-Upgrade</b><font size="1"><br>Boost Essence gain based on Essence upgrades bought.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade("Essence", 14) },
            effect() {
                let eff = Decimal.pow(1.15, player.Essence.upgrades.length);
                return eff
            },
            cost: new Decimal(0.060),
            tooltip() {return "<span style='color:#ffffff'>[E21] Meta-Upgrade</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {
            fullDisplay() {return `<font size="2"><b>[E22] Levels</b><font size="1"><br>Triple Essence gain. Unlock Levels.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return player.Essence.accumulatorImprovements.gte('5') },
            cost: new Decimal(0.250),
            tooltip() {return "<span style='color:#ffffff'>[E22] Levels</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {
            fullDisplay() {return `<font size="2"><b>[E23] Self-Synergism</b><font size="1"><br>Essence boosts itself.<br>――――――――――――――――――<br>
                Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},         
            unlocked() { return hasMilestone('Level', 2) },
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                scpow = 0.25
                eff = softcap(eff, new Decimal("100"), scpow)
                return eff;
            },
            cost: new Decimal(150),
            tooltip() {return "<span style='color:#ffffff'>[E23] Self-Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>Upgrade effect softcapped after 100x."},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {
            fullDisplay() {return `<font size="2"><b>[E24] Essence-Level Synergism</b><font size="1"><br>Essence divides the Level requirement.<br>――――――――――――――――――<br>
                Effect: /`+format(upgradeEffect(this.layer, this.id))+` <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},         
            unlocked() { return hasMilestone('Level', 3) && hasUpgrade('Essence', 23) },
            effect() {
                let eff = player.points.plus(2).pow(0.07);
                scpow = 0.25
                eff = softcap(eff, new Decimal("10"), scpow)
                return eff;
            }, 
            cost: new Decimal(10000),
            tooltip() {return "<span style='color:#ffffff'>[E24] Essence-Level Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>Upgrade effect softcapped after /10."},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C4C4C4',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#FFFFFF',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    challenges: {

    },
    buyables: {
        rows: 5,
        cols: 4,
        1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.23);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(1).plus(1) },
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
                let max = player.points.div(this.cost(0)).add(0.0010).log(1.23) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 1))) setBuyableAmount('Essence', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 100%"},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Essence", 12) && !player.Essence.accumulatorImprovements.gte('1')},
    
        },
        2: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^2</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.23);
                let cost = base.pow(x).times(0.0015);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Essence', 2).mul(1.50).plus(1)
                return eff
            },               
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(15)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0015).log(1.23) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 2))) setBuyableAmount('Essence', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^2</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 150%"},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('1') && !player.Essence.accumulatorImprovements.gte('2') },
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^3</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.17);
                let cost = base.pow(x).times(0.0020);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Essence', 3).mul(2).plus(1)
                return eff
            },               
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0020).log(1.17) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 3))) setBuyableAmount('Essence', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^3</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 200%"},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('2') && !player.Essence.accumulatorImprovements.gte('3') },
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^4</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.45);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
              effect() { 
                        return getBuyableAmount('Essence', 4).pow_base(1.25) },         
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(15)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0010).log(1.45) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 4))) setBuyableAmount('Essence', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^4</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 25%, compounding."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('3') && !player.Essence.accumulatorImprovements.gte('4') },
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^5</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.35);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
                effect() {
               let amt = getBuyableAmount("Essence", 5)  
               let base = new Decimal(1).add(amt.mul(1))
               let bonus = Decimal.pow(2, Math.floor(amt / 10))
               return base.times(bonus) 
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
                let max = player.points.div(this.cost(0)).add(0.0010).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 5))) setBuyableAmount('Essence', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^5</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 100%. Every ten purchases, this effect is doubled."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('4') && !player.Essence.accumulatorImprovements.gte('5') },
    
        },
        6: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^6</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.0050);
                return cost;
              },
                effect() {
               let amt = getBuyableAmount("Essence", 6)  
               let base = new Decimal(1).add(amt.mul(0.50))
               let bonus = Decimal.pow(2, Math.floor(amt / 10))
               return base.times(bonus) 
               },       
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(30)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0020).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 6))) setBuyableAmount('Essence', 6, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^6</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 50%. Every ten purchases, this effect is doubled."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('5') && !player.Essence.accumulatorImprovements.gte('6') },
    
        },
        7: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^7</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.0065);
                return cost;
              },
                effect() {
               let amt = getBuyableAmount("Essence", 7)  
               let base = new Decimal(1).add(amt.mul(0.60))
               let bonus = Decimal.pow(2, Math.floor(amt / 10))
               return base.times(bonus) 
               },       
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(45)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0065).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 7))) setBuyableAmount('Essence', 7, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^7</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 60%. Every ten purchases, this effect is doubled."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('6') && !player.Essence.accumulatorImprovements.gte('7') },
    
        },
        8: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^8</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
                effect() {
               let amt = getBuyableAmount("Essence", 8)  
               let base = new Decimal(1).add(amt.mul(0.75))
               let bonus = Decimal.pow(2, Math.floor(amt / 10))
               return base.times(bonus) 
               },       
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(60)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 7))) setBuyableAmount('Essence', 7, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^8</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 75%. Every ten purchases, this effect is doubled."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('7') && !player.Essence.accumulatorImprovements.gte('8') },
    
        },
        9: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Accumulator^9</b>
                <font size="2">Which boosts Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect1) + `x,</b><br>and divides Level requirement by /` +format(tmp[this.layer].buyables[this.id].effect2) + `<br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.0150);
                return cost;
              },
                effect1() {
               let amt = getBuyableAmount("Essence", 9)  
               let base = new Decimal(1).add(amt.mul(0.95))
               let bonus = Decimal.pow(2, Math.floor(amt / 10))
               return base.times(bonus) 
               },   
               effect2() {
                let eff = getBuyableAmount('Essence', 9).mul(0.20).plus(1)
                return eff
            },     
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(150)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0150).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Essence', 9))) setBuyableAmount('Essence', 9, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Accumulator^9</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence by 95%, and divides Level requirement by /20%. Every ten purchases, the effect to Essence is doubled."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "150px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "150px",
                'background-color':'#FFFFFF', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() { return player.Essence.accumulatorImprovements.gte('8') && !player.Essence.accumulatorImprovements.gte('9') },
    
        },
    },
    clickables: {
         1: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator to improve it's effect and purchase cap.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator --> Accumulator^2)`},
            canClick() { return getBuyableAmount("Essence", 1).gte(10) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 1).gte(10) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
         2: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator to improve it's effect and purchase cap.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^2 --> Accumulator^3)`},
            canClick() { return getBuyableAmount("Essence", 2).gte(15) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 2).gte(15) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        3: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator. Change the accumulator's effect, but unlock new Essence upgrades.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^3 --> Accumulator^4)`},
            canClick() { return getBuyableAmount("Essence", 3).gte(20) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 3).gte(20) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        4: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator. Set the accumulator's effect back to the first one's, but it gains a new effect that helps it scale faster.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^4 --> Accumulator^5)`},
            canClick() { return getBuyableAmount("Essence", 4).gte(15) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 4).gte(15) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        5: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator. Weaken the accumulator's effect, but unlock more new Essence upgrades.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^5 --> Accumulator^6)`},
            canClick() { return getBuyableAmount("Essence", 5).gte(25) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 5).gte(25) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        6: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator to improve it's effect and purchase cap.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^6 --> Accumulator^7)`},
            canClick() { return getBuyableAmount("Essence", 6).gte(30) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 6).gte(30) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        7: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator to improve it's effect and purchase cap.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^7 --> Accumulator^8)`},
            canClick() { return getBuyableAmount("Essence", 7).gte(45) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 7).gte(45) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        8: {
            title() { return `<font size="5"> Improve the Accumulator<br>――――――――――――――――――<br><font size="3">Resets Essence amount and the accumulator to improve it's effect and purchase cap. It will also gain a bonus effect that divides the Level requirement.<font size="5"><br>――――――――――――――――――<br><font size="3">(Accumulator^8 --> Accumulator^9)`},
            canClick() { return getBuyableAmount("Essence", 8).gte(60) && hasUpgrade("Essence", 13) },
            unlocked() { return getBuyableAmount("Essence", 8).gte(60) && hasUpgrade("Essence", 13)  },
            onClick() {
                layers.Essence.accumulatorMiniReset()
                player.Essence.accumulatorImprovements = player.Essence.accumulatorImprovements.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
          },
     tabFormat: {
        "Incremental Origin": {
        style() {return  {'background-color': '#0f0f0f'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Essence'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            ["raw-html", function() {if (hasUpgrade("Essence", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+"/s)"}, {"font-size": "30px"}],                  
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],  ]]]],
                    ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24],  ]]]],
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                    ["column", [ ["row", [ ["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4], ["buyable", 5], ["buyable", 6], ["buyable", 7], ["buyable", 8], ["buyable", 9],]]]],
                    ["raw-html", function() {if (getBuyableAmount("Essence", 1).gte(10) && hasUpgrade("Essence", 13)  || (getBuyableAmount("Essence", 2).gte(15)) || (getBuyableAmount("Essence", 3).gte(20)) || (getBuyableAmount("Essence", 4).gte(15)) || (getBuyableAmount("Essence", 5).gte(25) || (getBuyableAmount("Essence", 6).gte(30)) ||  (getBuyableAmount("Essence", 7).gte(45)) || (getBuyableAmount("Essence", 8).gte(60)))) return '―――――――――――――――――――――――――――――'}, {"color": "#FFFFFF", "font-size": "23px"}],
                    ["row", [["clickable", 1]]],
                    ["row", [["clickable", 2]]],
                    ["row", [["clickable", 3]]],
                    ["row", [["clickable", 4]]],
                    ["row", [["clickable", 5]]],
                    ["row", [["clickable", 6]]],
                    ["row", [["clickable", 7]]],
                    ["row", [["clickable", 8]]],
                ]
            
        },
    },
})