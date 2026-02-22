addLayer("Money", {
    name: "Money", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone("Beans", 3) || player.Money.moneyResetAmount.gte('1')},
		dollars: new Decimal(0),
        moneyToGet: new Decimal(0),
        moneyResetAmount: new Decimal(0),
        bestMoney: new Decimal(1)
    }},
    color: "#1BC42F",
    nodeStyle() {
        return {
            "background": "linear-gradient(20deg, #C7FF9E, #81F72D)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    branches: ["Beans"],
    autoUpgrade() {return hasUpgrade('Beans', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    tooltip() {
        let tooltip = "<font size='3'>Money<br>――――――――――――――<br> <font size='2'><span style='color:#81F72D'> "+format(player.Money.dollars)+"$</span>"
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
    layerShown(){return hasMilestone("Beans", 3) || player.Money.moneyResetAmount.gte('1')},
    automate() {
        if (hasUpgrade('Gold', 12) || (hasMilestone("Factory", 5))) buyMaxBuyable('Money', 1)
        if (hasUpgrade('Gold', 13) || (hasMilestone("Factory", 5))) buyMaxBuyable('Money', 2)
        if (hasUpgrade('Gold', 13) || (hasMilestone("Factory", 5))) buyMaxBuyable('Money', 3)
        if (hasUpgrade('Gold', 14) || (hasMilestone("Factory", 5))) buyMaxBuyable('Money', 4)
        if (hasMilestone("Factory", 5)) buyMaxBuyable('Money', 5)
        if (hasMilestone("Factory", 7)) buyMaxBuyable('Money', 6)
    },
   update(delta) {
        let onepersec = new Decimal(1)
        
        //Get Best Money
        if (player.Money.bestMoney.lt(player.Money.dollars)) player.Money.bestMoney = player.Money.dollars
        //Base Money Gain
        player.Money.moneyToGet = player.points.div(250).pow(0.5)
        //Buyables
        player.Money.moneyToGet = player.Money.moneyToGet.mul(buyableEffect("Money", 3))
        player.Money.moneyToGet = player.Money.moneyToGet.mul(buyableEffect("Beans", 5))
        player.Money.moneyToGet = player.Money.moneyToGet.mul(buyableEffect("Gold", 2))
        player.Money.moneyToGet = player.Money.moneyToGet.mul(buyableEffect("Factory", 6))
        //Layer Effects/Milestones
        if (player.Factory.total.gte(1)) player.Money.moneyToGet = player.Money.moneyToGet.mul(tmp.BeanTier.moneyEffect)
        if (hasMilestone('Factory', 3)) player.Money.moneyToGet = player.Money.moneyToGet.times(tmp.Factory.milestones[3].effect)
        if (hasMilestone('Factory', 1005)) player.Money.moneyToGet = player.Money.moneyToGet.times(tmp.Factory.milestones[1005].effect)
        //Money Generation
        player.Money.dollars = player.Money.dollars.add(player.Money.moneyToGet.mul(buyableEffect("Gold", 5).mul(delta)))
    },
    moneyReset()
    {
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)
     
     if (!hasMilestone("Gold", 1) && !hasMilestone("Factory", 7)) player.Beans.milestones.splice(0, player.Beans.milestones.length)

    for (let i in player.Beans.buyables) {
         player.Beans.buyables[i] = new Decimal(0)
    }

    },
    milestones: {
        0: {
        requirementDescription: "<font size='3'><b>15$</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks a new Bean upgrade that boosts the Bean Level effect.</span>'},
        done() {return player.Money.dollars.gte(15)},
        unlocked() {return true},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C7FF9E',
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
        requirementDescription: "<font size='3'><b>125$</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks a new Bean upgrade that boosts Money gain.</span>'},
        done() {return player.Money.dollars.gte(125)},
        unlocked() {return hasMilestone("Money", 0)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C7FF9E',
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
        requirementDescription: "<font size='3'><b>10,000$</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks the second reset layer.</span>'},
        done() {return player.Money.dollars.gte(10000)},
        unlocked() {return hasMilestone("Money", 1)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C7FF9E',
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
            title: "Bean Automation I",
            fullDisplay() {return `<font size="2"><b>Bean Automation I</b><font size="1"><br>Autobuys Bean Booster I without spending any Beans.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`$`},        
            unlocked() { return true },
            currencyLocation() { return player.Money },
            currencyInternalName: "dollars",
            cost: new Decimal(25),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C7FF9E',
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
                'background-color': '#1BC42F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },    
        12: {
            title: "Bean Automation II",
            fullDisplay() {return `<font size="2"><b>Bean Automation II</b><font size="1"><br>Autobuys Bean Booster II without spending any Beans.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`$`},        
            unlocked() { return hasUpgrade("Money", 11) },
            currencyLocation() { return player.Money },
            currencyInternalName: "dollars",
            cost: new Decimal(2500),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C7FF9E',
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
                'background-color': '#1BC42F',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            title: "Bean Automation III",
            fullDisplay() {return `<font size="2"><b>Bean Automation III</b><font size="1"><br>Autobuys Bean Level Booster and Bean Level Enhancer without spending any Beans.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`$`},        
            unlocked() { return hasUpgrade("Money", 12) },
            currencyLocation() { return player.Money },
            currencyInternalName: "dollars",
            cost: new Decimal(5000),
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C7FF9E',
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
                'background-color': '#1BC42F',
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Farming Gear</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.250);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 1)  
               let base = new Decimal(1).add(amt.mul(0.40))
               let bonus = Decimal.pow(1.5, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                cap=cap.times(buyableEffect('Factory', 5))
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(0.250).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 1))) setBuyableAmount('Money', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Farming Gear</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 40%. Every ten purchases, this effect is boosted by 1.50x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Farming Experience</b>
                <font size="2">Which divide Bean Level requirement by /` +format(tmp[this.layer].buyables[this.id].effect) + `</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.55);
                let cost = base.pow(x).times(0.50);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 2)  
               let base = new Decimal(1).add(amt.mul(0.15))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                cap=cap.times(buyableEffect('Factory', 5))
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(0.50).log(1.55) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 2))) setBuyableAmount('Money', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Farming Experience</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Reduces Bean Level requirement by 15%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Interest</b>
                <font size="2">Which boost Money gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.20);
                let cost = base.pow(x).times(2.50);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 3)  
               let base = new Decimal(1).add(amt.mul(0.15))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(30)
                if (hasMilestone('Gold', 3)) cap = cap.times(1.33)
                cap=cap.times(buyableEffect('Factory', 5))
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(0.50).log(1.20) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 3))) setBuyableAmount('Money', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Interest</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Money gain by 15%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Tractors</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.40);
                let cost = base.pow(x).times(100);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 4)  
               let base = new Decimal(1).add(amt.mul(0.05))
               let bonus = Decimal.pow(1.05, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(100).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 4))) setBuyableAmount('Money', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Tractors</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 5%. Every ten purchases, this effect is boosted by 1.05x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Gold", 2)},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gold Bids</b>
                <font size="2">Which boost Gold Bars by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(10000);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 5)  
               let base = new Decimal(1).add(amt.mul(0.01))
               let bonus = Decimal.pow(1.01, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(10000).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 5))) setBuyableAmount('Money', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gold Bids</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Gold Bars gain by 1%. Every ten purchases, this effect is boosted by 1.01x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Gold", 2)},
    
        },
        6: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Tier Boosters</b>
                <font size="2">Which boost TP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(1e6);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Money", 6)  
               let base = new Decimal(1).add(amt.mul(0.10))
               let bonus = Decimal.pow(1.05, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Money.dollars.gte(this.cost())) {return true}},
            buy() {
                player.Money.dollars = player.Money.dollars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Money.dollars.div(this.cost(0)).add(1e6).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Money', 6))) setBuyableAmount('Money', 6, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Tier Boosters</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts TP gain by 10%. Every ten purchases, this effect is boosted by 1.05x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C7FF9E', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 5)},
    
        },
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Sell your Beans for Money.<br><font size='4'>(Requires Bean Level 22 and 250 Beans)" },
            canClick() { return player.Money.moneyToGet.gte(1) && player.BeanLevel.points.gte(22)},
            unlocked() { return !getBuyableAmount("Gold", 5).gte(1) },
            onClick() {
                layers.Money.moneyReset()
                player.Money.dollars = player.Money.dollars.add(player.Money.moneyToGet)
                player.Money.moneyResetAmount = player.Money.moneyResetAmount.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
    },
     tabFormat: {
        "Bank": {
        style() {return  {'background-color': '#051407'}},
        content: [
        ["display-text",
            function() {return ''+format(player.Money.dollars)+'$'},
            {"color": "#1BC42F", "font-size": "30px"}],
                        ["raw-html", function() {if (player.points.gte(250) && !getBuyableAmount("Gold", 5).gte(1)) return "(+" + format(player.Money.moneyToGet) + "$)"}, {"color": "#1B9E2A", "font-size": "20px"}],
                        ["raw-html", function() {if (getBuyableAmount("Gold", 5).gte(1) && player.points.gte(250)) return "(+" + format(player.Money.moneyToGet.mul(buyableEffect("Gold", 5))) + "$/s)"}, {"color": "#1B9E2A", "font-size": "20px"}],
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],
                    "blank",
                    ["row", [["clickable", 1]]],
                    "blank",
                           ["microtabs", "MoneyTabs"],

                ]
            
        },
    },
        microtabs: {
            MoneyTabs: {
                "Info": {
                    content: [
                        ["display-text",
                    function() {return "――――――Layer 1 Reset――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],
                    ["display-text",
                    function() {return "Selling Beans resets Beans, Bean Upgrades, Bean Milestones and Bean Levels in exchange for Cash to spend on new upgrades which will allow you to get back to where you were faster than before."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],                        
                    ]
                },
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank",  ["buyable", 4], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 5],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 3], "blank", ["buyable", 6],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],                        
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ]]]],
                    "blank",
                    ]
                },
                "Milestones": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],
                        "blank",
                        "milestones",
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#1BC42F", "font-size": "32px"}],

                    ]
                },
            }
        },
})