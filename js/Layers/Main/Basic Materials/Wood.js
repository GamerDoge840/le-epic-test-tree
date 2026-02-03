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
        if (hasUpgrade('Research', 14)) player.Wood.woodGain = player.Wood.woodGain.mul(1.50)
        if (hasUpgrade('Research', 6)) player.Wood.woodGain = player.Wood.woodGain.mul(tmp.Homeworld.buyables[1].effect2)
        if (hasUpgrade('Research', 5)) player.Wood.woodPoints = player.Wood.woodPoints.add(player.Wood.woodGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})