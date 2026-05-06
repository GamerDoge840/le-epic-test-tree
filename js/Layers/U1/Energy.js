addLayer("e", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#f4ffd9",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image':('radial-gradient(circle at center, #bebe8e, #f4ffd9'),
            "width": 65,
        "height": 65,
        }
    },
    requires: new Decimal("0.1"), // Can be a function that takes requirement increases into account
    resource: "Prestige", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    resetDescription: "Reset Essence, but gain Prestige.<br>―――――――――――<br>",
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Energy<br>――――――――――――――<br> <font size='2'><span style='color:#f4ffd9'> " +format(player.points)+" Energy</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    milestones: {
    },
    upgrades: {
        11: {
            fullDisplay() {return `<font size="2"><b>[E11] Vacuumic Extraction</b><font size="1"><br>Enables Energy generation.<br>――――――――――――――――――<br>
                Effect: `+formatSmall(getPointGen())+`/s <br>――――――――――――――――――<br>
                Cost: Free`},        
            unlocked() { return true },
            cost: new Decimal(0),
            tooltip() {return "<span style='color:#ffffff'>[E11] Vacuumic Extraction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        12: {
            fullDisplay(){
                if (!upgradeEffect(this.layer, this.id).gte("1000")) return `<font size="2"><b>[E12] Friction</b><font size="1"><br>Boost Energy gain based on Energy upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy` 
                if (upgradeEffect(this.layer, this.id).gte("1000")) return `<font size="2"><b>[E12] Friction</b><font size="1"><br>Boost Energy gain based on Energy upgrades bought.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br><span style='color:red'>[SOFTCAPPED]</span <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},
            unlocked() { return hasUpgrade("e", 11) },
            effect() {
                let eff = Decimal.pow(1.25, player.e.upgrades.length);
                scpow = 0.50
                eff = softcap(eff, new Decimal("1000"), scpow)
                return eff;
            },
            cost: new Decimal(0.0050),
            tooltip() {return "<span style='color:#ffffff'>[E12] Friction</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay(){
                return `<font size="2"><b>[E13] Energy from Nothing</b><font size="1"><br>Boost Energy gain.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 12) },
            effect() {
                eff = new Decimal(1.25)
                if (hasUpgrade("e", 21)) eff = eff.times(upgradeEffect("e", 21))
                if (hasUpgrade("e", 31)) eff = eff.times(upgradeEffect("e", 31))
                if (hasUpgrade("e", 33)) eff = eff.times(upgradeEffect("e", 33))
                return eff
            },
            cost: new Decimal(0.0090),
            tooltip() {return "<span style='color:#ffffff'>[E13] Energy from Nothing</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay(){
                return `<font size="2"><b>[E14] Buyables</b><font size="1"><br>Unlock a repeatable buyable upgrade.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 13) },
            cost: new Decimal(0.0170),
            tooltip() {return "<span style='color:#ffffff'>[E14] Buyables</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        21: {
            fullDisplay(){
                return `<font size="2"><b>[E21] Upgrades from Nothing</b><font size="1"><br>E13 is `+format(upgradeEffect(this.layer, this.id))+`x as strong.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return getBuyableAmount("e", 11).gte(10) && hasUpgrade("e", 14) },
            cost: new Decimal(0.0410),
            effect() {
                eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[E21] Upgrades from Nothing</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        22: {
            fullDisplay(){
                return `<font size="2"><b>[E22] Accumulation from Nothing</b><font size="1"><br>Accumulators are `+format(upgradeEffect(this.layer, this.id))+`x as strong.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 21) },
            cost: new Decimal(0.0700),
            effect() {
                eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[E22] Accumulation from Nothing</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },    
        23: {
            fullDisplay(){
                if (!upgradeEffect(this.layer, this.id).gte("100")) return `<font size="2"><b>[E23] Energy Synergy</b><font size="1"><br>Energy boosts itself.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`
                if (upgradeEffect(this.layer, this.id).gte("100")) return `<font size="2"><b>[E23] Energy Synergy</b><font size="1"><br>Energy boosts itself.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br><span style='color:red'>[SOFTCAPPED]</span><br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`},
            unlocked() { return hasUpgrade("e", 22) },
            effect() {
                let eff = player.points.plus(1).log10().pow(0.55).plus(1);
                scpow = 0.50
                eff = softcap(eff, new Decimal("100"), scpow)
                return eff;
            },
            cost: new Decimal(0.125),
            tooltip() {return "<span style='color:#ffffff'>[E23] Energy Synergy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        24: {
            fullDisplay(){
                return `<font size="2"><b>[E24] Buyables, II</b><font size="1"><br>Unlock another repeatable buyable upgrade.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 23) },
            cost: new Decimal(0.160),
            tooltip() {return "<span style='color:#ffffff'>[E24] Buyables, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        31: {
            fullDisplay(){
                return `<font size="2"><b>[E31] Buyable-Upgrade Synergism</b><font size="1"><br>Accumulators boost the effect of E13 at a reduced rate.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return getBuyableAmount("e", 12).gte(13) && hasUpgrade("e", 24) },
            effect() {
                let eff = buyableEffect('e', 11).pow(0.25);
                return eff
            },
            cost: new Decimal(0.55),
            tooltip() {return "<span style='color:#ffffff'>[E31] Buyable-Upgrade Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        32: {
            fullDisplay(){
                return `<font size="2"><b>[E32] Accumulation from Nothing, II</b><font size="1"><br>Accumulator-2s are `+format(upgradeEffect(this.layer, this.id))+`x as strong.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 31) },
            cost: new Decimal(1),
            effect() {
                eff = new Decimal(1.25)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[E32] Accumulation from Nothing, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
            

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        33: {
            fullDisplay(){
                return `<font size="2"><b>[E33] Energy-Upgrade Synergy</b><font size="1"><br>Energy boosts E13, but this is eventually hardcapped.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 32) },
            cost: new Decimal(2),
            effect() {
 	            let eff = player.points.plus(2).pow(0.1);
                let hardcap =  new Decimal(1.5)
                return eff.min(hardcap);
            },
            tooltip() {return "<span style='color:#ffffff'>[E33] Energy-Upgrade Synergy</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFFFFF'>Initial hardcap is 1.50x, later increased by upgrades"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        }, 
        34: {
            fullDisplay(){
                return `<font size="2"><b>[E34] Buyables, III</b><font size="1"><br>Unlock another repeatable buyable upgrade.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 33) },
            cost: new Decimal(3),
            tooltip() {return "<span style='color:#ffffff'>[E34] Buyables, III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        41: {
            fullDisplay(){
                return `<font size="2"><b>[E41] Buyable-Buyable Synergism</b><font size="1"><br>Accumulator-3s boost Accumulator-2s at a reduced rate.<br>――――――――――――――――――<br>
                Effect:  `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return getBuyableAmount("e", 13).gte(12) && hasUpgrade("e", 34) },
            effect() {
                let eff = buyableEffect('e', 13).pow(0.5);
                return eff
            },
            cost: new Decimal(8),
            tooltip() {return "<span style='color:#ffffff'>[E41] Buyable-Buyable Synergism</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        42: {
            fullDisplay(){
                return `<font size="2"><b>[E42] Accumulation from Nothing, III</b><font size="1"><br>Accumulator-3s are `+format(upgradeEffect(this.layer, this.id))+`x as strong.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 41) },
            cost: new Decimal(13),
            effect() {
                eff = new Decimal(1.1)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[E42] Accumulation from Nothing, III</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        43: {
            fullDisplay(){
                return `<font size="2"><b>[E43] Energy from Nothing, II</b><font size="1"><br>Boost Energy gain by `+format(upgradeEffect(this.layer, this.id))+`x.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 42) },
            cost: new Decimal(20),
            effect() {
                eff = new Decimal(1.5)
                return eff
            },
            tooltip() {return "<span style='color:#ffffff'>[E43] Energy from Nothing, II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        44: {
            fullDisplay(){
                return `<font size="2"><b>[E44] Charge Unlock</b><font size="1"><br>Unlocks the first reset layer.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Energy`}, 
            unlocked() { return hasUpgrade("e", 43) },
            cost: new Decimal(30),
            tooltip() {return "<span style='color:#ffffff'>[E44] Charge Unlock</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#FFEB00'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#f4ffd9',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#bebe8e',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },             
    },
    buyables: {
          11: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Accumulator</b>
                <font size="2">Boosting Energy gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.35);
                let cost = base.pow(x).times(0.0010);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('e', 11).mul(0.10).plus(1)
                if (hasUpgrade("e", 22)) eff = eff.times(upgradeEffect("e", 22))
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
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0010).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('e', 11))) setBuyableAmount('e', 11, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>[E11-B] Accumulator</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain with every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("e", 14)},
    
        },
        12: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Accumulator-2</b>
                <font size="2">Boosting Energy gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.35);
                let cost = base.pow(x).times(0.0050);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('e', 12).mul(0.05).plus(1)
                if (hasUpgrade("e", 32)) eff = eff.times(upgradeEffect("e", 32))
                if (hasUpgrade("e", 41)) eff = eff.times(upgradeEffect("e", 41))
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
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0050).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('e', 12))) setBuyableAmount('e', 12, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>[E12-B] Accumulator-2</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain with every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("e", 24)},
    
        },
        13: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Accumulator-3</b>
                <font size="2">Boosting Energy gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Energy</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(0.0100);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('e', 13).mul(0.025).plus(1)
                if (hasUpgrade("e", 42)) eff = eff.times(upgradeEffect("e", 42))
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
            buyMax() {
                let max = player.points.div(this.cost(0)).add(0.0100).log(1.35) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('e', 13))) setBuyableAmount('e', 13, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>[E13-B] Accumulator-3</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Boosts Energy gain with every purchase."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "125px",
                'background-color':'#bebe8e', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("e", 34)},
    
        },
    },
     tabFormat: {
        "Energy": {
        style() {return  {'background-color': '#12120F'}},
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Energy'},
            {"color": "#f4ffd9", "font-size": "30px"}],
            ["raw-html", function() {if (hasUpgrade("e", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+"/s)"}, 
                {"color": "#f4ffd9", "font-size": "20px"}],             
                                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "EnergyTabs"],

                ]
            
        },
    },
        microtabs: {
            EnergyTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],
                    ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ]]]],
                    ["column", [ ["row", [ ["upgrade", 21], ["upgrade", 22], ["upgrade", 23], ["upgrade", 24], ]]]],
                    ["column", [ ["row", [ ["upgrade", 31], ["upgrade", 32], ["upgrade", 33], ["upgrade", 34], ]]]],
                    ["column", [ ["row", [ ["upgrade", 41], ["upgrade", 42], ["upgrade", 43], ["upgrade", 44], ]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],   
                    ["raw-html", function() {if (hasUpgrade("e", 14) && !getBuyableAmount("e", 11).gte(10)) return 'Next row of upgrades unlocked at '+formatWhole(getBuyableAmount("e", 11))+'/10 Accumulators'}, {"color": "#f4ffd9", "font-size": "23px"}],
                    ["raw-html", function() {if (hasUpgrade("e", 24) && !getBuyableAmount("e", 12).gte(13)) return 'Next row of upgrades unlocked at '+formatWhole(getBuyableAmount("e", 12))+'/13 Accumulator-2s'}, {"color": "#f4ffd9", "font-size": "23px"}],
                    ["raw-html", function() {if (hasUpgrade("e", 34) && !getBuyableAmount("e", 13).gte(12)) return 'Next row of upgrades unlocked at '+formatWhole(getBuyableAmount("e", 13))+'/12 Accumulator-3s'}, {"color": "#f4ffd9", "font-size": "23px"}],
                    "blank",
                        "blank",
                    ]
                },
                "Buyables": {
                    unlocked() { return hasUpgrade("e", 14) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],
                    ["column", [ ["row", [ ["buyable", 11], ["buyable", 12], ["buyable", 13], ]]]],
                  ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#f4ffd9", "font-size": "32px"}],                        
                    "blank",
                        "blank",
                    ]
                },
            }
        },
})