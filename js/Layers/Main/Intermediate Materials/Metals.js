addLayer("Metals", {
    name: "Metals", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        metalPoints: new Decimal(0),
        metalGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Metal Gain
        player.Metals.metalGain = new Decimal(0.005)

        //Metal Boosts
        if (hasUpgrade('Research', 23)) player.Metals.metalGain = player.Metals.metalGain.mul(tmp.Homeworld.buyables[102].effect)
        if (hasUpgrade('Research', 25)) player.Metals.metalGain = player.Metals.metalGain.mul(tmp.Homeworld.buyables[3].effect2)
        if (hasUpgrade('Research', 28))  player.Metals.metalGain = player.Metals.metalGain.mul(1.10)
        if (hasUpgrade('Culture', 2))  player.Metals.metalGain = player.Metals.metalGain.mul(1.025)
        if (hasUpgrade('Workshop', 22)) player.Metals.metalGain = player.Metals.metalGain.mul(1.05)
        if (hasUpgrade('Workshop', 26)) player.Metals.metalGain = player.Metals.metalGain.mul(1.10)
        if (hasUpgrade('Culture', 5))  player.Metals.metalGain = player.Metals.metalGain.mul(1.025)
        if (hasUpgrade('Research', 42)) player.Metals.metalGain = player.Metals.metalGain.mul(tmp.Homeworld.buyables[1].effect4)

        if (getBuyableAmount("Homeworld", 102).gte(1)) player.Metals.metalPoints = player.Metals.metalPoints.add(player.Metals.metalGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})