addLayer("Essence", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '5px solid #666363',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    branches: ["Charge"],
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Essence<br>――――――――――――――<br> <font size='2'><span style='color:#fcffc5'> " +formatWhole(player.points)+" Energy</span>"
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
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        if (hasUpgrade('Essence', 1111)) keptUpgrades.push(61)
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    milestones: {
    },
    upgrades: {        
        rows: 4,
        cols: 4,
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            costBase() { return new Decimal(1) },
            costGrowth() { return new Decimal(1.2) },
            purchaseLimit() { return new Decimal(40) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) {
                if (hasUpgrade("Essence", 111)) return new Decimal(1)
                return getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
            },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Essence Booster I"
            },
            display() {
                return "which are boosting reverse engineering rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Essence"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("Essence", 1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("Essence", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', background: "linear-gradient(15deg, #5f5f5fff 0%, #c5c5c5ff 50%, #5f5f5fff 100%)",
 }
        },
    },
     tabFormat: {
        "Essence": {
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Essence'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            
                                            ["raw-html", function() {if (hasUpgrade("Essence", 11)) return "<font size='4'>(+"+formatSmall(getPointGen())+" Essence/s)"}, {"font-size": "30px"}],                  
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "EssenceTabs"],

                ]
            
        },
    },
        microtabs: {
            EssenceTabs: {
                "Generation": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["ex-buyable", 11],]]]],


                    ]
                },
            }
        },
})