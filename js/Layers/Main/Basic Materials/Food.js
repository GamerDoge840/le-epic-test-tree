addLayer("Food", {
    name: "Food", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        foodPoints: new Decimal(0),
        foodGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Food Gain
        player.Food.foodGain = new Decimal(0.05)

        //Food Boosts
        if (hasUpgrade('Research', 2)) player.Food.foodPoints = player.Food.foodPoints.add(player.Food.foodGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})