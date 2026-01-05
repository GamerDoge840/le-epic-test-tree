addLayer("Essence", {
    name: "Essence", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        accumulatorfixes: new Decimal(0)
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            'border': '5px solid #666363',
            "width": 65,
        "height": 65,
        'min-height': '65px',
        'min-width': '65px',  
        }
    },
    requires: new Decimal("e19186000"), // Can be a function that takes requirement increases into account
    resource: "Honor", // Name of prestige currency
    baseResource: "Knowledge", // Name of resource prestige is based on
    resetDescription: "Break Essence to gain Shards.<br>―――――――――――<br>",
    branches: ["Charge"],
    autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Essence<br>――――――――――――――<br> <font size='2'><span style='color:#FFFFFF'> " +formatWhole(player.points)+" Essence</span>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
    },
    accumulatorFixMiniReset()
    {
        player.points = new Decimal(0)
        player.Essence.buyables[1] = new Decimal(0)
        player.Essence.buyables[2] = new Decimal(0)
        player.Essence.buyables[3] = new Decimal(0)
       // player.Essence.upgrades.splice(0, player.Essence.upgrades.length)
        //if (!hasMilestone("Essence", 15)) {
            //for (let i in player.Essence.challenges) {
                //if (i != 17) player.Essence.challenges[i] = 0
            //}
       //}
    },
    challenges: {

    },
    buyables: {
        rows: 5,
        cols: 4,
        1: {
            costBase() { return new Decimal(0.0002) },
            costGrowth() { return new Decimal(1.10) },
            purchaseLimit() { return new Decimal(5) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.05).add(1)
            },
            unlocked() { return !player.Essence.accumulatorfixes.gte('1')},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Shattered Accumulator"
            },
            display() {return `<font size="2"><b><font size="2">――――――――――――――――――――<b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b>
                ――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            buy(mult) {
                if (mult != true && !hasMilestone("Essence", 1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("Essence", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#666363', 'color':'black','border': '5px solid','border-color':'#FFFFFF', width: '250px', height: '250px',}}
                else return {'background-color':'#666363', 'color':'black','border': '5px solid','border-color':'green','box-shadow':'0px 0px 5px #5eff87', width: '250px', height: '250px', }
            },
        },
        2: {
            costBase() { return new Decimal(0.0002) },
            costGrowth() { return new Decimal(1.05) },
            purchaseLimit() { return new Decimal(7) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.15).add(1)
            },
            unlocked() { return player.Essence.accumulatorfixes.gte('1') && !player.Essence.accumulatorfixes.gte('2')},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Broken Accumulator"
            },
            display() {return `<font size="2"><b><font size="2">――――――――――――――――――――<b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b>
                ――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            buy(mult) {
                if (mult != true && !hasMilestone("Essence", 1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("Essence", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#8d8f8e', 'color':'black','border': '5px solid','border-color':'#FFFFFF', width: '250px', height: '250px',}}
                else return {'background-color':'#8d8f8e', 'color':'black','border': '5px solid','border-color':'green','box-shadow':'0px 0px 5px #5eff87', width: '250px', height: '250px', }
            },
        },
        3: {
            costBase() { return new Decimal(0.00015) },
            costGrowth() { return new Decimal(1.05) },
            purchaseLimit() { return new Decimal(10) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.20).add(1)
            },
            unlocked() { return player.Essence.accumulatorfixes.gte('2') && !player.Essence.accumulatorfixes.gte('3')},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Damaged Accumulator"
            },
            display() {return `<font size="2"><b><font size="2">――――――――――――――――――――<b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b>
                ――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            buy(mult) {
                if (mult != true && !hasMilestone("Essence", 1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("Essence", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#989c99', 'color':'black','border': '5px solid','border-color':'#FFFFFF', width: '250px', height: '250px',}}
                else return {'background-color':'#989c99', 'color':'black','border': '5px solid','border-color':'green','box-shadow':'0px 0px 5px #5eff87', width: '250px', height: '250px', }
            },
        },
        4: {
            costBase() { return new Decimal(0.00015) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(20) },
            currency() { return player.points},
            pay(amt) { player.points = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).mul(0.25).add(1)
            },
            unlocked() { return player.Essence.accumulatorfixes.gte('3') && !player.Essence.accumulatorfixes.gte('4')},
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Imperfect Accumulator"
            },
            display() {return `<font size="2"><b><font size="2">――――――――――――――――――――<b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Essence</b>
                ――――――――――――――――――――<br><b>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x to Essence</b>`},
            buy(mult) {
                if (mult != true && !hasMilestone("Essence", 1)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("Essence", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style() {
                if(!this.canAfford()){return {'background-color':'#b6b8b6', 'color':'black','border': '5px solid','border-color':'#FFFFFF', width: '250px', height: '250px',}}
                else return {'background-color':'#b6b8b6', 'color':'black','border': '5px solid','border-color':'green','box-shadow':'0px 0px 5px #5eff87', width: '250px', height: '250px', }
            },
        },
          
    },
    clickables: {
            1: {
            title() { return `<font size="5"> Repair the Accumulator<br><font size="2">Resets Essence amount and the Accumulator to improve it's effect and purchase cap`},
            canClick() { return getBuyableAmount("Essence", 1).gte(5) || getBuyableAmount("Essence", 2).gte(7) },
            unlocked() { return getBuyableAmount("Essence", 1).gte(5) || getBuyableAmount("Essence", 2).gte(7)  },
            onClick() {
                layers.Essence.accumulatorFixMiniReset()
                player.Essence.accumulatorfixes = player.Essence.accumulatorfixes.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
        2: {
            title() { return `<font size="5"> Repair the Accumulator<br><font size="2">Resets Essence amount and the Accumulator to improve it's effect and purchase cap, and unlock Essence upgrades.`},
            canClick() { return getBuyableAmount("Essence", 3).gte(10) },
            unlocked() { return getBuyableAmount("Essence", 3).gte(10) },
            onClick() {
                layers.Essence.accumulatorFixMiniReset()
                player.Essence.accumulatorfixes = player.Essence.accumulatorfixes.add(1)
            },
            style: { width: '400px', "min-height": '100px', borderRadius: '15px'},
        },
          },
     tabFormat: {
        "Essence": {
        content: [
        ["display-text",
            function() {return ''+format(player.points)+' Essence'},
            {"color": "#FFFFFF", "font-size": "30px"}],
            ["display-text",
            function() {return "<font size='4'>(+"+formatSmall(getPointGen())+" Essence/s)"},
            {"color": "#FFFFFF", "font-size": "30px"}],
                            ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "EssenceTabs"],

                ]
            
        },
    },
        microtabs: {
            EssenceTabs: {
                "Accumulator": {
                    content: [
                        "blank",
                        ["column", [ ["row", [ ["ex-buyable", 1], ["ex-buyable", 2], ["ex-buyable", 3], ["ex-buyable", 4],]]]],
                        ["raw-html", function() {if (getBuyableAmount("Essence", 1).gte(5) || getBuyableAmount("Essence", 2).gte(7) || getBuyableAmount("Essence", 3).gte(10) ) return '―――――――――――――――――――――――――――――'}, {"color": "#FFFFFF", "font-size": "23px"}],
                                                "blank",
                        ["row", [["clickable", 1]]],
                        ["row", [["clickable", 2]]],
                        "blank",



                    ]
                },
                "Upgrades": {
                    unlocked() {return player.Essence.accumulatorfixes.gte('3')},
                    content: [
                        "blank",



                    ]
                },
            }
        },
})