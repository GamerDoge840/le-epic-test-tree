addLayer("Population", {
    name: "Population", // This is optional, only used in a few places, If absent it just uses the layer id.
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        populationPoints: new Decimal(0),
        populationGain: new Decimal(0)
    }},
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Population Gain
        player.Population.populationGain = new Decimal(0.02)

        //Population Boosts
        player.Population.populationGain = player.Population.populationGain.mul(buyableEffect("Homeworld", 100))
        if (hasUpgrade('Workshop', 7))  player.Population.populationGain = player.Population.populationGain.mul(1.05)
        if (hasUpgrade('Research', 20))  player.Population.populationGain = player.Population.populationGain.mul(1.25)
        if (hasUpgrade('Research', 21))  player.Population.populationGain = player.Population.populationGain.mul(1.05)
        if (hasUpgrade('Research', 3)) player.Population.populationPoints = player.Population.populationPoints.add(player.Population.populationGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
})