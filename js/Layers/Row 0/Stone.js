addLayer("Stone", {
    name: "Stone", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ⓟ", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#e4f1ef",
    nodeStyle() {
        return {
            'border': '6px solid #64beb0',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "Sussy", // Name of prestige currency
    resetsNothing: true,
    autoPrestige: true,
    canBuyMax: true,
    resetDescription: "Become just a lil Sussy<br>----------<br>",
    baseResource: "Sussium", // Name of resource prestige is based on
    baseAmount() {return player.StoneBlocks.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
})