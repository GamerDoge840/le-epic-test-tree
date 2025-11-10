addLayer("Biomass", {
    name: "Biomass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌿", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasUpgrade('Research', 18)},
		points: new Decimal(0),
    }},
    color: "#C6E8BE",
    nodeStyle() {
        return {
            'border': '3px solid #4B7338',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("0.0000001"), // Can be a function that takes requirement increases into account
    resource: "Biomass", // Name of prestige currency
    baseResource: "Research", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.00000000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>[T1] Biological Resources<br>――――――――――――――<br> <font size='2'><span style='color:#C6E8BE'> " +formatWhole(player.Biomass.points)+" Biomass</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('Biomass', 12)) mult = mult.times(2)
        if (hasUpgrade('Biomass', 13)) mult = mult.times(2)
        if (hasUpgrade('Biomass', 14)) mult = mult.times(1.5)
        if (hasUpgrade('Biomass', 15)) mult = mult.times(1.5)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('Research', 18)},
    passiveGeneration() {
        if (hasUpgrade('Biomass', 11)) return 0.01
	return 0
    },
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Dirt Collection Arm",
            fullDisplay() {return `<font size="3"><b>[B01] Dirt Collection Arm</b><font size="2"><br>Begin automatically collecting Biomass.<br>――――――――――――――――――<br>Currently: `+ (format(getResetGain("Biomass").div(100))) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.2),
            currencyInternalName: "points",
            unlocked() {return hasUpgrade("Research", 18)},
            tooltip() {return "<span style='color:#ffffff'>Dirt Collection Arm</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Some of the vessel's solar-powered mechanical arms remain undamaged by the crash.<br><br>Let's mobilize them and put them to use, for science."},
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
        12: {    
            title: "Wood Collection Arm",
            fullDisplay() {return `<font size="3"><b>[B02] Wood Collection Arm</b><font size="2"><br>Doubles Biomass output.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Biomass`},        
            cost: new Decimal(0.2),
            branches: ["Biomass", 11],
            unlocked() {return hasUpgrade("Biomass", 11)},
            tooltip() {return "<span style='color:#ffffff'>Wood Collection Arm</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Peels bark off of trees and picks twigs off the ground."},
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
        13: {    
            title: "Plant Collection Arm",
            fullDisplay() {return `<font size="3"><b>[B03] Plant Collection Arm</b><font size="2"><br>Doubles Biomass output.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Biomass`},        
            cost: new Decimal(0.450),
            branches: ["Biomass", 11],
            unlocked() {return hasUpgrade("Biomass", 11)},
            tooltip() {return "<span style='color:#ffffff'>Plant Collection Arm</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Rips leaves off of branches and grass out of the ground."},
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
        14: {    
            title: "Forager Arm",
            fullDisplay() {return `<font size="3"><b>[B04] Forager Arm</b><font size="2"><br>Increases Biomass output by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Biomass`},        
            cost: new Decimal(0.950),
            branches: ["Biomass", 13],
            unlocked() {return hasUpgrade("Biomass", 13)},
            tooltip() {return "<span style='color:#ffffff'>Forager Arm</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Gathers nearby berries, roots, and plant material with high nutritional value to the native organisms."},
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
        15: {    
            title: "Mud Collector Arm",
            fullDisplay() {return `<font size="3"><b>[B05] Mud Collector</b><font size="2"><br>Increases Biomass output by 1.50x.<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Biomass`},        
            cost: new Decimal(0.950),
            branches: ["Biomass", 12],
            unlocked() {return hasUpgrade("Biomass", 12)},
            tooltip() {return "<span style='color:#ffffff'>Mud Collector</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Collects a slimy mixture of soil and water off the ground that might have some uses."},
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
        
        "Biomass": {
        content: [
        ["display-text",
            function() {return ''+format(player.Biomass.points)+' Biomass'},
            {"color": "#C6E8BE", "font-size": "30px"}],
            
           ["raw-html", function() {if (hasUpgrade("Biomass", 11)) return "<font size='5'>(+" + (format(getResetGain("Biomass").div(100))) + " Biomass/s)"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#C6E8BE", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "BiomassTabs"],

                ]
            
        },
    },
        microtabs: {
            BiomassTabs: {
                "Production": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 15], "blank", ["upgrade", 11], "blank", ["upgrade", 14],]]]],
                        "blank",
                        ["column", [ ["row", [ ["upgrade", 12], "blank", ["upgrade", 13],]]]],
                        "blank",
                    ]
                },
            }
        },
})