addLayer("Minerals", {
    name: "Minerals", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        mineralPoints: new Decimal(0),
        mineralGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Mineral Gain
        player.Minerals.mineralGain = new Decimal(0.03)

        //Mineral Boosts
        player.Minerals.mineralGain = player.Minerals.mineralGain.mul(buyableEffect("Homeworld", 3))
        player.Minerals.mineralGain = player.Minerals.mineralGain.mul(buyableEffect("Homeworld", 105))
        if (hasUpgrade('Research', 17)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.25)
        if (hasUpgrade('Research', 18)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.10)
        if (hasUpgrade('Workshop', 7))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.05)
        if (hasUpgrade('Research', 22))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.25)
        if (hasUpgrade('Research', 28))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.20)
        if (hasUpgrade('Research', 29))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.05)
        if (hasUpgrade('Research', 30))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.10)
        if (hasUpgrade('Research', 32))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.05)
        if (hasUpgrade('Workshop', 12)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.25)
        if (hasUpgrade('Workshop', 14)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.10)
        if (hasUpgrade('Workshop', 17)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.10)
        if (hasUpgrade('Culture', 2)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.025)
        if (hasUpgrade('Workshop', 20))  player.Minerals.mineralGain = player.Minerals.mineralGain.mul(1.10)
        if (hasUpgrade('Research', 12)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(tmp.Homeworld.buyables[1].effect3)

        //Penalties
        player.Minerals.mineralGain = player.Minerals.mineralGain.dividedBy(tmp.Homeworld.buyables[102].mineralConsumption)

        if (hasUpgrade('Research', 11)) player.Minerals.mineralPoints = player.Minerals.mineralPoints.add(player.Minerals.mineralGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})