addLayer("Beans", {
    name: "Beans", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🫘", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        bestBeans: new Decimal(0.0000001),
    }},
    color: "#F59527",
    nodeStyle() {
        return {
            "background": "linear-gradient(50deg, #C19A6B, #F59527)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Beans", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    autoUpgrade() {return hasUpgrade('Beans', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Beans<br>――――――――――――――<br> <font size='2'><span style='color:#C19A6B'> " +format(player.points)+" Beans</span>"
        if(player.BeanLevel.total.gte(1)) tooltip = tooltip + "<br><span style='color:#F59527'>Bean Level "+formatWhole(player.BeanLevel.points)+"</font>"
        if(player.Factory.total.gte(1)) tooltip = tooltip + "<br><font size='2'><span style='color:#D4B739'>Bean Tier "+formatWhole(player.BeanTier.points)+"</span> | <span style='color:#94811B'> "+format(player.BeanTier.tierPoints)+" TP</font>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    update(delta){
        //Get Best Beans
        if (player.Beans.bestBeans.lt(player.points)) player.Beans.bestBeans = player.points
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Beans', 1111)) return 1
	return 0
    },
    automate() {
        if(hasUpgrade('Money', 11)) buyMaxBuyable('Beans', 1)
        if(hasUpgrade('Money', 12)) buyMaxBuyable('Beans', 3)
        if(hasUpgrade('Money', 13)) buyMaxBuyable('Beans', 4)
        if(hasUpgrade('Money', 13)) buyMaxBuyable('Beans', 2)
        if(hasUpgrade('Gold', 11)) buyMaxBuyable('Beans', 5)
    },
    bars: {
        beanlevelbar: {
            unlocked() { return hasMilestone("Beans", 0)},
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {
                return player.points.div(tmp.BeanLevel.nextAt)
            },
            display() {
                return "<h5>" + format(player.points) + "/" + format(tmp.BeanLevel.nextAt) + "<h5> Beans to next Bean Level</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#F59527' },
       },
       beantierbar: {
            unlocked() { return hasMilestone("Factory", 0)},
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {
                return player.BeanTier.tierPoints.div(tmp.BeanTier.nextAt)
            },
            display() {
                return "<h5>" + format(player.BeanTier.tierPoints) + "/" + format(tmp.BeanTier.nextAt) + "<h5> TP to next Bean Tier</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#94811B' },
       },
},
    milestones: {
        0: {
        requirementDescription: "<font size='3'><b>1.75 Beans</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks Bean Levels.</span>'},
        done() {return player.points.gte(1.75) && getBuyableAmount("Beans", 1).gte(17)},
        unlocked() {return getBuyableAmount("Beans", 1).gte(17)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#ffcd7a',
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
        requirementDescription: "<font size='3'><b>Bean Level 3</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks a new Bean Upgrade that reduces the Bean Level requirement.</span>'},
        done() {return player.BeanLevel.points.gte(3)},
        unlocked() {return hasMilestone("Beans", 0)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#ffcd7a',
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
        requirementDescription: "<font size='3'><b>Bean Level 8</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks Bean Booster II.</span>'},
        done() {return player.BeanLevel.points.gte(8)},
        unlocked() {return hasMilestone("Beans", 1)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#ffcd7a',
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
        requirementDescription: "<font size='3'><b>Bean Level 22</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlocks Money, the first reset layer.</span>'},
        done() {return player.BeanLevel.points.gte(22)},
        unlocked() {return hasMilestone("Beans", 2)},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#ffcd7a',
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
    challenges: {

    },
    buyables: {
        1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Bean Booster</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.35);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Beans", 1)  
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
                cap = new Decimal(100)
                if (hasMilestone("Factory", 1)) cap = cap.times(1.5)
                cap=cap.times(buyableEffect('Factory', 2))
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 1))) setBuyableAmount('Beans', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 100%. Every ten purchases, this effect doubles."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Bean Level Booster</b>
                <font size="2">Which divide Bean Level requirement by /` +format(tmp[this.layer].buyables[this.id].effect) + `</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.260);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Beans", 2)  
               let base = new Decimal(1).add(amt.mul(0.05))
               let bonus = Decimal.pow(1.5, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                if (hasMilestone("Factory", 3)) cap = cap.times(1.5)
                cap=cap.times(buyableEffect('Factory', 2))
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.260).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 2))) setBuyableAmount('Beans', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Level Booster</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Reduces Bean Level requirement by 5%. Every ten purchases, this effect is boosted by 1.5x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Beans", 1)},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Bean Booster II</b>
                <font size="2">Which boost Bean gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.70);
                let cost = base.pow(x).times(0.1);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Beans", 3)  
               let base = new Decimal(1).add(amt.mul(0.10))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
               return base.times(bonus) 
               },
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(250)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.1).log(1.70) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 3))) setBuyableAmount('Beans', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Booster II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean gain by 10%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Beans", 2)},
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Bean Level Enhancer</b>
                <font size="2">Which boost Bean Level effect by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(5);
                let cost = base.pow(x).times(100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Beans', 4).mul(0.25).plus(1)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(10)
                if (hasMilestone("Factory", 5)) cap = cap.times(3)
                if (hasMilestone("Factory", 11)) cap = cap.times(2)
                return cap
            },
            buyMax() {
                let max = player.points.div(this.cost(0)).add(100).log(5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 4))) setBuyableAmount('Beans', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Bean Level Enhancer</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Bean Level effect by 25%."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Money", 0) && player.BeanLevel.points.gte('1')},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Valuable Beans</b>
                <font size="2">Which boost Money gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Beans</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.50);
                let cost = base.pow(x).times(500);
                return cost;
              },
              effect() {
               let amt = getBuyableAmount("Beans", 5)  
               let base = new Decimal(1).add(amt.mul(0.05))
               let bonus = Decimal.pow(1.25, Math.floor(amt / 10))
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
                let max = player.points.div(this.cost(0)).add(500).log(1.50) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Beans', 5))) setBuyableAmount('Beans', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Valuable Beans</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Money gain by 5%. Every ten purchases, this effect is boosted by 1.25x."},
            style() {
                if(!this.canAfford()){return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "250px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasMilestone("Money", 1)},
    
        },
    },
    clickables: {
          },
     tabFormat: {
        "Farm": {
        style() {return  {'background-color': '#161103'}},
        content: [
        ["raw-html", function() {if (hasMilestone("Beans", 0)) return 'Bean Level '+formatWhole(player.BeanLevel.points)+''}, {"color": "#F59527", "font-size": "29px"}],
        ["raw-html", function() {if (hasMilestone("Beans", 0)) return "Boosting Beans by <span style='color:#ffc75d'> "+ format(tmp.BeanLevel.effect) +"x</span>"}, {"font-size": "17px"}],
        "blank",
        ["bar", "beanlevelbar"],
        ["raw-html", function() {if (hasMilestone("Beans", 0)) return "―――――――――――――――――――――――――――――"}, {"color": "#F59527","font-size": "30px"}],
        ["display-text",
            function() {return ''+format(player.points)+' Beans'},
            {"color": "#F59527", "font-size": "30px"}],
            ["display-text",
            function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Beans/s)"},
            {"color": "#C19A6B", "font-size": "30px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#F59527", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "BeanTabs"],

                ]
            
        },
        "Bean Tiers": {
            unlocked() {return hasMilestone("Factory", 0)},
            style() {return  {'background-color': '#1A1600'}},
            buttonStyle: {"border-color": "#D4B739"},
            content: [
                ["display-text",
            function() {return 'Bean Tier '+formatWhole(player.BeanTier.points)+''},
            {"color": "#D4B739", "font-size": "30px"}],
            "blank",
            ["display-text",
            function() {return "Boosting Beans by <span style='color:#ffc75d'> "+ format(tmp.BeanTier.beanEffect) +"x</span>"},
            {"font-size": "19px"}],
             ["display-text",
            function() {return "Boosting Money by <span style='color:#81F72D'> "+ format(tmp.BeanTier.moneyEffect) +"x</span>"},
            {"font-size": "19px"}],
            ["raw-html", function() {if (hasMilestone("Factory", 10)) return "Boosting Gold by <span style='color:#FFE77D'> "+ format(tmp.BeanTier.goldEffect) +"x</span>"}, {"font-size": "19px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#D4B739", "font-size": "32px"}],
                    ["display-text",
            function() {return ''+format(player.BeanTier.tpGain)+' TP/s'},
            {"color": "#94811B", "font-size": "25px"}],
            "blank",
                    ["bar", "beantierbar"],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#D4B739", "font-size": "32px"}],
            ]
        },
    },
        microtabs: {
            BeanTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],                        
                    "blank",
                        ["raw-html", function() {if (getBuyableAmount("Beans", 1).gte(10) && !getBuyableAmount("Beans", 1).gte(17)  ) return 'Unlock Bean Milestones at 17 Bean Boosters'}, {"color": "#FFFFFF", "font-size": "23px"}],
                        "blank",
                    ]
                },
                "Milestones": {
                     unlocked() { return getBuyableAmount("Beans", 1).gte(17) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],
                        "blank",
                        "milestones",
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C19A6B", "font-size": "32px"}],

                    ]
                },
            }
        },
})