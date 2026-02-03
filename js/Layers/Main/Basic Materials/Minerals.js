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
        if (hasUpgrade('Research', 12)) player.Minerals.mineralGain = player.Minerals.mineralGain.mul(tmp.Homeworld.buyables[1].effect3)
        if (hasUpgrade('Research', 11)) player.Minerals.mineralPoints = player.Minerals.mineralPoints.add(player.Minerals.mineralGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})