addLayer("Gold", {
    name: "Gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "💰", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone("Money", 2) || player.Gold.goldResetAmount.gte('1')},
		goldBars: new Decimal(0),
        goldToGet: new Decimal(0),
        goldResetAmount: new Decimal(0),
        bestGold: new Decimal(1)
    }},
    color: "#FFE77D",
    nodeStyle() {
        return {
            "background": "linear-gradient(90deg, #FFE77D, #EBCB3F)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    branches: ["Money"],
    baseAmount() {return player.points}, // Get the current amount of baseResource
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Gold<br>――――――――――――――<br> <font size='2'><span style='color:#FFE77D'> " +format(player.Gold.goldBars)+" Gold Bars</span>"
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
    layerShown(){return hasMilestone("Money", 2) || player.Gold.goldResetAmount.gte('1')},
    automate() {
        if (getBuyableAmount("Factory", 3).gte(1)) buyMaxBuyable('Gold', 1)
        if (getBuyableAmount("Factory", 3).gte(2)) buyMaxBuyable('Gold', 2)
        if (getBuyableAmount("Factory", 3).gte(3)) buyMaxBuyable('Gold', 3)
        if (getBuyableAmount("Factory", 3).gte(4)) buyMaxBuyable('Gold', 4)
        if (getBuyableAmount("Factory", 3).gte(5)) buyMaxBuyable('Gold', 5)
        if (getBuyableAmount("Factory", 3).gte(6)) buyMaxBuyable('Gold', 6)

    },
    update(delta) {
        let onepersec = new Decimal(1)
        //Get Best Gold
        if (player.Gold.bestGold.lt(player.Gold.goldBars)) player.Gold.bestGold = player.Gold.goldBars
        //Gold Gain
        player.Gold.goldToGet = player.Money.dollars.div(5000).pow(0.4)
        //Bonuses
        if (getBuyableAmount("Factory", 3).gte(1)) player.Gold.goldToGet = player.Gold.goldToGet.times(4)
        //Buyables
        player.Gold.goldToGet = player.Gold.goldToGet.mul(buyableEffect("Gold", 4))
        player.Gold.goldToGet = player.Gold.goldToGet.mul(buyableEffect("Money", 5))
        player.Gold.goldToGet = player.Gold.goldToGet.mul(buyableEffect("Factory", 11))
        //Layer Effects
        if (hasMilestone('Factory', 10)) player.Gold.goldToGet = player.Gold.goldToGet.mul(tmp.BeanTier.goldEffect)
        if (hasMilestone('Factory', 4)) player.Gold.goldToGet = player.Gold.goldToGet.times(tmp.Factory.milestones[4].effect)
        if (hasMilestone('Factory', 1006)) player.Gold.goldToGet = player.Gold.goldToGet.times(tmp.Factory.milestones[1006].effect)
        //Gold Generation
        player.Gold.goldBars = player.Gold.goldBars.add(player.Gold.goldToGet.mul(buyableEffect("Factory", 4).mul(delta)))

    },
    goldReset()
    {
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)

     player.Money.dollars = new Decimal(0)
     
     if (!hasMilestone("Factory", 3)) player.Beans.milestones.splice(0, player.Beans.milestones.length)

     if (!hasMilestone("Factory", 3)) player.Money.milestones.splice(0, player.Money.milestones.length)

     if (!hasMilestone("Gold", 0) && !hasMilestone("Factory", 4)) player.Money.upgrades.splice(0, player.Money.upgrades.length)

    for (let i in player.Beans.buyables) {
         player.Beans.buyables[i] = new Decimal(0)
    }

    for (let i in player.Money.buyables) {
         player.Money.buyables[i] = new Decimal(0)
    }

    },
    milestones: {
        0: {
        requirementDescription: "<font size='3'><b>4 Gold Bars</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Keep previous Money automation upgrades on the next Gold resets.</span>'},
        done() {return player.Gold.goldBars.gte(4)},
        unlocked() {return true},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1: {
        requirementDescription: "<font size='3'><b>6 Gold Bars</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Keep Bean milestones on Money reset.</span>'},
        done() {return player.Gold.goldBars.gte(6)},
        unlocked() {return hasMilestone("Gold", 0)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    2: {
        requirementDescription: "<font size='3'><b>15 Gold Bars</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock new Money upgrades.</span>'},
        done() {return player.Gold.goldBars.gte(15)},
        unlocked() {return hasMilestone("Gold", 1)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    3: {
        requirementDescription: "<font size='3'><b>1,000 Gold Bars</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock a new Gold upgrade that enables Money generation. <br>Interest can be bought 10 more times.</span>'},
        done() {return player.Gold.goldBars.gte(1000)},
        unlocked() {return hasMilestone("Gold", 2)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    4: {
        requirementDescription: "<font size='3'><b>5,000 Gold Bars</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks the next reset layer.</span>'},
        done() {return player.Gold.goldBars.gte(5000)},
        unlocked() {return hasMilestone("Gold", 3)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    },
    upgrades: {        
        11: {
            title: "Bean Automation IV",
            fullDisplay() {return `<font size="2"><b>Bean Automation IV</b><font size="1"><br>Autobuys Valuable Beans without spending any Beans.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Gold Bars`},        
            unlocked() { return true },
            currencyLocation() { return player.Gold },
            currencyInternalName: "goldBars",
            cost: new Decimal(60),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
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
                'background-color': '#EBCB3F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            title: "Money Automation I",
            fullDisplay() {return `<font size="2"><b>Money Automation I</b><font size="1"><br>Autobuys Farming Gear without spending any Money.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Gold Bars`},        
            unlocked() { return hasUpgrade("Gold", 11)},
            currencyLocation() { return player.Gold },
            currencyInternalName: "goldBars",
            cost: new Decimal(150),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
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
                'background-color': '#EBCB3F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            title: "Money Automation II",
            fullDisplay() {return `<font size="2"><b>Money Automation II</b><font size="1"><br>Autobuys Farming Experience and Interest without spending any Money.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Gold Bars`},        
            unlocked() { return hasUpgrade("Gold", 12)},
            currencyLocation() { return player.Gold },
            currencyInternalName: "goldBars",
            cost: new Decimal(1500),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
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
                'background-color': '#EBCB3F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            title: "Money Automation III",
            fullDisplay() {return `<font size="2"><b>Money Automation III</b><font size="1"><br>Autobuys Tractors without spending any Money.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Gold Bars`},        
            unlocked() { return hasUpgrade("Gold", 13)},
            currencyLocation() { return player.Gold },
            currencyInternalName: "goldBars",
            cost: new Decimal(2000),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
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
                'background-color': '#EBCB3F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },            
    },
    buyables: {
        1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Golden Beans</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.250);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Gold", 1)  
               let base = new Decimal(1).add(amt.mul(0.75))
               let bonus = Decimal.pow(1.35, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(250)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(0.250).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 1))) setBuyableAmount('Gold', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Golden Beans</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 75%. Every ten purchases, this effect is boosted by 1.35x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return true},
    
        },
        2: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Golden Dollars</b>
                <font size="2">Which boost Money gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.55);
                let cost = base.pow(x).times(0.250);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Gold", 2)  
               let base = new Decimal(1).add(amt.mul(0.25))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(0.250).log(1.55) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 2))) setBuyableAmount('Gold', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Golden Dollars</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Money gain by 25%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return true},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Golden Levels</b>
                <font size="2">Which boost Bean Level effect by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(100);
                let cost = base.pow(x).times(2.50);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Gold', 3).mul(0.50).plus(1)
                return eff
            },   
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(3)
                if (hasMilestone("Factory", 9)) cap = cap.times(10)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(2.50).log(100) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 3))) setBuyableAmount('Gold', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Golden Levels</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean Level effect by 50%."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return true},
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Golden Gold</b>
                <font size="2">Which boost Gold Bar gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.20);
                let cost = base.pow(x).times(2);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Gold", 4)  
               let base = new Decimal(1).add(amt.mul(0.15))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(30)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(2).log(1.20) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 4))) setBuyableAmount('Gold', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Golden Gold</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Gold gain by 15%. Every five purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return true},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Money Printers</b>
                <font size="2">Which generate ` + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + `% of Money gain per second</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(500);
                return cost;
              },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(500).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 5))) setBuyableAmount('Gold', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Money Printer</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Buying this will also disable the ability to perform the Money reset."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Gold", 3)},
    
        },
        6: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Golden TP</b>
                <font size="2">Which boost TP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(1);
                return cost;
              },
            effect(x) { return getBuyableAmount('Gold', 6).pow_base(2) },
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Gold.goldBars.div(this.cost(0)).add(1).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Gold', 6))) setBuyableAmount('Gold', 6, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Golden TP</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Doubles TP gain with every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(70deg, #FFE77D, #EBCB3F)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 4)},
    
        },
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Purchase precious Gold using your money.<br><font size='4'>(Requires 10,000$)" },
            canClick() { return player.Money.dollars.gte(10000)},
            unlocked() { return !getBuyableAmount("Factory", 4).gte(1) },
            onClick() {
                layers.Gold.goldReset()
                player.Gold.goldBars = player.Gold.goldBars.add(player.Gold.goldToGet)
                player.Gold.goldResetAmount = player.Gold.goldResetAmount.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px' },
        },
    },
     tabFormat: {
        "Gold Vault": {
        style() {return  {'background-color': '#403605'}},
        content: [
        ["display-text",
            function() {return ''+format(player.Gold.goldBars)+' Gold Bars'},
            {"color": "#EBCB3F", "font-size": "30px"}],
                        ["raw-html", function() {if (player.Money.dollars.gte(10000) && !getBuyableAmount("Factory", 4).gte(1)) return "(+" + format(player.Gold.goldToGet) + ")"}, {"color": "#FFE77D", "font-size": "20px"}],
                        ["raw-html", function() {if (getBuyableAmount("Factory", 4).gte(1) && player.Money.dollars.gte(10000)) return "(+" + format(player.Gold.goldToGet.mul(buyableEffect("Factory", 4))) + "/s)"}, {"color": "#FFE77D", "font-size": "20px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#EBCB3F", "font-size": "32px"}],
                    "blank",
                    ["row", [["clickable", 1]]],
                    "blank",
                           ["microtabs", "GoldTabs"],

                ]
            
        },
    },
        microtabs: {
            GoldTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#EBCB3F", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank",  ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5], "blank", ["buyable", 6]]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#EBCB3F", "font-size": "32px"}],                        
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14],]]]],
                    "blank",
                    ]
                },
                "Milestones": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#EBCB3F", "font-size": "32px"}],
                        "blank",
                        "milestones",
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#EBCB3F", "font-size": "32px"}],

                    ]
                },
            }
        },
})