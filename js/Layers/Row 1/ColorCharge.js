addLayer("ColorCharge", {
    name: "ColorCharge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fff86e",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image': 'linear-gradient( #fff86e, #fcffc5)',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1e9"), // Can be a function that takes requirement increases into account
    resource: "Color Charge", // Name of prestige currency
    branches: ["Charge", "Quarks"],
    resetDescription: "Empower your Charge.<br>――――――――――――――――<br>",
    baseResource: "Charge", // Name of resource prestige is based on
    baseAmount() {return player.Charge.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.33, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Color Charge<br>――――――――――――――<br> <font size='2'><span style='color:#fff888'> " +formatWhole(player.ColorCharge.points)+" Color</span> <span style='color:#fcffc5'>Charge</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('ColorCharge', 21)) mult = mult.dividedBy(upgradeEffect('ColorCharge', 21))
        mult=mult.dividedBy(buyableEffect('Quarks', 12))
        if (hasUpgrade('ColorCharge', 23)) mult = mult.dividedBy(upgradeEffect('ColorCharge', 23))
        if (hasUpgrade('Quarks', 42)) mult = mult.dividedBy(upgradeEffect('Quarks', 42))
        if (hasUpgrade('ColorCharge', 31)) mult = mult.dividedBy(upgradeEffect('ColorCharge', 31))
        if (hasUpgrade('Quarks', 44)) mult = mult.dividedBy(upgradeEffect('Quarks', 44))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("Charge", 1012) || player.ColorCharge.total.gte(1)},
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
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Empowered Charge",
            fullDisplay() {return `<font size="3"><b>[CC11] Empowered Charge</span><font size="2"><br>Boost Charge based on total Color Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.ColorCharge.total.plus(2).pow(0.75);
                return eff;
            },
            unlocked() {return player.ColorCharge.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {    
            title: "Energy Automation III",
            fullDisplay() {return `<font size="3"><b>[CC12] Energy Automation III</span><font size="2"><br>Passively autobuy E21-B without spending Charge and triple Energy and Charge gain.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("ColorCharge", 11)},
            tooltip() {return "<span style='color:#ffffff'>Energy Automation III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {    
            title: "Empowered Energy",
            fullDisplay() {return `<font size="3"><b>[CC13] Empowered Energy</span><font size="2"><br>Boost Energy based on total Color Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(2),
            effect() {
                let eff = player.ColorCharge.total.plus(2).pow(0.85);
                return eff;
            },
            unlocked() {return hasUpgrade("ColorCharge", 12)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Energy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {    
            title: "Energy Automation IV",
            fullDisplay() {return `<font size="3"><b>[CC14] Energy Automation IV</span><font size="2"><br>Autobuy all upgrades in the Energy layer, and keep C23 on Row 1 resets.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(3),
            unlocked() {return hasUpgrade("ColorCharge", 13)},
            tooltip() {return "<span style='color:#ffffff'>Energy Automation IV</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {    
            title: "Energetic Color Charge",
            fullDisplay() {return `<font size="3"><b>[CC21] Energetic Color Charge</span><font size="2"><br>Divide Color Charge's requirement based on Energy.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`÷<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(4),
            effect() {
                let eff = player.points.plus(1).log10().pow(3).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("ColorCharge", 14)},
            tooltip() {return "<span style='color:#ffffff'>Energetic Color Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {    
            title: "Empowered Strength",
            fullDisplay() {return `<font size="3"><b>[CC22] Empowered Strength</span><font size="2"><br>Boost Energy and Charge based on current Color Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(5),
            effect() {
                let eff = player.ColorCharge.points.plus(2).pow(1.10);
                return eff;
            },
            unlocked() {return hasUpgrade("ColorCharge", 21)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Strength</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        23: {    
            title: "Charged Color Charge",
            fullDisplay() {return `<font size="3"><b>[CC23] Charged Color Charge</span><font size="2"><br>Divide Color Charge's requirement based on Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`÷<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(6),
            effect() {
                let eff = player.Charge.points.plus(1).log10().pow(5).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("ColorCharge", 22)},
            tooltip() {return "<span style='color:#ffffff'>Charged Color Charge</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {    
            title: "Empowered Quarks",
            fullDisplay() {return `<font size="3"><b>[CC24] Empowered Quarks</span><font size="2"><br>Current amount of Color Charge boosts Quarks.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(7),
            effect() {
                let eff = player.ColorCharge.points.plus(2).pow(0.50);
                return eff;
            },
            unlocked() {return hasUpgrade("ColorCharge", 23)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {    
            title: "Self-Empowerment",
            fullDisplay() {return `<font size="3"><b>[CC31] Self-Empowerment</span><font size="2"><br>Divide Color Charge's requirement by 250x compounding per current CC.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(8),
            effect() {
                let eff = player.ColorCharge.points.pow_base(250);
                return eff;
            }, 
            unlocked() {return hasUpgrade("ColorCharge", 24)},
            tooltip() {return "<span style='color:#ffffff'>Self-Empowerment</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {    
            title: "Quark Age Empowerment",
            fullDisplay() {return `<font size="3"><b>[CC32] Quark-Age Empowerment</span><font size="2"><br>Each current CC boosts Energy, Charge and Quarks by a flat 1.25x.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(10),
            effect() {
                let eff = player.ColorCharge.points.mul(0.25).plus(1);
                return eff;
            }, 
            unlocked() {return hasUpgrade("ColorCharge", 31)},
            tooltip() {return "<span style='color:#ffffff'>Quark Age Empowerment</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {    
            title: "Empowered Potential",
            fullDisplay() {return `<font size="3"><b>[CC33] Empowered Potential</span><font size="2"><br>Boosts E14 based on Color Charge upgrades bought.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(12),
            effect() {
                let eff = Decimal.pow(1.03, player.ColorCharge.upgrades.length);
                return eff;
            },
            unlocked() {return hasUpgrade("ColorCharge", 32)},
            tooltip() {return "<span style='color:#ffffff'>Empowered Potential</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        34: {    
            title: "Charged Quarks",
            fullDisplay() {return `<font size="3"><b>[CC34] Charged Quarks</span><font size="2"><br>Boosts Quark gain based on Charge.<br>――――――――――――――――――<br>Effect: `+format(upgradeEffect(this.layer, this.id))+`x<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` CC`},        
            cost: new Decimal(13),
            effect() {
                let eff = player.Charge.points.plus(1).log10().pow(0.30);
                return eff;
            }, 
            unlocked() {return hasUpgrade("ColorCharge", 33)},
            tooltip() {return "<span style='color:#ffffff'>Charged Quarks</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#ff7474'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#fcffc5',
                    "width": "185px",
            "height": "175px",
            "background-image": 'url("resources/colorcharge.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',

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
                        'border-color': '#8eff00',
                'background-color': '#fff300',
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
    tabFormat: {
        "Color Charge": {
            content: [
                    "blank",
                        ["display-text",
                            function() {return ''+format(player.ColorCharge.points)+' <span style="color:#fff888">Color</span>  <span style="color:#fcffc5">Charge</span>'},
                            {"color": "#fff86e", "font-size": "35px"}],
                            ["display-text",
                                function() {return '――――――――――――――――'},
                                {"color": "#fff86e", "font-size": "30px"}],
                                function() {if (hasUpgrade("Charge", 1012)) return "prestige-button"},
                                ["raw-html", function() {if (!hasUpgrade("Charge", 1012)) return 'You need the Universal Energetics upgrade to create Color Charge.'}, {"font-size": "22px"}],
                                "blank",
                                ["display-text",
                                    function() {return '――――――――――――――――'},
                                    {"color": "#fff86e", "font-size": "30px"}],
                                    ["display-text",
                                        function() {return ''+format(player.Charge.points)+' Charge'},
                                        {"color": "#fff888", "font-size": "17px"}],
                                        ["raw-html", function() {if (player.ColorCharge.total.gte(1)) return ''+formatWhole(player.ColorCharge.total)+' total <span style="color:#fff888">Color</span>  <span style="color:#fcffc5">Charge</span>'}, {"color": "#fff86e", "font-size": "17px"}],
                                        ["display-text",
                                            function() {return '――――――――――――――――'},
                                            {"color": "#fff86e", "font-size": "30px"}],
                                            "blank",
                                            "upgrades",

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