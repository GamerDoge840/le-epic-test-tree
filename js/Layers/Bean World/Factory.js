addLayer("Factory", {
    name: "Factory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏭", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone("Gold", 4) || player.Factory.factoryResetAmount.gte('1')},
		points: new Decimal(0),
        factoryResetAmount: new Decimal(0),
        ironResetAmount: new Decimal(0),
        bestFactoryLevel: new Decimal(0.1),
        ironPlates: new Decimal(0),
        ironPlateGain: new Decimal(0),
        bestIronPlates: new Decimal(0),
    }},
    color: "#5E5D5D",
    nodeStyle() {
        return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e14"), // Can be a function that takes requirement increases into account
    resource: "Factory Level", // Name of prestige currency
    baseResource: "Beans", // Name of resource prestige is based on
    resetDescription: "Expend your Bean empire to grow the factory.<br>―――――――――――<br>",
    branches: ["Gold"],
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>The Factory<br>――――――――――――――<br> <font size='2'><span style='color:#5E5D5D'> Factory Level " +formatWhole(player.Factory.points)+"</span>"
        if(player.Factory.ironResetAmount.gte('1')) tooltip = tooltip + "<br><font size='2'><span style='color:#BABABA'>"+format(player.Factory.ironPlates)+" Iron Plates</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        //Manual Requirement Scaling
        if (player.Factory.points.gte(1) && player.Factory.points.lte(2)) mult = mult.times(25)
        if (player.Factory.points.gte(2) && player.Factory.points.lte(3)) mult = mult.times(75)
        if (player.Factory.points.gte(3) && player.Factory.points.lte(4)) mult = mult.times(4)
        if (player.Factory.points.gte(4) && player.Factory.points.lte(5)) mult = mult.times(1.92)
        if (player.Factory.points.gte(5) && player.Factory.points.lte(6)) mult = mult.dividedBy(6.43)
        if (player.Factory.points.gte(6) && player.Factory.points.lte(7)) mult = mult.dividedBy(35)
        if (player.Factory.points.gte(7) && player.Factory.points.lte(8)) mult = mult.dividedBy(15000)
        if (player.Factory.points.gte(8) && player.Factory.points.lte(9)) mult = mult.dividedBy(7500)
        if (player.Factory.points.gte(9) && player.Factory.points.lte(10)) mult = mult.dividedBy(25000000)
        if (player.Factory.points.gte(10) && player.Factory.points.lte(11)) mult = mult.dividedBy(500000)
        if (player.Factory.points.gte(11) && player.Factory.points.lte(12)) mult = mult.dividedBy(1e11)
        if (player.Factory.points.gte(12) && player.Factory.points.lte(13)) mult = mult.dividedBy(4e4)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("Gold", 4) || player.Factory.factoryResetAmount.gte('1')},
    update(delta){
        //Best Factory Level and Plates
        if (player.Factory.bestFactoryLevel.lt(player.Factory.points)) player.Factory.bestFactoryLevel = player.Factory.points
        if (player.Factory.bestIronPlates.lt(player.Factory.ironPlates)) player.Factory.bestIronPlates = player.Factory.ironPlates

        //Get base Iron Plate gain
        player.Factory.ironPlateGain = player.points.div(1e22).pow(0.5)

        //Iron Plate Effect Boosts
        if (hasMilestone('Factory', 8)) player.Factory.ironPlateGain = player.Factory.ironPlateGain.times(tmp.Factory.milestones[8].effect)
    },
    milestones: {
        0: {
        requirementDescription: "<font size='3'><b>(FL1) Bean Enhancement</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock Bean Tiers (in the Beans layer).</span>'},
        done() {return player.Factory.points.gte(1)},
        unlocked() {return true},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
        requirementDescription: "<font size='3'><b>(FL2) Bean Enhancement II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Bean Booster I can be bought 50 more times.</span>'},
        done() {return player.Factory.points.gte(2)},
        unlocked() {return hasMilestone("Factory", 0)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
        requirementDescription: "<font size='3'><b>(FL3) Bean Factory</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Boost Bean gain by 50% for each Factory Level.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(3)},
        unlocked() {return hasMilestone("Factory", 1)},
        effect() {
                let eff = player.Factory.points.mul(0.50).plus(1);
                return eff;
            },  
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
        requirementDescription: "<font size='3'><b>(FL4) Money Factory</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Boost Money gain by 25% for each Factory Level.<br>Always keep Bean and Money milestones on Gold reset.<br>Bean Level Booster can be bought 50 more times.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(4)},
        unlocked() {return hasMilestone("Factory", 2)},
        effect() {
                let eff = player.Factory.points.mul(0.25).plus(1);
                return eff;
            },  
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
        requirementDescription: "<font size='3'><b>(FL5) Gold Factory</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Boost Gold gain by 5% for each Factory Level.<br>Always keep Money automation upgrades on Gold reset.<br>Unlock a new Gold upgrade that boosts TP.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(5)},
        unlocked() {return hasMilestone("Factory", 3)},
        effect() {
                let eff = player.Factory.points.mul(0.05).plus(1);
                return eff;
            },  
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    5: {
        requirementDescription: "<font size='3'><b>(FL6) Money Factory II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. The first five Money upgrades are always automated.<br>Bean Level Enhancer can be bought 20 more times.<br>Unlock a new Money upgrade that boosts TP gain.</span>'},
        done() {return player.Factory.points.gte(6)},
        unlocked() {return hasMilestone("Factory", 4)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    6: {
        requirementDescription: "<font size='3'><b>(FL7) Iron Factory</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Unlock the Forge Iron reset (In this layer).</span>'},
        done() {return player.Factory.points.gte(7)},
        unlocked() {return hasMilestone("Factory", 5)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    7: {
        requirementDescription: "<font size='3'><b>(FL8) Get Rid of Those Annoying Milestone Popups</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Keep all previous milestones on Layer 3 resets.<br>Keep Bean milestones on Money reset and automate the Tier Booster Money upgrade.</span>'},
        done() {return player.Factory.points.gte(8)},
        unlocked() {return hasMilestone("Factory", 6)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    8: {
        requirementDescription: "<font size='3'><b>(FL9) Iron Factory II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Each Factory Level past 8 boosts Iron Plate gain by 1.25x compounding (Capped at a 10x boost).<br>Unlock new Iron Plate upgrades related to Gold automation.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(9)},
        unlocked() {return hasMilestone("Factory", 7)},
        effect() {
                let eff = new Decimal(1.25).pow(player.Factory.points.sub(8)).max(1)
                return eff.min(10);
            },  
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    9: {
        requirementDescription: "<font size='3'><b>(FL10) Bean Enhancement III</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">TP Requirement of Bean Tiers scales 20% slower. Golden Levels can be bought 10x as many times.<br>Unlock more Iron Plate upgrades related to Money.</span>'},
        done() {return player.Factory.points.gte(10)},
        unlocked() {return hasMilestone("Factory", 8)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    10: {
        requirementDescription: "<font size='3'><b>(FL11) Bean Enhancement IV</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Bean Tier boost to Money is 2x stronger. Bean Tiers gain a third effect that boosts Gold.<br>Unlock new Iron Plate upgrades related to Bean Tiers.</span>'},
        done() {return player.Factory.points.gte(11)},
        unlocked() {return hasMilestone("Factory", 9)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    11: {
        requirementDescription: "<font size='3'><b>(FL12) Bean Enhancement V</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Bean Level Enhancer can be bought twice as many times. Unlock one powerful new Iron Plate upgrade.</span>'},
        done() {return player.Factory.points.gte(12)},
        unlocked() {return hasMilestone("Factory", 10)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
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
    },
    buyables: {
        1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Hydroponics Basins</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.100);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 1)  
               let base = new Decimal(1).add(amt.mul(0.50))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(0.100).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 1))) setBuyableAmount('Factory', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Hydroponics Basins</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 50%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 6)},
    
        },
        2: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Sprinklers</b>
                <font size="2">Boosting purchase caps of first two Bean Upgrades by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(3);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("Factory", 2).mul(0.20).plus(1)
                return eff
            },   
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(3).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 2))) setBuyableAmount('Factory', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Sprinklers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Increases the maximum purchase caps of Bean Booster and Bean Level booster by 20% each level."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 6)},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gold Automators</b>
                <font size="2">Which autobuy the first ` +formatWhole(getBuyableAmount(this.layer, this.id), 0)+ ` Gold upgrades</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(5);
                return cost;
              },
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(6)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(5).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 3))) setBuyableAmount('Factory', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gold Automators</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase enables automation of another of the first six Gold upgrades"},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 8)},
    
        },
         4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gold Miners</b>
                <font size="2">Which generate  ` + formatWhole(tmp[this.layer].buyables[this.id].effect.mul(100)) + `% of Gold gain per second</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(200);
                return cost;
              },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01) },
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(200).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 4))) setBuyableAmount('Factory', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gold Miners</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>First purchase quadruples Gold gain as a bonus. Buying this will also disable the ability to perform the Gold reset."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 8)},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Suitcases</b>
                <font size="2">Boosting purchase caps of first three Money Upgrades by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(100);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("Factory", 5).mul(0.20).plus(1)
                return eff
            },   
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(4)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(3).log(100) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 5))) setBuyableAmount('Factory', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Suitcases</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Increases the maximum purchase caps of Farming Gear, Farming Experience, and Interest by 20%."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 9)},
    
        },
        6: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Paper Factories</b>
                <font size="2">Which boost Money gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(100);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 6)  
               let base = new Decimal(1).add(amt.mul(0.25))
               let bonus = Decimal.pow(1.15, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(100).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 6))) setBuyableAmount('Factory', 6, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Paper Factories</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Money gain by 25%. Every ten purchases, this effect is boosted by 1.15x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 9)},
    
        },
        7: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Tier Enhancers</b>
                <font size="2">Which increase Bean Tier exponent by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(3);
                let cost = base.pow(x).times(1000);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("Factory", 7).mul(0.02).plus(1)
                return eff
            },   
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(1000).log(3) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 7))) setBuyableAmount('Factory', 7, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Tier Enhancers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Increases Bean Tier exponent by 2% each purchase, reducing amount of TP needed for next tier."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 10)},
    
        },
        8: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Iron TP</b>
                <font size="2">Which boost TP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.45);
                let cost = base.pow(x).times(5000);
                return cost;
              },
            effect(x) { return getBuyableAmount('Factory', 8).pow_base(1.15) }, 
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(5000).log(1.45) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 8))) setBuyableAmount('Factory', 8, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Iron TP</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts TP gain by 1.15x compounding."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 10)},
    
        },
        9: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Greenhouses</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(10000);
                return cost;
              },
            effect(x) { return getBuyableAmount('Factory', 9).pow_base(1.15) }, 
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(10000).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 9))) setBuyableAmount('Factory', 9, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Greenhouses</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Beans gain by 1.15x compounding each purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 11)},
    
        },
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Forge Iron for Iron Plates based on Beans.<br><font size='4'>(Requires 1e22 Beans)" },
            canClick() { return player.points.gte(1e22)},
            unlocked() { return hasMilestone("Factory", 6) },
            onClick() {
                layers.Factory.ironReset()
                player.Factory.ironPlates = player.Factory.ironPlates.add(player.Factory.ironPlateGain)
                player.Factory.ironResetAmount = player.Factory.ironResetAmount.add(1)
            },
            style: { "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
               "width": "350px",
                "height": "125px",
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",},
        },
    },
    onPrestige(){
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)

     player.BeanTier.points = new Decimal(0)

     player.BeanTier.tierPoints = new Decimal(0)

     player.Money.dollars = new Decimal(0)

     player.Gold.goldBars = new Decimal(0)
     
     if (!hasMilestone("Factory", 7)) player.Beans.milestones.splice(0, player.Beans.milestones.length)

     if (!hasMilestone("Factory", 7)) player.Money.milestones.splice(0, player.Money.milestones.length)

     if (!hasMilestone("Factory", 5)) player.Money.upgrades.splice(0, player.Money.upgrades.length)

     if (!hasMilestone("Factory", 7)) player.Gold.milestones.splice(0, player.Gold.milestones.length)

     if (!hasMilestone("Factory", 5)) player.Gold.upgrades.splice(0, player.Gold.upgrades.length)

    for (let i in player.Beans.buyables) {
         player.Beans.buyables[i] = new Decimal(0)
    }

    for (let i in player.Money.buyables) {
         player.Money.buyables[i] = new Decimal(0)
    }

    for (let i in player.Gold.buyables) {
         player.Gold.buyables[i] = new Decimal(0)
    }
    
    
    player.Factory.factoryResetAmount = player.Factory.factoryResetAmount.add(1)
},
    ironReset(){
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)

     player.BeanTier.points = new Decimal(0)

     player.BeanTier.tierPoints = new Decimal(0)

     player.Money.dollars = new Decimal(0)

     player.Gold.goldBars = new Decimal(0)
     
     if (!hasMilestone("Factory", 7)) player.Beans.milestones.splice(0, player.Beans.milestones.length)

     if (!hasMilestone("Factory", 7)) player.Money.milestones.splice(0, player.Money.milestones.length)

     if (!hasMilestone("Factory", 5)) player.Money.upgrades.splice(0, player.Money.upgrades.length)

     if (!hasMilestone("Factory", 7)) player.Gold.milestones.splice(0, player.Gold.milestones.length)

     if (!hasMilestone("Factory", 5)) player.Gold.upgrades.splice(0, player.Gold.upgrades.length)

    for (let i in player.Beans.buyables) {
         player.Beans.buyables[i] = new Decimal(0)
    }

    for (let i in player.Money.buyables) {
         player.Money.buyables[i] = new Decimal(0)
    }

    for (let i in player.Gold.buyables) {
         player.Gold.buyables[i] = new Decimal(0)
    }
    
    },
