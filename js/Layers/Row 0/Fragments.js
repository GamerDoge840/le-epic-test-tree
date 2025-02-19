addLayer("Fragments", {
    name: "Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⠀", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fcf4e1",
    requires: new Decimal("1000"), // Can be a function that takes requirement increases into account
    resource: "Fragments", // Name of prestige currency
    //autoUpgrade() {return hasUpgrade('Glory', 22)},
    resetDescription: "Combine Shards to create Fragments of something greater.<br>----------------<br>",
    baseResource: "Shards", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
            title: "The Fractured Core",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F▢] The Fractured Core</span></b><font size="2"><br>Use Fragments to begin rebuilding the Core.<br>-------------<br>Core Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            effect() {
                effect = new Decimal(3.00)
                if (hasUpgrade('Fragments', 21)) effect = effect.times(1.6667)
                if (hasUpgrade('Fragments', 24)) effect = effect.times(1.40)
                return effect
              },  
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>The Fractured Core</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Effect boosts Shards gain."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#757573',
                    "width": "200px",
            "height": "165px",
            "border-radius": "5px",
            'border-color': 'rgba(0, 0, 0, 0.125)',
            'background': 'linear-gradient(#fcf4e1, #ffebb2)',
            

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#ffcf5a' ,
                    "width": "300px",
            "height": "125px",
            "border-radius": "5px",
            'border-color': 'yellow',
                'color': 'white',
                //'background': 'linear-gradient(#fcf4e1, #ffcd7a)',

                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'background-color': '#ffcf5a' ,
                    "width": "400px",
            "height": "200px",
            "border-radius": "5px",
            'border-color': '#8eff00',
                'color': 'white',
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Rebuilding I",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F11] Rebuilding I</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding I</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by exactly 1.6667x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "Bonus Column",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F12] Bonus Column</span></b><font size="2"><br>Unlocks a new column of uninteresting but helpful Shard upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Bonus Column</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Fragmented Shards",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F13] Fragmented Shards</span></b><font size="2"><br>Every total Fragment formed boosts Shards gain by 1.10x compounding, but only until 10 total Fragments.<br>-------------<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            effect() {
                let eff = player.Fragments.total.pow_base(1.10);
                return eff.min(256);
            }, 
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Fragmented Shards</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            title: "Rebuilding II",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F14] Rebuilding II</span></b><font size="2"><br>The Fractured Core's base effect is stronger.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragment`},        
            cost: new Decimal(1),
            branches: [11],
            unlocked() {return hasUpgrade("Fragments", 11)},
            tooltip() {return "<span style='color:#ffffff'>Rebuilding II</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts the Fractured Core's effect by 1.40x."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "Need for Speed",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>[F21] Need for Speed</span></b><font size="2"><br>Doubles Shards gain, but only when under a single Shard.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Fragments`},        
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("Fragments", 21) && hasUpgrade("Fragments", 22) && hasUpgrade("Fragments", 23) && hasUpgrade("Fragments", 24)},
            tooltip() {return "<span style='color:#ffffff'>Need for Speed</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffebb2',
                    "width": "200px",
            "height": "165px",
            'border': '5px solid',
            'border-color': '#fcf4e1',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'border': '3px solid, #fffeb2',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "200px",
            "height": "165px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#fcf4e1',
                'color': 'black',
                        "width": "225px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: [
                ["display-text",
                    function() {return '<span style="color:#fcf4e1">'+format(player.Fragments.points)+' Fragments'},
                    {"font-size": "30px"}],
            ["display-text",
                function() {return "--------------------"},
                {"color": "#fcf4e1", "font-size": "32px"}],
                function() {if (hasUpgrade("Shards", 12)) return "prestige-button"}, 
                ["raw-html", function() {if (!hasUpgrade("Shards", 12)) return 'To form fragments, you need Shard upgrade S02.'}],
                ["display-text",
                    function() {return '('+format(player.points)+' Shards)'},
                    {"font-size": "14px"}],   
                    ["display-text",
                        function() {return "(<span style='color:#fcf4e1'>"+format(player.Fragments.total)+" total Fragments</span>)"},
                        {"color": "#fcf4e1", "font-size": "12px"}],      
                        "blank",
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#fcf4e1", "font-size": "32px"}],
                            ["infobox", "FragmentLore"],
                            
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#fcf4e1", "font-size": "32px"}],
                                "blank",
                            ["upgrades", [1]],
                            "blank",    
                            ["upgrades", [2, 3]],                        ["display-text",
                                function() {return "--------------------"},
                                {"color": "#fcf4e1", "font-size": "32px"}],
                                
                            "buyables",
                
            
                            ],
    infoboxes:{
        FragmentLore: {
         title: "Forming Fragments",
         titleStyle: {'color': '#000000'},
         body: "Combines all of your Shards, resetting them and their upgrades in exchange for Fragments to be spent on new upgrades.",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})