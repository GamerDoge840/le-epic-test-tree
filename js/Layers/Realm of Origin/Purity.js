addLayer("Purity", {
    name: "Purity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return hasMilestone('Level', 8)},
        purity: new Decimal(0),
        purityGain: new Decimal(0),
        bestPurity: new Decimal(0),
        purityResets: new Decimal(0)
    }},
    color: "#FFE5FA",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    branches: ["Level", "Fruits"],
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Purity<br>――――――――――――――<br> <font size='2'><span style='color:#FFE5FA'> " +formatWhole(player.Purity.purity)+" Purity</span>"
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
    layerShown(){return hasMilestone('Level', 8)},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
    },
    buyables: {
    },
    challenges: {
    },
    clickables: {
        1: {
            title() { return "<font size='5'>Sell your Beans for Money.<br><font size='4'>(Requires Level 48 and 1 Billion Essence)" },
            canClick() { return hasMilestone('Level', 8) && player.points.gte(1e9)},
            unlocked() { return hasMilestone('Level', 8) },
            onClick() {
                layers.Purity.moneyReset()
                player.Purity.purity = player.Purity.purity.add(player.Purity.purityGain)
                player.Purity.purityResets = player.Money.purityResets.add(1)
            },
            style: {' width': '400px', 'min-height': '100px', 'borderRadius': '15px', 'background-image': 'radial-gradient(circle at center, #FFE5FA, #E6FCFC)', },
        },
    },
     tabFormat: {
        "Purity": {
        content: [
                ]
            
        },
    },
})