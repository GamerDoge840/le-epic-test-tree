addLayer("Research", {
    name: "Research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧪", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6DB5B2",
    nodeStyle() {
        return {
            'border': '3px solid #42EDEA',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    tooltip() {
        let tooltip = "<span style='color:#ddeded'>" +formatWhole(player.points)+" Research</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
     11: {    
            title: "Reboot Systems",
            fullDisplay() {return `<font size="3"><b>[R01] Boot Systems</b><font size="2"><br>Reactivate and begin to research your surroundings.<br>――――――――――――――――――<br>Currently: `+format(getPointGen()) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(1),
            currencyInternalName: "points",
            unlocked() {return true},
            tooltip() {return "<span style='color:#ffffff'>Boot Systems</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Your creators ejected you to a distant, remote temperate planet after realizing a programming mistake.<br><br> The only thing your mechanical brain can comprehend is expansion, extraction, and building."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
            title: "Scan Surroundings",
            fullDisplay() {return `<font size="3"><b>[R02] Scan Surroundings</b><font size="2"><br>Doubles Research output.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.0200),
            currencyInternalName: "points",
            branches: ["Research", 11],
            unlocked() {return hasUpgrade("Research", 11)},
            tooltip() {return "<span style='color:#ffffff'>Scan Surroundings</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Your vessel crash-landed in a lush valley featuring numerous rocks and fauna.<br><br>  Could they be used for something?"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
            title: "Scan Plant",
            fullDisplay() {return `<font size="3"><b>[R03] Scan Plant</b><font size="2"><br>Increase Research output by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.0500),
            currencyInternalName: "points",
            branches: ["Research", 12],
            unlocked() {return hasUpgrade("Research", 12)},
            tooltip() {return "<span style='color:#ffffff'>Scan Plant</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Uproot a small bush and scan it's roots, fibers, and leaves.<br><br>“Give me the plant.”"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
            title: "Scan Rock",
            fullDisplay() {return `<font size="3"><b>[R04] Scan Rock</b><font size="2"><br>Increase Research output by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.0500),
            currencyInternalName: "points",
            branches: ["Research", 12],
            unlocked() {return hasUpgrade("Research", 12)},
            tooltip() {return "<span style='color:#ffffff'>Scan Rock</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Scan a mineral laying in the grass to see it's composition."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        15: {    
            title: "Scan Cliff",
            fullDisplay() {return `<font size="3"><b>[R05] Scan Cliff</b><font size="2"><br>Increase Research output by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.13),
            currencyInternalName: "points",
            branches: ["Research", 14],
            unlocked() {return hasUpgrade("Research", 14)},
            tooltip() {return "<span style='color:#ffffff'>Scan Cliff</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Analyze the composition of a nearby rocky cliff face."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        16: {    
            title: "Scan Tree",
            fullDisplay() {return `<font size="3"><b>[R06] Scan Tree</b><font size="2"><br>Increase Research output by 1.25x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.13),
            currencyInternalName: "points",
            branches: ["Research", 13],
            unlocked() {return hasUpgrade("Research", 13)},
            tooltip() {return "<span style='color:#ffffff'>Scan Tree</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Scan a larger type of plant comprised of a strange fibrous substance."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        17: {    
            title: "Analyze Dirt",
            fullDisplay() {return `<font size="3"><b>[R07] Analyze Dirt</b><font size="2"><br>Doubles Research output.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.18),
            currencyInternalName: "points",
            branches: ["Research", 13, "Research", 12, "Research", 14],
            unlocked() {return hasUpgrade("Research", 15) && hasUpgrade("Research", 16)},
            tooltip() {return "<span style='color:#ffffff'>Analyze Dirt</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Collect a sample of the soil around the crashsite to analyze it's components."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#6DB5B2',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
                'background-color': '#d8ffc4',
                'color': 'black',
                        "width": "185px",
            "height": "175px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        18: {    
            title: "Biomass",
            fullDisplay() {return `<font size="3"><b>[R08] Biomass</b><font size="2"><br>Unlocks Biomass, the first major category of materials.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.50),
            currencyInternalName: "points",
            branches: ["Research", 17],
            unlocked() {return hasUpgrade("Research", 17)},
            tooltip() {return "<span style='color:#ffffff'>Biomass</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Being a mixture of water, associated organic materials, minerals and even gases, dirt is an interesting substance.<br><br> I will require much more than just meagre, tiny samples of this in order to further research and my understanding of this world."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C6E8BE',
                    "width": "185px",
            "height": "175px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

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
     tabFormat: {
        "Research Tree": {
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Research'},
            {"color": "#6DB5B2", "font-size": "30px"}],
                                            ["raw-html", function() {if (hasUpgrade("Research", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Research/s)"}, {"font-size": "30px"}],                  
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#6DB5B2", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "ResearchTabs"],

                ]
            
        },
    },
        microtabs: {
            ResearchTabs: {
                "TL0": {
                    content: [
                        ["display-text",
                    function() {return "Tech Level 0: Neolithic"},
                    {"font-size": "32px"}],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#6DB5B2", "font-size": "32px"}],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 16], "blank", ["upgrade", 11], "blank", [ "upgrade", 15],]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 13], "blank", ["upgrade", 12], "blank", [ "upgrade", 14],]]]],
                        "blank",
                        ["column", [ ["row", [ [ "upgrade", 17],]]]],
                        "blank",
                        ["column", [ ["row", [ [ "upgrade", 18],]]]],


                    ]
                },
            }
        },
})