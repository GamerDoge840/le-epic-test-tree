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
        player.Food.foodGain = player.Food.foodGain.mul(buyableEffect("Homeworld", 1))
        player.Food.foodGain = player.Food.foodGain.mul(buyableEffect("Homeworld", 101))
        player.Food.foodGain = player.Food.foodGain.mul(buyableEffect("Homeworld", 105))
        if (hasUpgrade('Research', 13)) player.Food.foodGain = player.Food.foodGain.mul(1.50)
        if (hasUpgrade('Workshop', 7)) player.Food.foodGain = player.Food.foodGain.mul(1.05)
        if (hasUpgrade('Research', 21)) player.Food.foodGain = player.Food.foodGain.mul(1.05)
        if (hasUpgrade('Workshop', 10)) player.Food.foodGain = player.Food.foodGain.mul(1.05)
        if (hasUpgrade('Workshop', 12)) player.Food.foodGain = player.Food.foodGain.mul(1.25)
        if (hasUpgrade('Workshop', 13)) player.Food.foodGain = player.Food.foodGain.mul(1.05)
        if (hasUpgrade('Workshop', 14)) player.Food.foodGain = player.Food.foodGain.mul(1.10)

        //Penalties
        player.Food.foodGain = player.Food.foodGain.dividedBy(tmp.Homeworld.buyables[100].consumption)
        player.Food.foodGain = player.Food.foodGain.dividedBy(tmp.Homeworld.buyables[104].consumption)

        if (hasUpgrade('Research', 2)) player.Food.foodPoints = player.Food.foodPoints.add(player.Food.foodGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})