addLayer("BeanTier", {
    name: "BeanTier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BEAN", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked() { return hasMilestone("Factory", 0) },
		points: new Decimal(0),
        tierPoints: new Decimal(0),
        tpGain: new Decimal(0),
        bestBeanTier: new Decimal(0.00001),
        bestTP: new Decimal(0.0001)
    }},
    color: "#D4B739",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "amogus", // Name of prestige currency
    resetsNothing() {return true},
    canBuyMax() {return true},
    autoPrestige() {return hasMilestone("Factory", 0)},
    baseAmount() {return player.BeanTier.tierPoints}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        //Fix Stupid Doubling
        if (player.BeanTier.points.gte(1)) mult = mult.times(5)
        //Milestones
        if (hasMilestone('Factory', 1007)) mult = mult.dividedBy(tmp.Factory.milestones[1007].effect)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        //Exponent Boosts
        if (hasMilestone("Factory", 9)) exp = exp.times(1.20)
        exp=exp.times(buyableEffect('Factory', 7))
        return exp
    },
    update(delta){
        //Base TP Gain
        player.BeanTier.tpGain = new Decimal(0.10)
        //Buyables
        player.BeanTier.tpGain = player.BeanTier.tpGain.mul(buyableEffect("Gold", 6))
        player.BeanTier.tpGain = player.BeanTier.tpGain.mul(buyableEffect("Money", 6))
        player.BeanTier.tpGain = player.BeanTier.tpGain.mul(buyableEffect("Factory", 8))
        //Factory Milestones
        if (hasMilestone("Factory", 1)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone("Factory", 2)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone("Factory", 3)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone("Factory", 4)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone("Factory", 5)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone("Factory", 6)) player.BeanTier.tpGain = player.BeanTier.tpGain.mul(20)
        if (hasMilestone('Factory', 1004)) player.BeanTier.tpGain = player.BeanTier.tpGain.times(tmp.Factory.milestones[1004].effect)
        //Can Generate TP?
        if (hasMilestone("Factory", 0)) player.BeanTier.tierPoints = player.BeanTier.tierPoints.add(player.BeanTier.tpGain.mul(1).mul(delta))
        //Get Best TP and Tier
        if (player.BeanTier.bestBeanTier.lt(player.BeanTier.points)) player.BeanTier.bestBeanTier = player.BeanTier.points
        if (player.BeanTier.bestTP.lt(player.BeanTier.tierPoints)) player.BeanTier.bestTP = player.BeanTier.tierPoints
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
	return 0
    },
    onPrestige(){
     player.BeanTier.tierPoints = new Decimal(0)
},
    beanEffect() {
        let eff = player.BeanTier.points.pow_base(2.2);
         return eff
    },
    moneyEffect() {
        let eff = player.BeanTier.points.pow_base(1.10);
        if (hasMilestone('Factory', 10)) eff = eff.times(2)
        return eff
    },
    goldEffect() {
        let eff = player.BeanTier.points.pow_base(1.05);
        return eff
    },
    wattEffect() {
        let eff = player.BeanTier.points.pow_base(1.01);
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