addLayer("BeanLevel", {
    name: "BeanLevel", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BEAN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() { return hasMilestone("Beans", 0) },
		points: new Decimal(0),
    }},
    color: "#ffb441",
    requires: new Decimal("2"), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    resetsNothing() {return true},
    canBuyMax() {return true},
    autoPrestige() {return hasMilestone("Beans", 0)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.77, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.dividedBy(buyableEffect('Beans', 2))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
    },
    effect() {
         let eff = player.BeanLevel.points.mul(0.2).add(1).pow(1.15)
         return eff
    },
milestones: {
},
    upgrades: {
        rows: 9,
        cols: 9,
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
})