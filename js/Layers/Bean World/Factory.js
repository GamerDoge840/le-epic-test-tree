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
        watts: new Decimal(0),
        wattGain: new Decimal(0),
        bestWatts: new Decimal(0),
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
        if(player.Factory.ironResetAmount.gte('1')) tooltip = tooltip + "<br><font size='2'><span style='color:#BABABA'>"+format(player.Factory.ironPlates)+" Iron Plates<br></span>"
        if(hasUpgrade("Factory", 1) ) tooltip = tooltip + "<font size='2'><span style='color:#FFF196'>"+format(player.Factory.watts)+"W</span>"
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
        if (player.Factory.points.gte(11) && player.Factory.points.lte(12)) mult = mult.dividedBy(3e11)
        if (player.Factory.points.gte(12) && player.Factory.points.lte(13)) mult = mult.dividedBy(3e9)
        if (player.Factory.points.gte(13) && player.Factory.points.lte(14)) mult = mult.dividedBy(8e15)
        if (player.Factory.points.gte(14) && player.Factory.points.lte(15)) mult = mult.dividedBy(2e13)
        if (player.Factory.points.gte(15) && player.Factory.points.lte(16)) mult = mult.dividedBy(4e21)
        if (player.Factory.points.gte(16) && player.Factory.points.lte(17)) mult = mult.dividedBy(6.5e20)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("Gold", 4) || player.Factory.factoryResetAmount.gte('1')},
    update(delta){
        //Best Factory Currencies
        if (player.Factory.bestFactoryLevel.lt(player.Factory.points)) player.Factory.bestFactoryLevel = player.Factory.points
        if (player.Factory.bestIronPlates.lt(player.Factory.ironPlates)) player.Factory.bestIronPlates = player.Factory.ironPlates
        if (player.Factory.bestWatts.lt(player.Factory.watts)) player.Factory.bestWatts = player.Factory.watts

        //Get base Iron Plate gain
        player.Factory.ironPlateGain = player.points.div(1e22).pow(0.5)

        //Iron Plate Boosts
        if (hasMilestone('Factory', 8)) player.Factory.ironPlateGain = player.Factory.ironPlateGain.times(tmp.Factory.milestones[8].effect)

        //Base Watt Gain
        player.Factory.wattGain = new Decimal(0.01)

        //Watt Generation and Boosts
        player.Factory.wattGain = player.Factory.wattGain.mul(buyableEffect("Factory", 100))
        player.Factory.wattGain = player.Factory.wattGain.mul(buyableEffect("Factory", 101))
        player.Factory.wattGain = player.Factory.wattGain.mul(buyableEffect("Factory", 102))
        player.Factory.wattGain = player.Factory.wattGain.mul(buyableEffect("Factory", 103))
        if (hasMilestone('Factory', 14)) player.Factory.wattGain = player.Factory.wattGain.times(tmp.Factory.milestones[14].effect)
        if (hasMilestone('Factory', 1004)) player.Factory.wattGain = player.Factory.wattGain.mul(tmp.BeanTier.wattEffect)
        if (hasUpgrade('Factory', 1)) player.Factory.watts = player.Factory.watts.add(player.Factory.wattGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
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
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
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
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
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
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    11: {
        requirementDescription: "<font size='3'><b>(FL12) Bean Enhancement V</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Bean Level Enhancer can be bought twice as many times. Unlock a new Iron Plate upgrade.</span>'},
        done() {return player.Factory.points.gte(12)},
        unlocked() {return hasMilestone("Factory", 10)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
     12: {
        requirementDescription: "<font size='3'><b>(FL13) Bean Factory II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Every Factory Level also boosts Bean gain by 1.10x compounding, unlock another new Iron Plate upgrade.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(13)},
        effect() {
                let eff = new Decimal(1.10).pow(player.Factory.points)
                return eff;
            },  
        unlocked() {return hasMilestone("Factory", 11)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    13: {
        requirementDescription: "<font size='3'><b>(FL14) Power Factory</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks the Power Plant (In this tab) and yet another new Iron Plate upgrade.</span>'},
        done() {return player.Factory.points.gte(14)},
        unlocked() {return hasMilestone("Factory", 12)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    14: {
        requirementDescription: "<font size='3'><b>(FL15) Power Factory II</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Start Layer 3 resets with 1e9 Money, unlock a new Watt generation upgrade, and each Factory Level past 14 boosts Watt gain by 1.25x compounding.<br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.points.gte(15)},
        effect() {
                let eff = new Decimal(1.25).pow(player.Factory.points.sub(14)).max(1)
                return eff;
            }, 
        unlocked() {return hasMilestone("Factory", 13)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    15: {
        requirementDescription: "<font size='3'><b>(FL16) Power Factory III</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock another new Watt generation upgrade.'},
        done() {return player.Factory.points.gte(16)},
        unlocked() {return hasMilestone("Factory", 14)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    16: {
        requirementDescription: "<font size='3'><b>(FL17) Power Factory IV</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock another new Watt generation upgrade.'},
        done() {return player.Factory.points.gte(17)},
        unlocked() {return hasMilestone("Factory", 15)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #5E5D5D, #BABABA)",
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "60px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1000: {
        requirementDescription: "<font size='3'><b>(0.25 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost Bean gain, and unlock a new buyable in the Watt Generation tab.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(0.25)},
        effect() {
                let eff = player.Factory.watts.pow(0.3).div(1.5).add(1)
                return eff;
            },  
        unlocked() {return hasUpgrade("Factory", 1)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1001: {
        requirementDescription: "<font size='3'><b>(15 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts divide the Bean Level requirement.</span><br>――――――――――――――<br> Currently: /'+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'</span>'},
        done() {return player.Factory.bestWatts.gte(15)},
        effect() {
                let eff = player.Factory.watts.pow(0.2).div(2.5).add(1)
                return eff;
            },  
        unlocked() {return hasMilestone("Factory", 1000)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1002: {
        requirementDescription: "<font size='3'><b>(750 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts extend the purchase cap of Valuable Beans (Capped at 7x).</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(750)},
        effect() {
                let eff = player.Factory.watts.pow(0.5).div(5).add(1)
                return eff.min(7);
            },  
        unlocked() {return hasMilestone("Factory", 1001)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1003: {
        requirementDescription: "<font size='3'><b>(2,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost the Bean Level effect.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(2000)},
        effect() {
                let eff = player.Factory.watts.add(1).log(10).pow(0.1).add(1)
                return eff;
            },  
        unlocked() {return hasMilestone("Factory", 1002)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1004: {
        requirementDescription: "<font size='3'><b>(15,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost TP gain, and Bean Tiers gain another new effect which boosts Watt gain.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(15000)},
        effect() {
                let eff = player.Factory.watts.pow(0.25).div(1.75).add(1)
                if (hasMilestone('Factory', 1008)) eff = eff.times(tmp.Factory.milestones[1008].effect)
                return eff;
            },  
        unlocked() {return hasMilestone("Factory", 1003)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1005: {
        requirementDescription: "<font size='3'><b>(50,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost Money gain.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(50000)},
        effect() {
                let eff = player.Factory.watts.pow(0.15).div(1.3).add(1)
                if (hasMilestone('Factory', 1008)) eff = eff.times(tmp.Factory.milestones[1008].effect)
                return eff;
            },   
        unlocked() {return hasMilestone("Factory", 1004)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1006: {
        requirementDescription: "<font size='3'><b>(75,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost Gold gain.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(75000)},
        effect() {
                let eff = player.Factory.watts.pow(0.07).div(1.3).add(1)
                if (hasMilestone('Factory', 1008)) eff = eff.times(tmp.Factory.milestones[1008].effect)
                return eff;
            },   
        unlocked() {return hasMilestone("Factory", 1005)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1007: {
        requirementDescription: "<font size='3'><b>(300,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts divide Bean Tier requirement.</span><br>――――――――――――――<br> Currently: /'+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'</span>'},
        done() {return player.Factory.bestWatts.gte(300000)},
        effect() {
                let eff = player.Factory.watts.add(1).log(10).pow(2).add(1)
                return eff;
            },   
        unlocked() {return hasMilestone("Factory", 1006)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    1008: {
        requirementDescription: "<font size='3'><b>(1,500,000 Best Watts)</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Watts boost the effects of the fifth, sixth, and seventh previous Watt milestones.</span><br>――――――――――――――<br> Currently: '+format(+format(tmp.Factory.milestones[this.layer, this.id].effect))+'x</span>'},
        done() {return player.Factory.bestWatts.gte(1.5e6)},
        effect() {
                let eff = player.Factory.watts.add(1).log(10).pow(0.5).add(1)
                return eff;
            },   
        unlocked() {return hasMilestone("Factory", 1007)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
            "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)',
            }
            else return {
                'background-color': '#bf8f8f',
        'border': '5px solid',
        "width": "400px",
        "height": "100px",
        'border-color': 'rgba(0, 0, 0, 0.125)'
                }
            }
    },
    },
    upgrades: { 
        1: {
            title: "Build the Power Plant",
            fullDisplay() {return `<font size="3"><b>Build the Power Plant</b><font size="2"><br>Enables Watt generation.<br>――――――――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Beans)+` Beans, <br>`+format(tmp[this.layer].upgrades[this.id].costs.IronPlates)+` Iron Plates,<br>`+format(tmp[this.layer].upgrades[this.id].costs.Money)+`$ Dollars,<br>`+format(tmp[this.layer].upgrades[this.id].costs.Gold)+` Gold Bars`},        
            unlocked() { return hasMilestone("Factory", 13) },
            costs: {
                Beans: 2e42,
                IronPlates: 3.5e10,
                Money: 7e28,
                Gold: 3e14,
              },
              canAfford() {
                return player.points.gte(this.costs.Beans)
                    && player.Factory.ironPlates.gte(this.costs.IronPlates)
                    && player.Money.dollars.gte(this.costs.Money)
                    && player.Gold.goldBars.gte(this.costs.Gold)
              },
              pay() {
                player.points = player.points.minus(this.costs.Beans);
                player.Factory.ironPlates = player.Factory.ironPlates.minus(this.costs.IronPlates);
                player.Money.dollars = player.Money.dollars.minus(this.costs.Money);
                player.Gold.goldBars = player.Gold.goldBars.minus(this.costs.Gold);
              },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                    "width": "185px",
            "height": "185px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "185px",
            "height": "185px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                "background": "linear-gradient(70deg, #FFF6CC, #FFED99, #FFD500)",
                'color': 'black',
                        "width": "185px",
            "height": "185px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },           
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
                let base = new Decimal(1.65);
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
                let max = player.Factory.ironPlates.div(this.cost(0)).add(10000).log(1.65) //add is cost, log is base
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
        10: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Level Enhancers</b>
                <font size="2">Which boost Bean Level effect by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(10);
                let cost = base.pow(x).times(1e6);
                return cost;
              },
            effect(x) { return getBuyableAmount('Factory', 10).pow_base(1.5) }, 
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(5)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(1e6).log(10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 10))) setBuyableAmount('Factory', 10, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Level Enhancers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean Level effect by 1.5x compounding each purchase."},
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
            unlocked() {return hasMilestone("Factory", 12)},
    
        },
        11: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gold Drills</b>
                <font size="2">Which boost Gold gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(1e8);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("Factory", 11).mul(0.10).plus(1)
                return eff
            },               
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(1e8).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 11))) setBuyableAmount('Factory', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gold Drills</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Gold gain by 10% each purchase."},
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
            unlocked() {return hasMilestone("Factory", 13)},
    
        },
        100: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Bean Boilers</b>
                <font size="2">Which boost Watt generation by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(5e41);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 100)  
               let base = new Decimal(1).add(amt.mul(1))
               let bonus = Decimal.pow(1.10, Math.floor(amt / 10))
               return base.times(bonus) 
               },             
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(1e8).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 100))) setBuyableAmount('Factory', 100, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Boilers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Watt gain by 100%. Every ten purchases, this effect is boosted by 1.10x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 1000)},
    
        },
        101: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Money Burners</b>
                <font size="2">Which boost Watt generation by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+`$</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(2.5e26);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 101)  
               let base = new Decimal(1).add(amt.mul(0.50))
               let bonus = Decimal.pow(1.10, Math.floor(amt / 10))
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
                let max = Money.dollars.div(this.cost(0)).add(1e26).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 101))) setBuyableAmount('Factory', 101, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Money Burners</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Watt gain by 50%. Every ten purchases, this effect is boosted by 1.10x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 14)},
    
        },
        102: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gold Batteries</b>
                <font size="2">Which boost Watt generation by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Gold Bars</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(1e15);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 102)  
               let base = new Decimal(1).add(amt.mul(0.25))
               let bonus = Decimal.pow(1.10, Math.floor(amt / 10))
               return base.times(bonus) 
               },             
            canAfford() { if (player.Gold.goldBars.gte(this.cost())) {return true}},
            buy() {
                player.Gold.goldBars = player.Gold.goldBars.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = Gold.goldBars.div(this.cost(0)).add(1e26).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 102))) setBuyableAmount('Factory', 102, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gold Batteries</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Watt gain by 25%. Every ten purchases, this effect is boosted by 1.10x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 15)},
    
        },
        103: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Steam Engines</b>
                <font size="2">Which boost Watt generation by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Iron Plates</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(1e10);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Factory", 103)  
               let base = new Decimal(1).add(amt.mul(0.25))
               let bonus = Decimal.pow(1.10, Math.floor(amt / 10))
               return base.times(bonus) 
               },             
            canAfford() { if (player.Factory.ironPlates.gte(this.cost())) {return true}},
            buy() {
                player.Factory.ironPlates = player.Factory.ironPlates.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Factory.ironPlates.div(this.cost(0)).add(1e10).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Factory', 103))) setBuyableAmount('Factory', 103, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Steam Engines</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Watt gain by 50%. Every ten purchases, this effect is boosted by 1.10x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                "background": "linear-gradient(30deg, #FFF196, #E8DFB5)",
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Factory", 16)},
    
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

     if (!hasMilestone("Factory", 14)) player.Money.dollars = new Decimal(0)

     if (hasMilestone("Factory", 14)) player.Money.dollars = new Decimal(1e9)

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

    player.Factory.watts = new Decimal(0)
    
    
    player.Factory.factoryResetAmount = player.Factory.factoryResetAmount.add(1)
},
    ironReset(){
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)

     player.BeanTier.points = new Decimal(0)

     player.BeanTier.tierPoints = new Decimal(0)

     if (!hasMilestone("Factory", 14)) player.Money.dollars = new Decimal(0)

     if (hasMilestone("Factory", 14)) player.Money.dollars = new Decimal(1e9)

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

    player.Factory.watts = new Decimal(0)
    
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
                    ["column", [ ["row", [ ["milestone", 0], ]]]],
                    ["column", [ ["row", [ ["milestone", 1], ]]]],
                    ["column", [ ["row", [ ["milestone", 2], ]]]],
                    ["column", [ ["row", [ ["milestone", 3], ]]]],
                    ["column", [ ["row", [ ["milestone", 4], ]]]],
                    ["column", [ ["row", [ ["milestone", 5], ]]]],
                    ["column", [ ["row", [ ["milestone", 6], ]]]],
                    ["column", [ ["row", [ ["milestone", 7], ]]]],
                    ["column", [ ["row", [ ["milestone", 8], ]]]],
                    ["column", [ ["row", [ ["milestone", 9], ]]]],
                    ["column", [ ["row", [ ["milestone", 10], ]]]],
                    ["column", [ ["row", [ ["milestone", 11], ]]]],
                    ["column", [ ["row", [ ["milestone", 12], ]]]],
                    ["column", [ ["row", [ ["milestone", 13], ]]]],
                    ["column", [ ["row", [ ["milestone", 14], ]]]],
                    ["column", [ ["row", [ ["milestone", 15], ]]]],
                    ["column", [ ["row", [ ["milestone", 16], ]]]],

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
        
        "Power Plant": {
        style() {return  {'background-color': '#1A1600'}},
        unlocked() { return hasMilestone("Factory", 13) },
        buttonStyle: {"border-color": "#FFF196"},
        content: [
            ["display-text",
            function() {return ''+format(player.Factory.watts)+'W'},
            {"color": "#FFF196", "font-size": "30px"}],
                        ["raw-html", function() {if (hasUpgrade("Factory", 1) ) return "(+" + format(player.Factory.wattGain) + "/s)"}, {"color": "#E8DFB5", "font-size": "20px"}],
            ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],
                        ["microtabs", "WattTabs"],
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
                        ["column", [ ["row", [ ["buyable", 11], "blank", ["buyable", 12],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#5E5D5D", "font-size": "32px"}],    
                    ]
                },
            },
            WattTabs: {
                "Watt Generation": {
                    buttonStyle: {"border-color": "#FFF196"},
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1], ]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 100], "blank",  ["buyable", 101], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 102], "blank", ["buyable", 103],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],    
                    ]
                },
                "Watt Boosts": {
                    buttonStyle: {"border-color": "#FFF196"},
                    unlocked() { return hasUpgrade("Factory", 1) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],
                        ["display-text",
            function() {return ''+format(player.Factory.bestWatts)+' Best Watts'},
            {"color": "#E8DFB5", "font-size": "25px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["milestone", 1000], ]]]],
                        ["column", [ ["row", [ ["milestone", 1001], ]]]],
                        ["column", [ ["row", [ ["milestone", 1002], ]]]],
                        ["column", [ ["row", [ ["milestone", 1003], ]]]],
                        ["column", [ ["row", [ ["milestone", 1004], ]]]],
                        ["column", [ ["row", [ ["milestone", 1005], ]]]],
                        ["column", [ ["row", [ ["milestone", 1006], ]]]],
                        ["column", [ ["row", [ ["milestone", 1007], ]]]],
                        ["column", [ ["row", [ ["milestone", 1008], ]]]],
                        ["column", [ ["row", [ ["milestone", 1009], ]]]],

                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFF196", "font-size": "32px"}],    
                    ]
                },
            }
        },
    
})