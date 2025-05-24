addLayer("RedQuarks", {
    name: "RedQuarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Wat", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff856f",
    requires: new Decimal("1e9"), // Can be a function that takes requirement increases into account
    resource: "Red Quarks", // Name of prestige currency
    resetDescription: "Charge Quarks into the color Red.<br>――――――――――――――――<br>",
    baseResource: "Quarks", // Name of resource prestige is based on
    baseAmount() {return player.Quarks.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.55, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("Quarks", 1011)},
    passiveGeneration() {
	return 0
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    onPrestige(){
        player["Quarks"].points = new Decimal(0)

},
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Red Quark Starter",
            fullDisplay() {return `<font size="3"><b>[RQ11] Red Quark Starter</b><font size="2"><br>Triple Energy, Charge, and Quarks gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Red Quarks`},        
            cost: new Decimal(1),
            unlocked() {return player.RedQuarks.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Red Quark Starter</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ff856f, #f9d6ff)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ff856f',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            title: "Energy Buyables Cap Extension",
            fullDisplay() {return `<font size="3"><b>[RQ12] Energy Buyables Cap Extension</b><font size="2"><br>Multiply the purchase caps of E11-B and E12-B by 10.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Red Quarks`},        
            cost: new Decimal(2),
            unlocked() {return hasUpgrade("RedQuarks", 11)},
            tooltip() {return "<span style='color:#ffffff'>Energy Buyables Cap Extension</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ff856f, #f9d6ff)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ff856f',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            title: "Dynamic Quarks",
            fullDisplay() {return `<font size="3"><b>[RQ13] Dynamic Quarks</span><font size="2"><br>E21-B boosts Quarks at a slightly halved rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Red Quarks`},        
            cost: new Decimal(2),
            effect() {
                let eff = buyableEffect('Charge', 21).pow(0.35).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("RedQuarks", 12)},
            tooltip() {return "<span style='color:#ffffff'>Dynamic Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ff856f, #f9d6ff)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ff856f',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Quark Accumulator",
            fullDisplay() {return `<font size="3"><b>[RQ14] Quark Accumulator</span><font size="2"><br>E11-B boosts Quarks at a very reduced rate.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Red Quarks`},        
            cost: new Decimal(5),
            effect() {
                let eff = buyableEffect('Charge', 11).pow(0.15).plus(1);
                return eff;
            },
            unlocked() {return hasUpgrade("RedQuarks", 13)},
            tooltip() {return "<span style='color:#ffffff'>Quark Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            'background': 'linear-gradient(#ff856f, #f9d6ff)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#ff856f',
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
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
 "blank",
                        ["display-text",
                            function() {return ''+format(player.RedQuarks.points)+' Red Quarks'},
                            {"color": "#ff856f", "font-size": "35px"}],
                            ["display-text",
                                    function() {return '――――――――――――――――'},
                                    {"color": "#ff856f", "font-size": "30px"}],
                                    "prestige-button",
                                    ["display-text",
                                    function() {return '――――――――――――――――'},
                                    {"color": "#ff856f", "font-size": "30px"}],
                                    ["display-text",
                                        function() {return ''+format(player.Quarks.points)+' Quarks'},
                                        {"color": "#f7ebff", "font-size": "17px"}],
                                        ["display-text",
                                    function() {return '――――――――――――――――'},
                                    {"color": "#ff856f", "font-size": "30px"}],
                                    "blank",
                                    "upgrades",
                
            
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