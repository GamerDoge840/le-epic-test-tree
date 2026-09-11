addLayer("h", {
    name: "Honey", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        Honey: new Decimal(0),
        honeyToGet: new Decimal(0),
        honeyResetAmount: new Decimal(0),
    }},
    color: "#C2B261",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        }
    },
    branches: ["p"],
    tooltip() {
        let tooltip = "<font size='3'>Honey<br>――――――――――――――<br> <font size='2'><span style='color:#C2B261'> " +format(player.h.Honey)+" Honey</span>"
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
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Honey Gain
        player.h.honeyToGet = player.p.points.div(10)

        //buyables
        player.h.honeyToGet = player.h.honeyToGet.mul(buyableEffect("p", 2))
        player.h.honeyToGet = player.h.honeyToGet.mul(buyableEffect("h", 4))
    },
    honeyReset()
    {
     player.points = new Decimal(0)
     
     player.p.points = new Decimal(0)
     
    for (let i in player.p.buyables) {
         player.p.buyables[i] = new Decimal(0)
    }

    },
    milestones: {
        1: {
        requirementDescription: "<font size='3'><b>[1] 8 Gathering Boosters</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock a new White Flower upgrade.</span>'},
        done() {return getBuyableAmount("h", 1).gte(8)},
        unlocked() {return true},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[2] 12 Gathering Boosters</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock another new White Flower upgrade.</span>'},
        done() {return getBuyableAmount("h", 1).gte(12) && (hasMilestone('h', 1))},
        unlocked() {return (hasMilestone('h', 1))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[3] 21 White Pollen</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock a new Honey upgrade.</span>'},
        done() {return player.p.points.gte('21') && (hasMilestone('h', 2))},
        unlocked() {return (hasMilestone('h', 2))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[4] 12 White Pollinators</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Automate buying Allium without spending GP.</span>'},
        done() {return getBuyableAmount("h", 2).gte(12) && (hasMilestone('h', 3))},
        unlocked() {return (hasMilestone('h', 3))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[5] 31 White Pollen</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock another new White Flower upgrade.</span>'},
        done() {return player.p.points.gte('31') && (hasMilestone('h', 4))},
        unlocked() {return (hasMilestone('h', 4))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[6] 15 White Pollinators</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Automate buying White Roses without spending GP.</span>'},
        done() {return getBuyableAmount("h", 2).gte(15) && (hasMilestone('h', 5))},
        unlocked() {return (hasMilestone('h', 5))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[7] 40 White Pollen</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock another new Honey upgrade.</span>'},
        done() {return player.p.points.gte('40') && (hasMilestone('h', 6))},
        unlocked() {return (hasMilestone('h', 6))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[8] 46 White Pollen</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock yet another new Honey upgrade.</span>'},
        done() {return player.p.points.gte('46') && (hasMilestone('h', 7))},
        unlocked() {return (hasMilestone('h', 7))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[9] 24 Gathering Boosters</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Automate buying Angelonia without spending GP.</span>'},
        done() {return getBuyableAmount("h", 1).gte(24) && (hasMilestone('h', 8))},
        unlocked() {return (hasMilestone('h', 8))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
        requirementDescription: "<font size='3'><b>[10] 20 White Pollinators and 45 White Pollen</b><font size='2'>",
        effectDescription() {return '――――――――――――――<br><font size="2">Unlock the fifth White Flower upgrade.</span>'},
        done() {return getBuyableAmount("h", 2).gte(20) && player.p.points.gte('45') && (hasMilestone('h', 9))},
        unlocked() {return (hasMilestone('h', 9))},
        style() {
            if (hasMilestone(this.layer, this.id)) return {
                'background-color': '#C2B261',
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Gathering Boosters</b>
                <font size="2">Which boost GP gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Honey</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("h", 1).mul(0.20).plus(1)
                return eff
            },     
            canAfford() { if (player.h.Honey.gte(this.cost())) {return true}},
            buy() {
                player.h.Honey = player.h.Honey.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.h.Honey.div(this.cost(0)).add(0.100).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('h', 1))) setBuyableAmount('h', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Gathering Boosters</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Gathering Power gain by 20% every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
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
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>White Pollinators</b>
                <font size="2">Which divide White Pollen requirement by /` +format(tmp[this.layer].buyables[this.id].effect) + `</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Honey</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(0.250);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("h", 2).mul(0.25).plus(1)
                return eff
            },     
            canAfford() { if (player.h.Honey.gte(this.cost())) {return true}},
            buy() {
                player.h.Honey = player.h.Honey.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(50)
                return cap
            },
            buyMax() {
                let max = player.h.Honey.div(this.cost(0)).add(0.250).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('h', 2))) setBuyableAmount('h', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>White Pollinators</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase divides White Pollen's GP requirement by 25%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 3))},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>White Enhancers</b>
                <font size="2">Which are unlocking `+formatWhole(getBuyableAmount(this.layer, this.id), 0)+` new White Pollen effects</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Honey</b><br><b>`},
            cost(x) {
                let base = new Decimal(1e10);
                let cost = base.pow(x).times(15);
                return cost;
              },  
            canAfford() { if (player.h.Honey.gte(this.cost())) {return true}},
            buy() {
                player.h.Honey = player.h.Honey.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(2)
                return cap
            },
            buyMax() {
                let max = player.h.Honey.div(this.cost(0)).add(15).log(1e10) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('h', 3))) setBuyableAmount('h', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>White Enhancers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase unlocks a new passive White Pollen effect."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 7))},
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Honeyed Honey</b>
                <font size="2">Which boost Honey gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Honey</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.25);
                let cost = base.pow(x).times(2.50);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount("h", 4).mul(0.30).plus(1)
                return eff
            },     
            canAfford() { if (player.h.Honey.gte(this.cost())) {return true}},
            buy() {
                player.h.Honey = player.h.Honey.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                return cap
            },
            buyMax() {
                let max = player.h.Honey.div(this.cost(0)).add(2.50).log(1.25) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('h', 4))) setBuyableAmount('h', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Honeyed Honey</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Honey gain by 30%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#C2B261', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasMilestone('h', 8))},
    
        },
        
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Convert White Pollen into Honey.<br><font size='4'>(Requires 10 White Pollen)" },
            canClick() { return player.h.honeyToGet.gte(1) && player.p.points.gte(10)},
            //unlocked() { return !getBuyableAmount("Gold", 5).gte(1) },
            onClick() {
                layers.h.honeyReset()
                player.h.Honey = player.h.Honey.add(player.h.honeyToGet)
                player.h.honeyResetAmount = player.h.honeyResetAmount.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
    },
     tabFormat: {
        "Honey": {
        style() {return  {'background-color': '#14130A'}},
        content: [
            ["display-text",
            function() {return '('+formatWhole(player.p.points)+' White Pollen)'},
            {"color": "#FFFFFF", "font-size": "20px"}],
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
        ["display-text",
            function() {return ''+format(player.h.Honey)+' Honey'},
            {"color": "#C2B261", "font-size": "35px"}],
                                    ["raw-html", function() {if (player.p.points.gte(10)) return "(+" + format(player.h.honeyToGet) + ")"}, {"color": "#C2B261", "font-size": "20px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                                        ["row", [["clickable", 1]]],

                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "HoneyTabs"],

                ]
            
        },
    },
        microtabs: {
            HoneyTabs: {
                "Info": {
                    content: [
                        ["display-text",
                    function() {return "――――――Layer 1 Reset――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                    ["display-text",
                    function() {return "Converting White Pollen into Honey resets the first row, including Gathering Power, Pollen, and Pollen Upgrades in exchange for Honey which you can spend on new upgrades."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                    "blank",
                    ["display-text",
                    function() {return "In this layer most of your progression will be focused on fulfilling Honey Milestones, which will unlock new upgrades and automation once their requirements are met."},
                    {"color": "#FFFFFF", "font-size": "20px"}],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],                        
                    ]
                },
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 3], ]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 2], "blank", ["buyable", 4],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 5],]]]],
                        "blank",
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
                "Milestones": {
                     unlocked() { return true},
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],
                        "blank",
                        "milestones",
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#C2B261", "font-size": "32px"}],

                    ]
                },
            }
        },
})