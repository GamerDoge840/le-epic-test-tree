addLayer("Knowledge", {
    name: "Knowledge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ddeded",
    nodeStyle() {
        return {
            'border': '5px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Ascended Knowledge", // Name of prestige currency
    resetDescription: "Ascend your knowledge beyond the confines of your mind.<br>----------<br>",
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    tooltip() {
        let tooltip = "<span style='color:#ddeded'>" +formatWhole(player.points)+" Knowledge</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "Ponder 10 Times",
            effectDescription() {return '---------<br><font size="2">Unlock <span style="color:#ddeded">Pacing</span>.'},
            done() { return getBuyableAmount("Knowledge", 11).gte(10) },
            unlocked() { return hasUpgrade("Knowledge", 11) },
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#5a8c7b',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#696969',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        1: {
            requirementDescription: "Pace 12 Times",
            effectDescription() {return '---------<br><font size="2">Unlock <span style="color:#ddeded">Thinking</span>.'},
            done() { return getBuyableAmount("Knowledge", 12).gte(12) },
            unlocked() { return hasMilestone("Knowledge", 0) },
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#5a8c7b',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#696969',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        2: {
            requirementDescription: "Think 20 Times, Ponder and Pace 30 Times",
            effectDescription() {return '----------------------------<br><font size="2">Unlock <span style="color:#CD7F32">Scrolls</span> if you havent already unlocked them.'},
            done() { return getBuyableAmount("Knowledge", 21).gte(20) && getBuyableAmount("Knowledge", 12).gte(30) && getBuyableAmount("Knowledge", 11).gte(30)},
            unlocked() { return hasMilestone("Knowledge", 1) },
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#5a8c7b',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#696969',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Journey's Beginning",
            fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Journey's Beginning</span></b><font size="2"><br>Begin wandering in your own thoughts.<br>-----------------<br><b>Currently: `+format(getPointGen()) +`/s</b><br>-----------------<br>Cost: 0.0010 <span style='color:#ffffff'>Knowledge</span>`},    
            cost: new Decimal(0.0010),
            currencyInternalName: "points",
            tooltip() {return "<span style='color:#ffffff'>Journey's Beginning</span><br>----------------<br><span style='font-size:11px'><span style='color:#7d837c'>Everybody has to start somewhere, and for many people-including me-that somewhere is as a peasant starving for coin."},
            style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#5a8c7b',
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#696969' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                    else if (canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#8fd7be' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                },
        },
        
        12: {    
            title: "Basic Focus",
            fullDisplay() {return `<font size="3"><b><span style='color:#ffffff'>Basic Focus</span></b><font size="2"><br>Triple <span style="color:#ffffff">Knowledge</span> gain.<br>-----------------<br>Cost: 0.0300 <span style='color:#ffffff'>Knowledge</span>`},    
            cost: new Decimal(0.0300),
            currencyInternalName: "points",
            unlocked() { return hasUpgrade("Knowledge", 11) && hasUpgrade("Scrolls", 11)  },
            tooltip() {return "<span style='color:#ffffff'>Basic Focus</span><br>----------------<br><span style='font-size:11px'><span style='color:#7d837c'>Scrolls help me think faster."},
            style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#5a8c7b',
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#696969' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                    else if (canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#8fd7be' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                },
        },
    
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b>Ponder</b><font size="2"><br>Increases <span style='color:#8fd7be'>Knowledge</span> gain by a flat 10% with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style='color:#8fd7be'>Knowledge</span></b> <br>-----------------<br><b>Done `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+` times</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.180);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.10).add(1) },     

            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#ddeded'>Ponder</span><br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.180) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Knowledge', 11))) setBuyableAmount('Knowledge', 11, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Knowledge", 11) },
    
        },
        12: {
            display() {return `<font size="3"><b>Pace</b><font size="2"><br>Increases <span style='color:#8fd7be'>Knowledge</span> gain by 1.05x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style='color:#8fd7be'>Knowledge</span></b> <br>-----------------<br><b>Done `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+` times</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.190);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Knowledge', 12).add(extra).pow_base(1.05) },

            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#ddeded'>Pace</span><br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.190) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Knowledge', 12))) setBuyableAmount('Knowledge', 12, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasMilestone("Knowledge", 0) },
    
        },
        21: {
            display() {return `<font size="3"><b>Think</b><font size="2"><br>Increases <span style='color:#8fd7be'>Knowledge</span> gain by 1.15x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style='color:#8fd7be'>Knowledge</span></b> <br>-----------------<br><b>Done `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+` times</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.250);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Knowledge', 21).add(extra).pow_base(1.15) },

            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(20)
                return cap
            },
            tooltip() {return "<span style='color:#ddeded'>Think</span><br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.250) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Knowledge', 21))) setBuyableAmount('Knowledge', 21, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasMilestone("Knowledge", 1) },
    
        },
    },
     tabFormat: {
        "Desk": {
            content: [ 
                ["infobox", "KnowledgeLore"],
                ['display-text',function(){return '<h4>You have  '+quickBigColor(format(player.points),'#ddeded') +' <span style="color:#ddeded">Knowledge</span>.'}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#ddeded", "font-size": "32px"}],
                ["display-text",
                    function() {return "============================="},
                    {"color": "#ddeded", "font-size": "32px"}], 
                    ["buyables", [1, 2]], 
                ["display-text",
                    function() {return "============================="},
                    {"color": "#ddeded", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#ddeded", "font-size": "32px"}],
                        ["upgrades", [1, 2, 3, 4]], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#ddeded", "font-size": "32px"}],  
                        ["milestones", [0, 1, 2, 3, 4]], 
                    
            ]
            
        },
        "Scroll Rack": {
            unlocked() {return hasMilestone('Knowledge', 2)||player.Scrolls.best.gte(1)},
            buttonStyle: {"border-color": "#CD7F32"},
            embedLayer: 'Scrolls',
        },
    },
    infoboxes:{
        KnowledgeLore: {
         title: "Act 0 - Chapter 1: The Beginning",
         titleStyle: {'color': '#000000'},
         body: "You are nothing more than a simple peasant with a curiosity for the world. You wish to learn more, but alas, your meagre income prevents you from buying proper books.<br><br> You are stuck with the dull, unremarkable knowledge you have been raised by, but perhaps with enough brainstorming, you could get somewhere.",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})