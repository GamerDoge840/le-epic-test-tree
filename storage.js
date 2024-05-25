canAfford() {
    let otherResourceCost = 1 // it costs 1 of the other resource
    return player.otherLayerId.points.gte(otherResourceCost)
    // you dont have to check if you have enough of this layer's resource to purchase the upgrade because that is handled internally
  }
  buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
  
    let otherResourceCost = 1
    player[otherLayerId].points = player[otherLayerId].points.sub(otherResourceCost)
  }

  canAfford() {
    let otherResourceCost = 1 // it costs 1 of the other resource
    return player.otherLayerId.points.gte(otherResourceCost)
    // you dont have to check if you have enough of this layer's resource to purchase the upgrade because that is handled internally
  }
  buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
  
    let otherResourceCost = 1
    player[otherLayerId].points = player[otherLayerId].points.sub(otherResourceCost)
  }
==============================================
  canAfford() {
    let otherResourceCost = 1 // it costs 1 regular point
    return player.points.gte(otherResourceCost)
  }
  buy() {
    player[this.layer].points = player[this.layer].points.sub(this.cost())
  
    let otherResourceCost = 1
    player.points = player.points.sub(otherResourceCost)
  }
  ==========================
  costs: {
    points: 10,
    firstLayer: 25,
    secondLayer: 3
  },
  canAfford() {
    return player.points.gte(this.costs.points)
        && player.firstLayer.points.gte(this.costs.firstLayer)
        && player.secondLayer.points.gte(this.costs.secondLayer)
  },
  buy() {
    player.points = player.points.minus(this.costs.points);
    player.firstLayer.points = player.firstLayer.points.minus(this.costs.firstLayer);
    player.secondLayer.points = player.secondLayer.points.minus(this.costs.secondLayer);
  }