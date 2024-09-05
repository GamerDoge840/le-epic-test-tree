addLayer("Particles", {
    name: "Particles", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ⓟ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e4f1ef",
    nodeStyle() {
        return {
            'border': '4px solid #ffe497',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Sussy", // Name of prestige currency
    resetDescription: "Become just a lil Sussy<br>----------<br>",
    baseResource: "Sussium", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    tooltip() {
        let tooltip = "<span style='color:#e4f1ef'>" +formatWhole(player.points)+" Particles</span>"
        if(hasMilestone(`Particles`, 0)) tooltip = tooltip + "<br><span style='color:#ffe497'>" +formatWhole(player.Levels.points)+" Luminosity</span> | <span style='color:#c6bc85'> "+formatWhole(player.Lumens.points)+" Lumens</span>"
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
            requirementDescription: "7 Neutrons",
            effectDescription() {return '---------<br><font size="2">Permanently unlock <span style="color:#ffe497">Luminosity</span> and a new column of Particle upgrades.'},
            done() { return getBuyableAmount("Particles", 31).gte(7) },
            unlocked() { return getBuyableAmount("Particles", 21).gte(5) },
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#64beb0',
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
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b><span style="color:#64beb0">Quarks</span></b><font size="2"><br>Increases <span style="color:#64beb0">Particles</span> gain by 1.1x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#64beb0">Particles</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Particles', 11).pow_base(1.1)
                eff=eff.times(buyableEffect('Particles', 21))
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#e4f1ef'>Quarks</span><br>----------------<br>Most simple type of Particle."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0050).log(1.400) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Particles', 11))) setBuyableAmount('Particles', 11, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return true },
    
        },
        21: {
            display() {return `<font size="3"><b><span style="color:#21caec">Protons</span></b><font size="2"><br>Increases the power of the <span style="color:#64beb0">Quarks</span> upgrade by 1.1x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#64beb0">Particles</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Particles', 21).pow_base(1.1)
                eff=eff.times(buyableEffect('Particles', 31))
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#21caec'>Protons</span><br>----------------<br>A subatomic particle made out of a few different types of Quarks."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0010).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Particles', 21))) setBuyableAmount('Particles', 21, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Particles", 11).gte(5)},
    
        },
        31: {
            display() {return `<font size="3"><b><span style="color:#ec2121">Neutrons</span></b><font size="2"><br>Increases the power of the <span style="color:#21caec">Protons</span> upgrade by 1.1x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#64beb0">Particles</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(2.5);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Particles', 31).pow_base(1.1)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#ec2121'>Neutrons</span><br>----------------<br>A subatomic particle a bit bigger than a Proton."},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0010).log(2.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Particles', 31))) setBuyableAmount('Particles', 31, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Particles", 21).gte(5)},
    
        },
        12: {
            display() {return `<font size="3"><b><span style="color:#64beb0">Green Quarks</span></b><font size="2"><br>Divides the <span style="color:#b9d5ff">EXP</span> requirement for <span style="color:#b9d5ff">Leveling Up</span> by 2x with every purchase. <br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#64beb0">Particles</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `÷</b>`},
            cost(x) {
                let base = new Decimal(1.400);
                let cost = base.pow(x).times(0.100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Particles', 12).pow_base(2)
                eff=eff.times(buyableEffect('Particles', 22))
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#64beb0'>Green Quarks</span><br>----------------<br>The"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.100).log(1.400) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Particles', 12))) setBuyableAmount('Particles', 12, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasMilestone (`Particles`, 0)},
    
        },
        22: {
            display() {return `<font size="3"><b><span style="color:#21caec">Blue Quarks</span></b><font size="2"><br>Increases the power of the <span style="color:#21caec">Green Quarks</span> upgrade by 2x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#64beb0">Particles</span></b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.900);
                let cost = base.pow(x).times(0.500);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Particles', 22).pow_base(2)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#21caec'>Blue Quarks</span><br>----------------<br>The"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.500).log(1.900) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Particles', 22))) setBuyableAmount('Particles', 22, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return getBuyableAmount("Particles", 12).gte(5)},
    
        },
    },
     tabFormat: {
        "Particles": {
            content: [ 
                ["infobox", "CropLore"],
                ['display-text',function(){return '<h4>You have  '+quickBigColor(format(player.points),'#e4f1ef') +' <span style="color:#e4f1ef">Particles</span>.'}],
                ["display-text",
                    function() {return "--------"},
                    {"color": "#e4f1ef", "font-size": "32px"}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#e4f1ef", "font-size": "32px"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#e4f1ef", "font-size": "32px"}],
                        "buyables",   
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#e4f1ef", "font-size": "32px"}],  
                        "milestones",
                    
            ]
            
        },
        "Luminosity": {
            unlocked() {return hasMilestone('Particles', 0)||player.Levels.best.gte(1)},
            buttonStyle: {"border-color": "#ffe497"},
            embedLayer: 'Levels',
        },
    },
    infoboxes:{
        CropLore: {
         title: "Introduction",
         titleStyle: {'color': '#000000'},
         body: "Actually fill this in later idiot",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})