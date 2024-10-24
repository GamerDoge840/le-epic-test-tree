addLayer("Level", {
    name: "Level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#69c0f6",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("250"), // Can be a function that takes requirement increases into account
    resource: "Levels", // Name of prestige currency
    resetDescription: "Level up.<br>----------<br>",
    autoUpgrade() {return hasUpgrade('Honor', 23)},
    baseResource: "Prestige", // Name of resource prestige is based on
    resetsNothing: true,
    autoPrestige() {return hasUpgrade("Honor", 22)},
    canBuyMax() {return hasUpgrade("Honor", 13)},
    baseAmount() {return player.Prestige.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Prestige', 44)) mult = mult.dividedBy(upgradeEffect('Prestige', 44))
        if (hasUpgrade('Honor', 31)) mult = mult.dividedBy(upgradeEffect('Honor', 31))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    addToBase() {
        let base = new Decimal(0);
        return base;
    },
    effectBase() {
        let base = new Decimal(1.10);
        base = base.plus(tmp.Level.addToBase);
        return base.pow(tmp.Level.power);
    },
    power() {
        let power = new Decimal(1);
        if (hasUpgrade('Honor', 32)) power = power.times(upgradeEffect('Honor', 32))
        if (hasUpgrade('Prestige', 64) && hasUpgrade('Prestige', 51)) power = power.times(upgradeEffect('Prestige', 64))
        return power;
    },
    effect() {
        return Decimal.pow(tmp.Level.effectBase, player.Level.points);
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    bars: {
        levelbar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {return new Decimal(tmp.Level.baseAmount).dividedBy(getNextAt(this.layer, true))},
            display() {
                return "<h5>" + format(player.Prestige.points) + "/" + formatWhole(tmp.Level.nextAt) + "<h5> Prestige to next Level.</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#667cea' },
        },
},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        if (hasUpgrade('Honor', 21)) keptUpgrades.push(13)
        if (hasUpgrade('Honor', 22)) keptUpgrades.push(21)
        if (hasUpgrade('Honor', 23)) keptUpgrades.push(22)
        if (hasUpgrade('Honor', 33)) keptUpgrades.push(23)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 5,
        cols: 4,
        11: {    
            title: "Level-Powered Prestige",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Level-Powered Prestige</span></b><font size="2"><br>Prestige gain is boosted based on your current Levels divided by five.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(4),
            effect() {
                let eff = player.Level.points.div(5).add(1);
                return eff
              },   
            unlocked() {return hasUpgrade("Prestige", 51)},
            tooltip() {return "<span style='color:#ffffff'>Level-Powered Prestige</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        12: {    
            title: "Level-Powered Essence",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Level-Powered Essence</span></b><font size="2"><br>Levels give an additional boost to Essence also based on their amount divided by 5.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(6),
            effect() {
                let eff = player.Level.points.div(5).add(1);
                return eff
              },   
            unlocked() {return hasUpgrade("Level", 11)},
            tooltip() {return "<span style='color:#ffffff'>Level-Powered Essence</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        13: {    
            title: "The Prestige Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>The Prestige Generator</span></b><font size="2"><br>Passively generates 5% of Prestige gained on reset per second.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(7),  
            unlocked() {return hasUpgrade("Level", 12)},
            tooltip() {return "<span style='color:#ffffff'>The Prestige Generator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Enough switching between tabs!"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        21: {    
            title: "Improved Prestige Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Improved Prestige Generator</span></b><font size="2"><br>Passive Prestige generation improved from 5% ---> 25%.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(9),  
            unlocked() {return hasUpgrade("Level", 13)},
            tooltip() {return "<span style='color:#ffffff'>Improved Prestige Generator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        22: {    
            title: "Perfect Prestige Generator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Perfect Prestige Generator</span></b><font size="2"><br>Passive Prestige generation improved from 25% ---> 100% and remove the ability to perform the Prestige reset.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(13),  
            unlocked() {return hasUpgrade("Level", 21)},
            tooltip() {return "<span style='color:#ffffff'>Perfect Prestige Generator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        23: {    
            title: "Prestige Expansion",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestige Expansion</span></b><font size="2"><br>Unlock a new column of Prestige upgrades.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(17),  
            unlocked() {return hasUpgrade("Level", 22)},
            tooltip() {return "<span style='color:#ffffff'>Prestige Expansion</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#69c0f6',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#667cea' ,
                    "width": "200px",
            "height": "175px",
                    }
                }
            },
        },
        31: {    
            title: "Honor",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Honor</span></b><font size="2"><br>Unlocks Honor.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Levels</span>`},        
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("Level", 23)},
            tooltip() {return "<span style='color:#ffffff'>Honor</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#faff92',
                    "width": "200px",
            "height": "175px",
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "300px",
            "height": "175px",
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "300px",
            "height": "175px",
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
                ['display-text',function(){return '<h4>You are at <span style="color:#69c0f6">Level '+quickBigColor(format(player.Level.points),'#69c0f6') +'</span>,'}],
                ["display-text",
                    function() {return "which boosts Essence by <span style='color:#69c0f6'> "+ format(tmp.Level.effect) +"x</span>."},
                    {"font-size": "16px"}],
                "blank",
                 "prestige-button",
                 "blank",
                 ["display-text",
                    function() {return "--------------------"},
                    {"color": "#69c0f6", "font-size": "32px"}],
                    ['display-text',function(){return '<span style="color:#31aeb0">'+format(player.Prestige.points)+' Prestige</span>'}],
                    ["bar", "levelbar"],
                    ["raw-html", function() {if (hasUpgrade("Level", 22)) return "<font size='3'>(+" + (format(getResetGain("Prestige"))) + " Prestige/s)"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#69c0f6", "font-size": "32px"}],
                        ["upgrades", [1, 2]],
                        "blank",
                        ["upgrades", [3]],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#69c0f6", "font-size": "32px"}],
                    
                        ],
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})