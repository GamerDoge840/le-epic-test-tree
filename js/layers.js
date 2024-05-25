addLayer("scroll", {
    name: "scroll", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SCRL", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CD7F32",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Scrolls", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
        title: "Begin",
        description: "Your father's dusty old scrolls are sure to be an excellent start to your journey of magical knowledge.",
        tooltip: "The old man had amassed so many scrolls...a perfect start for me.",
        cost: new Decimal(1),
        currencyDisplayName: "Scrolls",
    },
    
    12: {    
        title: "smonk weed",
        description: "how high, DO YOU EVEN HAVE TO BE, to do something like that?!?!?!?!",
        cost: new Decimal(0.0010),
        currencyInternalName: "points",
        unlocked() { return hasUpgrade("scroll", 11) },
    },
    
    13: {    
        title: "test",
        description: "t",
        unlocked() { return hasUpgrade("scroll", 12) },
        costs: {
            points: 0.0014,
            scroll: 0.0014,
          },
          canAfford() {
            return player.points.gte(this.costs.points)
                && player.scroll.points.gte(this.costs.scroll)
          },
          buy() {
            player.points = player.points.minus(this.costs.points);
            player.scroll.points = player.scroll.points.minus(this.costs.scroll);
          },
          fullDisplay:("<b>THE BIG G</b><br> Epic Upgrade...its awesoe,<br><br><b>Cost: 0.0014 scrole's and 0.0014 kowlege<b>")
    },

     },
})