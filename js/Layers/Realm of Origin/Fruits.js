addLayer("Fruits", {
    name: "Fruits", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Fr", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone('Level', 4)},
        apples: new Decimal(0),
        appleGain: new Decimal(0),
        bestApples: new Decimal(0),
        pears: new Decimal(0),
        pearGain: new Decimal(0),
        bestPears: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(500deg, #C3FA89, #C96A57)",
            'border': '2px solid #ffffff',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    tooltip() {
        let tooltip = "<font size='3'>Fruits<br>――――――――――――――<br>"
        if(hasUpgrade('Fruits', 11)) tooltip = tooltip + "<font size='2'><span style='color:#DA8F81'>"+format(player.Fruits.apples)+" Apples<br></font>"
        if(hasUpgrade('Fruits', 13)) tooltip = tooltip + "<font size='2'><span style='color:#C3FA89'>"+format(player.Fruits.pears)+" Pears</font>"
        return tooltip
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    branches: ["Essence"],
    layerShown(){return hasMilestone('Level', 4)},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
update(delta) {
        let onepersec = new Decimal(1)

        //Base Gain
        player.Fruits.appleGain = new Decimal(0.1)
        player.Fruits.pearGain = new Decimal(0.1)

        //Best Fruits
        if (player.Fruits.bestApples.lt(player.Fruits.apples)) player.Fruits.bestApples = player.Fruits.apples
        if (player.Fruits.bestPears.lt(player.Fruits.pears)) player.Fruits.bestPears = player.Fruits.pears

        //Apple Gain
        player.Fruits.appleGain = player.Fruits.appleGain.times(buyableEffect('Fruits', 1))
        player.Fruits.appleGain = player.Fruits.appleGain.times(buyableEffect('Fruits', 3))
        if (hasUpgrade('Fruits', 11)) player.Fruits.apples = player.Fruits.apples.add(player.Fruits.appleGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        //Pear Gain
        player.Fruits.pearGain = player.Fruits.pearGain.times(buyableEffect('Fruits', 4))
        player.Fruits.pearGain = player.Fruits.pearGain.times(buyableEffect('Fruits', 6))
        if (hasUpgrade('Fruits', 13)) player.Fruits.pears = player.Fruits.pears.add(player.Fruits.pearGain.mul(delta))
        
        },
        
    milestones: {
    },
    upgrades: {  
        11: {
            fullDisplay() {return `<font size="2"><b>[FR11] Apples</b><font size="1"><br>Unlocks Apples and two Apple upgrades.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasMilestone('Level', 4) },
            cost: new Decimal(15000),
            tooltip() {return "<span style='color:#ffffff'>[FR11] Apples</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C96A57',
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
                'background-color': '#E86348',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },  
        12: {
            fullDisplay() {return `<font size="2"><b>[FR12] Apples II</b><font size="1"><br>Unlocks one more Apple upgrade.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade('Fruits', 11) },
            cost: new Decimal(75000),
            tooltip() {return "<span style='color:#ffffff'>[FR12] Apples II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#C96A57',
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
                'background-color': '#E86348',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        13: {
            fullDisplay() {return `<font size="2"><b>[FR13] Pears</b><font size="1"><br>Unlocks Pears and two Pear upgrades.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasMilestone('Level', 6) },
            cost: new Decimal(1e7),
            tooltip() {return "<span style='color:#ffffff'>[FR13] Pears</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#97C26B',
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
                        'border-color': '#549D07',
                'background-color': '#6CC908',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        14: {
            fullDisplay() {return `<font size="2"><b>[FR14] Pears II</b><font size="1"><br>Unlocks one more Pear upgrade.<br>――――――――――――――――――<br>
                Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+` Essence`},        
            unlocked() { return hasUpgrade('Fruits', 13) },
            cost: new Decimal(5e7),
            tooltip() {return "<span style='color:#ffffff'>[FR14] Pears II</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            currencyInternalName: "points",
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#97C26B',
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
                        'border-color': '#549D07',
                'background-color': '#6CC908',
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
        1: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Apple Boosters</b>
                <font size="2">Which boost Apple gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Apples</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.5);
                return cost;
              },
            canAfford() { if (player.Fruits.apples.gte(this.cost())) {return true}},
            effect() {
                let eff = getBuyableAmount('Fruits', 1).mul(1).plus(1)
                return eff
            },      
            buy() {
                player.Fruits.apples = player.Fruits.apples.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Fruits.apples.div(this.cost(0)).add(0.5).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 1))) setBuyableAmount('Fruits', 1, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Apple Boosters</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Apple gain by 100%"},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 11)},
    
        },
        2: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Essence Apples</b>
                <font size="2">Which boost Essence gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Apples</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.40);
                let cost = base.pow(x).times(1);
                return cost;
              },
            canAfford() { if (player.Fruits.apples.gte(this.cost())) {return true}},
            effect() { 
                        return getBuyableAmount('Fruits', 2).pow_base(1.05) },         
            buy() {
                player.Fruits.apples = player.Fruits.apples.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Fruits.apples.div(this.cost(0)).add(1).log(1.40) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 2))) setBuyableAmount('Fruits', 2, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Essence Apples</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Essence gain by 5% compounding."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 11)},
    
        },
        3: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Apple Pickers</b>
                <font size="2">Which boost Apple gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Apples</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(2);
                return cost;
              },
            canAfford() { if (player.Fruits.apples.gte(this.cost())) {return true}},
            effect() { 
                        return getBuyableAmount('Fruits', 3).pow_base(1.15) },         
            buy() {
                player.Fruits.apples = player.Fruits.apples.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Fruits.apples.div(this.cost(0)).add(2).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 3))) setBuyableAmount('Fruits', 3, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Apple Pickers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Apple gain by 15% compounding."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#DA8F81', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 12)},
    
        },
        4: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Pear Boosters</b>
                <font size="2">Which boost Pear gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Pears</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.30);
                let cost = base.pow(x).times(0.5);
                return cost;
              },
            canAfford() { if (player.Fruits.pears.gte(this.cost())) {return true}},
            effect() {
                let eff = getBuyableAmount('Fruits', 4).mul(1).plus(1)
                return eff
            },        
            buy() {
                player.Fruits.pears = player.Fruits.pears.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1000)
                return cap
            },
            buyMax() {
                let max = player.Fruits.pears.div(this.cost(0)).add(0.5).log(1.30) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 4))) setBuyableAmount('Fruits', 4, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Pear Boosters</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Pear gain by 100%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 13)},
    
        },
        5: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Level Pears</b>
                <font size="2">Which boost Level effect by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Pears</b><br><b>`},
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(1);
                return cost;
              },
            canAfford() { if (player.Fruits.pears.gte(this.cost())) {return true}},
            effect() {
                let eff = getBuyableAmount('Fruits', 5).mul(0.10).plus(1)
                return eff
            },        
            buy() {
                player.Fruits.pears = player.Fruits.pears.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(25)
                return cap
            },
            buyMax() {
                let max = player.Fruits.pears.div(this.cost(0)).add(1).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 5))) setBuyableAmount('Fruits', 5, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Level Pears</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Level effect by 10%."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 13)},
    
        },
        6: {
            display() {return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`/`+formatWhole(tmp[this.layer].buyables[this.id].purchaseLimit)+`)<br>Pear Pickers</b>
                <font size="2">Which boost Pear gain by ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b><br>―――――――――――――――――――――――
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Pears</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.5);
                let cost = base.pow(x).times(2);
                return cost;
              },
            canAfford() { if (player.Fruits.pears.gte(this.cost())) {return true}},
            effect() { 
                        return getBuyableAmount('Fruits', 6).pow_base(1.15) },           
            buy() {
                player.Fruits.pears = player.Fruits.pears.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            buyMax() {
                let max = player.Fruits.pears.div(this.cost(0)).add(2).log(1.5) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Fruits', 6))) setBuyableAmount('Fruits', 6, max.add(1).floor())
            },
            tooltip() {return "<span style='color:#ffffff'>Pear Pickers</span><br>――――――――――――<br><span style='font-size:11px'><span style='color:#7d837c'>Each purchase boosts Pear gain by 15% compounding."},
            style() {
                if(!this.canAfford()){return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "200px",
                "height": "150px",
                'background-color':'#C3FA89', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return hasUpgrade("Fruits", 14)},
    
        },
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: {
        "Fruits": {
        buttonStyle: {"background": "linear-gradient(900deg, #549D07, #7B3628)", "color":"black"},
        style() {return  {"background": "linear-gradient(900deg, #0D1801, #130806)",}},
        content: [
            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["style-column", [
                        ["column", [ ["row", [ ["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ]]]],
                     ], {width: "700px", height: "200px", backgroundColor: "#5E5D5D", border: "3px solid #BABABA", borderRadius: "10px"}],

                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                    ["microtabs", "FruitTabs"]
                ]
            
        },
    },
    
        microtabs: {
            FruitTabs: {
                "All":
                {
                content: [
                    ["raw-html", function() {if (hasUpgrade('Fruits', 11)) {return '―――――――――――――――――――――――――――――'}}, {"color": "#FFFFFF", "font-size": "30px"}],
                    ["raw-html", function() {if (hasUpgrade('Fruits', 11)) {return ''+format(player.Fruits.apples)+' Apples'}}, {"color": "#DA8F81", "font-size": "30px"}],

                    ["raw-html", function() {if (hasUpgrade('Fruits', 11)) return "(+" + format(player.Fruits.appleGain.mul(1)) + "/s)"}, {"color": "#EECFC9", "font-size": "20px"}],
                    "blank",
                    ["raw-html", function() {if (hasUpgrade('Fruits', 13)) {return ''+format(player.Fruits.pears)+' Pears'}}, {"color": "#C3FA89", "font-size": "30px"}],
                    ["raw-html", function() {if (hasUpgrade('Fruits', 13)) return "(+" + format(player.Fruits.pearGain.mul(1)) + "/s)"}, {"color": "#C7E6A8", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Fruits', 11)) {return '―――――――――――――――――――――――――――――'}}, {"color": "#FFFFFF", "font-size": "30px"}],
                ]
                },
                "Apples": {
                    unlocked() { return hasUpgrade("Fruits", 11) },
                    buttonStyle: {"border-color": "#C96A57"},
                    content: [
                        ["style-column", [
                            ["display-text",
                           function() {return ''+format(player.Fruits.apples)+' Apples'},
                           {"color": "#DA8F81", "font-size": "30px"}],
                           ["raw-html", function() {if (hasUpgrade('Fruits', 11)) return "(+" + format(player.Fruits.appleGain.mul(1)) + "/s)"}, {"color": "#EECFC9", "font-size": "20px"}],
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 2], ]]]],
                    ["column", [ ["row", [ ["buyable", 3] ]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],

                     ], {width: "500px", height: "450px", backgroundColor: "#783123", border: "3px solid #BABABA", borderRadius: "10px"}],
                     "blank",
                    ]
                },
                "Pears": {
                    unlocked() { return hasUpgrade("Fruits", 13) },
                    buttonStyle: {"border-color": "#C3FA89"},
                    content: [
                        ["style-column", [
                            ["display-text",
                           function() {return ''+format(player.Fruits.pears)+' Pears'},
                           {"color": "#C3FA89", "font-size": "30px"}],
                           ["raw-html", function() {if (hasUpgrade('Fruits', 13)) return "(+" + format(player.Fruits.pearGain.mul(1)) + "/s)"}, {"color": "#C7E6A8", "font-size": "20px"}],
                        ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ["column", [ ["row", [ ["buyable", 4], "blank", ["buyable", 5], ]]]],
                    ["column", [ ["row", [ ["buyable", 6] ]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],

                     ], {width: "500px", height: "450px", backgroundColor: "#43572F", border: "3px solid #BABABA", borderRadius: "10px"}],
                     "blank",
                    ]
                },
            },
        },
})