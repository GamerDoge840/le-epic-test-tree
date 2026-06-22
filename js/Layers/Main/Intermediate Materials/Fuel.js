addLayer("Fuel", {
    name: "Fuel", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        fuelPoints: new Decimal(0),
        fuelGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Fuel Gain
        player.Fuel.fuelGain = new Decimal(0.01)

        //Fuel Boosts
        if (hasUpgrade('Research', 27)) player.Fuel.fuelGain = player.Fuel.fuelGain.mul(tmp.Homeworld.buyables[103].effect)
        if (hasUpgrade('Culture', 2))  player.Fuel.fuelGain = player.Fuel.fuelGain.mul(1.025)
        if (hasUpgrade('Culture', 5))  player.Fuel.fuelGain = player.Fuel.fuelGain.mul(1.025)
        if (hasUpgrade('Research', 49))  player.Fuel.fuelGain = player.Fuel.fuelGain.mul(1.25)

        //Penalties
        if (hasUpgrade('Workshop', 11)) player.Fuel.fuelGain = player.Fuel.fuelGain.dividedBy(tmp.Homeworld.buyables[102].fuelConsumption)
        if (getBuyableAmount("Homeworld", 103).gte(1)) player.Fuel.fuelPoints = player.Fuel.fuelPoints.add(player.Fuel.fuelGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})