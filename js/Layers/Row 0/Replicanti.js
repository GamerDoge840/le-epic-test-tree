addLayer("Replicanti", {
    name: "Replicanti", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "𐒴", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e8c375",
    nodeStyle() {
        return {
            'border': '4px solid #ffe497',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "???", // Name of prestige currency
    resetDescription: "???<br>----------<br>",
    baseResource: "Replicanti", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<span style='color:#e8c375'>" +formatWhole(player.points)+" Replicanti</span>"
        if(player.Replicanti.total.gte(1)) tooltip = tooltip + "<br><span style='color:#ffe497'>" +formatWhole(player.Dust.points)+" Dust</span>"
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
    
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Replicator I",
            fullDisplay() {return `<font size="3"><b><span style='color:#e8c375'>Replicator I</span></b><font size="2"><br>Boosts Replicanti gain based on itself.<br>-----------------<br><b>Currently: `+format(upgradeEffect(this.layer, this.id))+`x</b><br>-----------------<br>Cost: 0.0010 <span style='color:#e8c375'>Replicanti</span>`},    
            cost: new Decimal(0.0010),
            currencyInternalName: "points",
            effect() {
                let eff = player.points.plus(1).log(2).pow(0.15).plus(1);
                return eff;
            },
            tooltip() {return "<span style='color:#e8c375'>Replicator I</span><br>----------------<br><span style='font-size:11px'><span style='color:#7d837c'>The beginning."},
            style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#8e7030',
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#696969' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                    else if (canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#8fd7be' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                },
        },
    },
        buyables: {
            rows: 5,
            cols: 4,
            11: {
                display() {return `<font size="3"><b><span style="color:#e8c375">[`+format(getBuyableAmount(this.layer, this.id), 0)+`] R1 Booster</span></b><font size="2"><br>Increases R1's power by `+format(tmp[this.layer].buyables[this.id].effect) +`x<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style="color:#e8c375">Repli.</span></b> <br>-----------------<br>`},
                cost(x) {
                    let base = new Decimal(1.50);
                    let cost = base.pow(x).times(1);
                    return cost;
                  },
                  effect() {
                    let eff = getBuyableAmount('Replicanti', 11)
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
                tooltip() {return "<span style='color:#e8c375'>R1 Booster</span><br>----------------<br>"},
                buyMax() {
                    let max = player.points.div(this.cost(0)).add(1).log(1.50) //add is cost, log is base
                    max = max.min(this.purchaseLimit())
                    if(max.gt(getBuyableAmount('Replicanti', 11))) setBuyableAmount('Replicanti', 11, max.add(1).floor())
                },
                style() {
                    return {
                    "width": "140px",
                "height": "108px",
                'border': '5px solid',
                    'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                },
                unlocked() { return hasUpgrade("Replicanti", 11) },
        
            },
    },
     tabFormat: {
        "Replicanti": {
            content: [ 
                ["infobox", "CropLore"],
                ['display-text',function(){return '<h4>You have  '+quickBigColor(format(player.points),'#e8c375') +' <span style="color:#e8c375">Replicanti</span>.'}],
                ["display-text",
                    function() {return "--------"},
                    {"color": "#e8c375", "font-size": "32px"}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#e8c375", "font-size": "32px"}],
                            ["row", [ ["upgrade", 11],["buyables", 11],]],

                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#e8c375", "font-size": "32px"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#e8c375", "font-size": "32px"}],  
                        "milestones",
                    
            ]
            
        },
    },
    infoboxes:{
        CropLore: {
         title: "Introduction",
         titleStyle: {'color': '#000000'},
         body: "Actually fill this in later idiot",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})