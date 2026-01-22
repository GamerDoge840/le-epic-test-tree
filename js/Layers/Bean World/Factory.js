addLayer("Factory", {
    name: "Factory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏭", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone("Gold", 4) || player.Factory.factoryResetAmount.gte('1')},
		points: new Decimal(0),
        factoryResetAmount: new Decimal(0),
        bestFactoryLevel: new Decimal(0.1)
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
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.Factory.points.gte(1) && player.Factory.points.lte(2)) mult = mult.times(25)
        if (player.Factory.points.gte(2) && player.Factory.points.lte(3)) mult = mult.times(75)
        if (player.Factory.points.gte(3) && player.Factory.points.lte(4)) mult = mult.times(4)
        if (player.Factory.points.gte(4) && player.Factory.points.lte(5)) mult = mult.times(1.92)
        if (player.Factory.points.gte(5) && player.Factory.points.lte(6)) mult = mult.dividedBy(6.43)
        if (player.Factory.points.gte(6) && player.Factory.points.lte(7)) mult = mult.dividedBy(50)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("Gold", 4) || player.Factory.factoryResetAmount.gte('1')},
    update(delta){
        if (player.Factory.bestFactoryLevel.lt(player.Factory.points)) player.Factory.bestFactoryLevel = player.Factory.points
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
        effectDescription() {return '――――――――――――――<br><font size="2">20x to TP gain. Unlock the Forge reset (In this layer).</span>'},
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
    },
    upgrades: {        
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
    },
    onPrestige(){
     player.points = new Decimal(0)
     
     player.BeanLevel.points = new Decimal(0)

     player.BeanTier.points = new Decimal(0)

     player.BeanTier.tierPoints = new Decimal(0)

     player.Money.dollars = new Decimal(0)

     player.Gold.goldBars = new Decimal(0)
     
     if (!hasMilestone("Beans", 1111)) player.Beans.milestones.splice(0, player.Beans.milestones.length)

     if (!hasMilestone("Beans", 1111)) player.Money.milestones.splice(0, player.Money.milestones.length)

     if (!hasMilestone("Factory", 5)) player.Money.upgrades.splice(0, player.Money.upgrades.length)

     if (!hasMilestone("Beans", 1111)) player.Gold.milestones.splice(0, player.Gold.milestones.length)

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
                    ["style-column", [
                    "milestones",
                     ], {width: "500px", height: "800px", backgroundColor: "#5E5D5D", border: "3px solid #BABABA", borderRadius: "10px"}],
                ]
            
        },
    },
})