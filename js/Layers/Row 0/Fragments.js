addLayer("Fragments", {
    name: "Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⠀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    nodeStyle() {
        return {
            'border': '1px solid white',
            'background-image': 'radial-gradient(circle at center,rgb(255, 232, 211),rgb(213, 213, 213))',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("0.025"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Form Essence into Prestige.<br>----------<br>",
    baseResource: "Essence", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Broken Star<br>----------------<br> <font size='2'><span style='color:#ffffff'> " +formatWhole(player.points)+" Shards</span>"
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
    passiveGeneration() {
	return 0
    },
    //bars: {
        //stonebar: {
            //direction: RIGHT,
            //width: 600,
            //height: 50,
            //instant: true,
            //progress() {return new Decimal(tmp.StoneBlocks.baseAmount).dividedBy(getNextAt(this.layer, true))},
           // baseStyle: { 'background-color': 'black' },
            //fillStyle: { 'background-color': '#a4deff' },
       // },
//},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 9,
        cols: 9,
        11: {    
            title: "Born Anew",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S01] Born Anew</span></b><font size="2"><br>Start gathering Shards.<br>-------------<br>Currently: `+format(getPointGen()) +`/s<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Born Anew</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Birth of recreation."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#B9B9AF' ,
                    "width": "300px",
            "height": "175px",
            'border-color': 'yellow',
                'color': 'white'
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "300px",
            "height": "175px",
                    }
                }
            },
        },
        21: {    
            title: "Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S11] Double</span></b><font size="2"><br>Double Shards gain.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0100),
            //branches: [11],
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Double</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        22: {    
            title: "Half-Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S12] Half-Double</span></b><font size="2"><br>Increase Shards gain by 1.50x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0250),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 21)},
            tooltip() {return "<span style='color:#ffffff'>Half-Double</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        23: {    
            title: "Quarter-Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S13] Quarter-Double</span></b><font size="2"><br>Increase Shards gain by 1.25x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0400),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 22)},
            tooltip() {return "<span style='color:#ffffff'>Quarter-Double</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        24: {    
            title: "Tenth of Two",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S14] Tenth of Two</span></b><font size="2"><br>Increase Shards gain by 1.10x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0600),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 23)},
            tooltip() {return "<span style='color:#ffffff'>Tenth of Two</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        31: {    
            title: "Third of Two",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S21] Third of Two</span></b><font size="2"><br>Increase Shards gain by 1.30x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.0700),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 24)},
            tooltip() {return "<span style='color:#ffffff'>Third of Two</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        32: {    
            title: "Half-Double, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S22] Half-Double, Again</span></b><font size="2"><br>Increase Shards gain by 1.50x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.12),
            currencyInternalName: "points",
            unlocked() { return getBuyableAmount("Fragments", 11).gte(5)},            
            tooltip() {return "<span style='color:#ffffff'>Half-Double, Again</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        33: {    
            title: "Third of Two, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S23] Third of Two, Again</span></b><font size="2"><br>Increase Shards gain by 1.30x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.30),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 32)},
            tooltip() {return "<span style='color:#ffffff'>Third of Two, Again</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        34: {    
            title: "Quarter-Double, Again",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S24] Quarter-Double, Again</span></b><font size="2"><br>Increase Shards gain by 1.25x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.40),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 33)},
            tooltip() {return "<span style='color:#ffffff'>Quarter-Double, Again</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        41: {    
            title: "More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S31] More Repeatable</span></b><font size="2"><br>S11-B can be purchased three more times.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 34)},
            tooltip() {return "<span style='color:#ffffff'>More Repeatable</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        42: {    
            title: "Almost Double",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S32] Almost Double</span></b><font size="2"><br>Increase Shards gain by 1.99x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(0.75),
            currencyInternalName: "points",
            unlocked() { return getBuyableAmount("Fragments", 11).gte(8)}, 
            tooltip() {return "<span style='color:#ffffff'>Almost Double</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        43: {    
            title: "Faster Gathering",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S33] Faster Gathering</span></b><font size="2"><br>Shards boost their own gain, albeit weakly.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(1.75),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log10().pow(0.9).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("Fragments", 42)},
            tooltip() {return "<span style='color:#ffffff'>Faster Gathering</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
        44: {    
            title: "Even More Repeatable",
            fullDisplay() {return `<font size="3"><b><span style='color:#9d9d9d'>[S34] Even More Repeatable</span></b><font size="2"><br>S11-B can be purchased two more times.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Shards`},        
            cost: new Decimal(2.50),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Fragments", 43)},
            tooltip() {return "<span style='color:#ffffff'>Even More Repeatable</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border-color': '#bdbda1',
                'background-color': '#757573',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#757573',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b><b><span style='color:#9d9d9d'>[S11-B] Repeatable Tenth</span></b></b><font size="2"><br>Increases Shards gain by 1.10x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Shards</b> <br>-----------------<br><b>Amount: `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+`</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(1.750);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Fragments', 11).mul(0.10).plus(1)
                return eff
            },   
            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(5)
                if (hasUpgrade('Fragments', 41)) cap = cap.times(1.60)
                if (hasUpgrade('Fragments', 44)) cap = cap.times(1.25)
                return cap
            },
            tooltip() {return "Repeatable Tenth<br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.750) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fragments', 11))) setBuyableAmount('Fragments', 11, max.add(1).floor())
            },
            style() {
                return {
                'background-color': '#757573',
                    "width": "325px",
            "height": "175px",
            //"background-image": 'url("resources/glorygradient.png")',        
                    //'background-position': 'center center',
                     //'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Fragments", 31) },
    
        },
    },
     tabFormat: {
        "Shards": {
            //style() {return  {'background-color': '#292929'}},
            content: [
                ["display-text",
                    function() {return ''+format(player.points)+' Shards'},
                    {"font-size": "30px"}],
                    ["display-text",
                        function() {return '(+'+formatSmall(getPointGen())+' Shards/s)'},
                        {"font-size": "17px"}],              
                        "blank",
                 "blank",
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#9d9d9d", "font-size": "32px"}],
                            ["upgrades", [1, 2, 3, 4]],
                            "blank",                            ["display-text",
                                function() {return "--------------------"},
                                {"color": "#9d9d9d", "font-size": "32px"}],
                            "buyables",
                    
            ]
            
        },
    },
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})