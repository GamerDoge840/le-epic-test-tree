addLayer("Wood", {
    name: "Wood", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        woodPoints: new Decimal(0),
        woodGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Wood Gain
        player.Wood.woodGain = new Decimal(0.05)

        //Wood Boosts
        player.Wood.woodGain = player.Wood.woodGain.mul(buyableEffect("Homeworld", 105))
        if (hasUpgrade('Research', 14)) player.Wood.woodGain = player.Wood.woodGain.mul(1.50)
        if (hasUpgrade('Workshop', 7))  player.Wood.woodGain = player.Wood.woodGain.mul(1.05)
        if (hasUpgrade('Workshop', 12))  player.Wood.woodGain = player.Wood.woodGain.mul(1.25)
        if (hasUpgrade('Workshop', 14))  player.Wood.woodGain = player.Wood.woodGain.mul(1.10)
        if (hasUpgrade('Culture', 2))  player.Wood.woodGain = player.Wood.woodGain.mul(1.025)
        if (hasUpgrade('Workshop', 20))  player.Wood.woodGain = player.Wood.woodGain.mul(1.10)
        if (hasUpgrade('Workshop', 24))  player.Wood.woodGain = player.Wood.woodGain.mul(1.10)
        if (hasUpgrade('Research', 6)) player.Wood.woodGain = player.Wood.woodGain.mul(tmp.Homeworld.buyables[1].effect2)
        if (hasUpgrade('Research', 15)) player.Wood.woodGain = player.Wood.woodGain.mul(tmp.Homeworld.buyables[2].effect)

        //Penalties
        if (!hasUpgrade('Workshop', 11)) player.Wood.woodGain = player.Wood.woodGain.dividedBy(tmp.Homeworld.buyables[102].woodConsumption)
        player.Wood.woodGain = player.Wood.woodGain.dividedBy(tmp.Homeworld.buyables[103].woodConsumption)

        if (hasUpgrade('Research', 5)) player.Wood.woodPoints = player.Wood.woodPoints.add(player.Wood.woodGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})