componentStyles: {
        "prestige-button": {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
               "width": "250px",
                "height": "125px",
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
           },
    },
    tabFormat: {
        "Factory Core": {
        style() {return  {'background-color': '#242424'}},
        content: [
            ["display-text",
            function() {return 'Factory Level '+formatWhole(player.Factory.points)+''},
            {"color": "#858181", "font-size": "30px"}],
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    function() {if (!hasUpgrade("Beans", 1011)) return "prestige-button"},
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    "milestones",
                ]
            
        },
        "Assembly Line": {
        style() {return  {'background-color': '#3D3D3D'}},
        unlocked() { return hasMilestone("Factory", 6) },
        buttonStyle: {"border-color": "#BABABA"},
        content: [
            ["display-text",
            function() {return ''+format(player.Factory.ironPlates)+' Iron Plates'},
            {"color": "#BABABA", "font-size": "30px"}],
            ["raw-html", function() {if (player.points.gte(1e22)) return "(+" + format(player.Factory.ironPlateGain) + ")"}, {"color": "#8A8888", "font-size": "20px"}],
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["row", [["clickable", 1]]],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                    ["microtabs", "IronTabs"],
                ]
            
        },
    },
    
        microtabs: {
            IronTabs: {
                "Factory Production": {
                    buttonStyle: {"border-color": "#BABABA"},
                    content: [
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank",  ["buyable", 2], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 3], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5], "blank", ["buyable", 6],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 7], "blank", ["buyable", 8],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 9], "blank", ["buyable", 10],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],    
                    ]
                },
            }
        },
    
})