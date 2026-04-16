addLayer("Biomass", {
    name: "Biomass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BIO", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        biomassPoints: new Decimal(0),
        biomassGain: new Decimal(0)
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
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Biomass Gain
        player.Biomass.biomassGain = new Decimal(0.001)

        //Biomass Boosts
        if (hasUpgrade('Biomass', 12)) player.Biomass.biomassGain = player.Biomass.biomassGain.mul(2)
        if (hasUpgrade('Biomass', 13)) player.Biomass.biomassGain = player.Biomass.biomassGain.mul(2)
        if (hasUpgrade('Biomass', 14)) player.Biomass.biomassGain = player.Biomass.biomassGain.mul(1.5)
        if (hasUpgrade('Biomass', 15)) player.Biomass.biomassGain = player.Biomass.biomassGain.mul(1.5)
        if (hasUpgrade('Biomass', 11)) player.Biomass.biomassPoints = player.Biomass.biomassPoints.add(player.Biomass.biomassGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
    tooltip() {
        let tooltip = "<font size='3'>[T1] Biological Resources<br>――――――――――――――<br> <font size='2'><span style='color:#C6E8BE'> " +formatWhole(player.Biomass.biomassPoints)+" Biomass</span>"
        return tooltip
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('Research', 18)},
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Dirt Collection Arm",
            fullDisplay() {return `<font size="3"><b>[B01] Dirt Collection Arm</b><font size="2"><br>Begin automatically collecting Biomass.<br>――――――――――――――――――<br>Currently: `+ (format(getResetGain("Biomass").div(100))) +`/s<br>――――――――――――――――――<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Research`},        
            cost: new Decimal(0.004),
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
            cost: new Decimal(0.02),
            branches: ["Biomass", 11],
            currencyLocation() { return player.Biomass },
            currencyInternalName: "biomassPoints",
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
            cost: new Decimal(0.0450),
            branches: ["Biomass", 11],
            currencyLocation() { return player.Biomass },
            currencyInternalName: "biomassPoints",
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
            cost: new Decimal(0.0950),
            branches: ["Biomass", 13],
            currencyLocation() { return player.Biomass },
            currencyInternalName: "biomassPoints",
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
            cost: new Decimal(0.0950),
            branches: ["Biomass", 12],
            currencyLocation() { return player.Biomass },
            currencyInternalName: "biomassPoints",
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
            function() {return ''+format(player.Biomass.biomassPoints)+' Biomass'},
            {"color": "#C6E8BE", "font-size": "30px"}],
            
           ["raw-html", function() {if (hasUpgrade("Biomass", 11)) return "<font size='5'>("+format(player.Biomass.biomassGain)+" Biomass/s)"}],
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
                "Upgrades": {
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