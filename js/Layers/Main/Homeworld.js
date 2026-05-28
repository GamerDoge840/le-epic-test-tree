addLayer("Homeworld", {
    name: "Homeworld", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    nodeStyle() {
        return {
            "background": "linear-gradient(50deg, #8CC4FF, #8CFF99)",
            'border': '2px solid #FFFFFF',
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
    //autoUpgrade() {return hasUpgrade('Essence', 1111)},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.0000000000000000001, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Homeworld<br>――――――――――――――<br> <font size='2'></span>"
        if(hasUpgrade('Research', 3)) tooltip = tooltip + "<span style='color:#FFF5C7'> "+format(player.Population.populationPoints)+" Population"
        if(hasUpgrade('Research', 37)) tooltip = tooltip + "<span style='color:#cd87b6'> "+format(player.Culture.culturePoints)+" Culture"
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
    layerShown(){return (hasUpgrade("Research", 2))},
    passiveGeneration() {
        //if (hasUpgrade('Essence', 1111)) return 1
	return 0
    },
    automate() {
        //if(hasUpgrade('Essence', 1111)) buyMaxBuyable('Essence', 11)
    },
    milestones: {
    },
    upgrades: {        
    },
    buyables: {
      1: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Hunter-Gatherers<br>――――――――――――――――</b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Population</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(1);
                return cost;
              },
            effect() {
                let eff = getBuyableAmount('Homeworld', 1).mul(1).plus(1)
                if (hasUpgrade("Workshop", 1)) eff = eff.times(1.05)
                if (hasUpgrade("Workshop", 5)) eff = eff.times(1.20)
                if (hasUpgrade("Research", 34)) eff = eff.times(1.10)
                if (hasUpgrade("Workshop", 15)) eff = eff.times(1.05)
                return eff
            },
            effect2() {
                let eff = getBuyableAmount('Homeworld', 1).mul(0.25).plus(1)
                if (hasUpgrade("Workshop", 2)) eff = eff.times(1.25)
                if (hasUpgrade("Workshop", 3)) eff = eff.times(1.25)
                if (hasUpgrade("Research", 34)) eff = eff.times(1.10)
                if (hasUpgrade("Workshop", 15)) eff = eff.times(1.05)
                return eff
            },
            effect3() {
                let eff = getBuyableAmount('Homeworld', 1).mul(0.05).plus(1)
                if (hasUpgrade("Research", 34)) eff = eff.times(1.10)
                if (hasUpgrade("Workshop", 15)) eff = eff.times(1.05)
                return eff
            },  
            effect4() {
                let eff = getBuyableAmount('Homeworld', 1).mul(0.01).plus(1)
                return eff
            },        
            canAfford() { if (player.Population.populationPoints.gte(this.cost())) {return true}},
            buy() {
                player.Population.populationPoints = player.Population.populationPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Population.populationPoints.div(this.cost(0)).add(1).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 1))) setBuyableAmount('Homeworld', 1, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Research', 6)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
                if (hasUpgrade('Research', 6) && !hasUpgrade('Research', 12)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food and Wood gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x Wood</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“”`
                if (hasUpgrade('Research', 12) && !hasUpgrade('Research', 41)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food, Wood, and Mineral gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x Wood, ` +format(tmp[this.layer].buyables[this.id].effect3) + `x Minerals</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Braves the wilds to gather food and basic resources.”`
                if (hasUpgrade('Research', 41)) return `<span style='font-size:16px'><span style='color:#ffffff'>Hunter-Gatherers</span><br>――――――――――――<br><span style='font-size:11px'>Each Hunter-Gatherer boosts Food, Wood, Mineral, and Metal gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x Wood, ` +format(tmp[this.layer].buyables[this.id].effect3) + `x Minerals, ` +format(tmp[this.layer].buyables[this.id].effect4) + `x to Metals.</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Braves the wilds to gather food and basic resources.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 4))},
    
        },
         2: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Lumberjacks<br>――――――――――――――――</b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Population</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.65);
                let cost = base.pow(x).times(1);
                return cost;
              },
            effect() {
                let eff = getBuyableAmount('Homeworld', 2).mul(0.10).plus(1)
                return eff
            },       
            canAfford() { if (player.Population.populationPoints.gte(this.cost())) {return true}},
            buy() {
                player.Population.populationPoints = player.Population.populationPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Population.populationPoints.div(this.cost(0)).add(1).log(1.65) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 2))) setBuyableAmount('Homeworld', 2, max.add(1).floor())
            },
            tooltip(){
                if (hasUpgrade('Research', 15)) return `<span style='font-size:16px'><span style='color:#ffffff'>Lumberjacks</span><br>――――――――――――<br><span style='font-size:11px'>Each Lumberjack boosts Wood gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Wood</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Chops down trees for lumber.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 15))},
    
        },
        3: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Miners<br>――――――――――――――――</b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Population</b><br><b>`},
            cost(x) {
                let base = new Decimal(1.70);
                let cost = base.pow(x).times(1);
                return cost;
              },
            effect() {
                let eff = getBuyableAmount('Homeworld', 3).mul(0.10).plus(1)
                if (hasUpgrade("Workshop", 9)) eff = eff.times(1.15)
                return eff
            }, 
            effect2() {
                let eff = getBuyableAmount('Homeworld', 3).mul(0.01).plus(1)
                if (hasUpgrade("Research", 40)) eff = eff.times(1.5)
                return eff
            },             
            canAfford() { if (player.Population.populationPoints.gte(this.cost())) {return true}},
            buy() {
                player.Population.populationPoints = player.Population.populationPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Population.populationPoints.div(this.cost(0)).add(1).log(1.70) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 3))) setBuyableAmount('Homeworld', 3, max.add(1).floor())
            },
            tooltip(){
                if (hasUpgrade('Research', 24) && !hasUpgrade('Research', 25)) return `<span style='font-size:16px'><span style='color:#ffffff'>Miners</span><br>――――――――――――<br><span style='font-size:11px'>Each Miner boosts Minerals gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Minerals</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Searches for ore within caverns.”`
                if (hasUpgrade('Research', 25)) return `<span style='font-size:16px'><span style='color:#ffffff'>Miners</span><br>――――――――――――<br><span style='font-size:11px'>Each Miner boosts Minerals and Metals gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Minerals, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x Metals</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Searches for ore within caverns.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#C19A6B', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 24))},
    
        },
        100: {
            display(){
                if (!hasUpgrade("Workshop", 6)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Huts<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Wood</b><br><b>`
                if (hasUpgrade("Workshop", 6)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Brick Houses<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Wood</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 100).mul(0.25).plus(1)
                if (hasUpgrade("Research", 9)) eff = eff.times(1.40)
                if (hasUpgrade("Workshop", 4)) eff = eff.times(1.25)
                if (hasUpgrade("Workshop", 6)) eff = eff.times(1.50)
                return eff
            },
            consumption() {
                let eff = getBuyableAmount('Homeworld', 100).mul(0.05).plus(1)
                if (hasUpgrade("Research", 9)) eff = eff.times(1.167)
                if (hasUpgrade("Workshop", 4)) eff = eff.times(1.35)
                if (hasUpgrade("Workshop", 6)) eff = eff.times(1.75)
                if (hasUpgrade("Workshop", 19)) eff = eff.dividedBy(1.25)
                return eff
            },
            canAfford() { if (player.Wood.woodPoints.gte(this.cost())) {return true}},
            buy() {
                player.Wood.woodPoints = player.Wood.woodPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Wood.woodPoints.div(this.cost(0)).add(1).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 100))) setBuyableAmount('Homeworld', 100, max.add(1).floor())
            },
            tooltip(){
                if (hasUpgrade('Research', 6) && !hasUpgrade('Workshop', 6))return `<span style='font-size:16px'><span style='color:#ffffff'>Huts</span><br>――――――――――――<br><span style='font-size:11px'>Each Hut boosts Population gain, but slightly reduces Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Population, /` +format(tmp[this.layer].buyables[this.id].consumption) + ` Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Extremely makeshift, cramped wooden shelter.”`
                if (hasUpgrade('Workshop', 6)) return `<span style='font-size:16px'><span style='color:#ffffff'>Brick Houses</span><br>――――――――――――<br><span style='font-size:11px'>Each Brick House boosts Population gain, but reduces Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Population, /` +format(tmp[this.layer].buyables[this.id].consumption) + ` Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Simple, small house made out of bricks, mud, and wood.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#A35F00', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#A35F00', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 7))},
        },
        101: {
            display(){
                if (!hasUpgrade("Research", 43)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Growing Plots<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Food</b><br><b>`
                if (hasUpgrade("Research", 43)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Fields<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Food</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.55);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 101).mul(0.10).plus(1)
                if (hasUpgrade("Workshop", 8)) eff = eff.times(1.05)
                if (hasUpgrade("Research", 43)) eff = eff.times(1.25)
                return eff
            },
            canAfford() { if (player.Food.foodPoints.gte(this.cost())) {return true}},
            buy() {
                player.Food.foodPoints = player.Food.foodPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Food.foodPoints.div(this.cost(0)).add(1).log(1.55) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 101))) setBuyableAmount('Homeworld', 101, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade("Research", 43)) return `<span style='font-size:16px'><span style='color:#ffffff'>Growing Plots</span><br>――――――――――――<br><span style='font-size:11px'>Each Growing Plot boosts Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Crudely-dug holes in the ground for growing basic crops.”`
                if (hasUpgrade("Research", 43)) return `<span style='font-size:16px'><span style='color:#ffffff'>Fields</span><br>――――――――――――<br><span style='font-size:11px'>Each Field boosts Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Vast fields for growing crops.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8ED47F', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8ED47F', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 19))},
        },
        102: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Brick Furnaces<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Minerals</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.45);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 102).mul(0.25).plus(1)
                if (hasUpgrade("Workshop", 10)) eff = eff.times(1.20)
                if (hasUpgrade("Workshop", 11)) eff = eff.times(1.50)
                return eff
            },
            woodConsumption() {
                let eff = getBuyableAmount('Homeworld', 102).mul(0.04).plus(1)
                if (hasUpgrade("Workshop", 10)) eff = eff.times(1.20)
                return eff
            },
            mineralConsumption() {
                let eff = getBuyableAmount('Homeworld', 102).mul(0.07).plus(1)
                if (hasUpgrade("Workshop", 10)) eff = eff.times(1.20)
                return eff
            },
            fuelConsumption() {
                let eff = getBuyableAmount('Homeworld', 102).mul(0.04).plus(1)
                return eff
            },
            canAfford() { if (player.Minerals.mineralPoints.gte(this.cost())) {return true}},
            buy() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Minerals.mineralPoints.div(this.cost(0)).add(1).log(1.45) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 102))) setBuyableAmount('Homeworld', 102, max.add(1).floor())
            },
            tooltip(){
                if (hasUpgrade('Research', 23) && !hasUpgrade('Workshop', 11)) return `<span style='font-size:16px'><span style='color:#ffffff'>Brick Furnaces</span><br>――――――――――――<br><span style='font-size:11px'>Each Brick Furnace generates Metals, but slightly lowers Wood and Mineral gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Metals, /` +format(tmp[this.layer].buyables[this.id].mineralConsumption) + ` Minerals, /` +format(tmp[this.layer].buyables[this.id].woodConsumption) + ` Wood</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“A simple, wood-fueled furnace made out of clay.”`
                if (hasUpgrade('Workshop', 11)) return `<span style='font-size:16px'><span style='color:#ffffff'>Brick Furnaces</span><br>――――――――――――<br><span style='font-size:11px'>Each Brick Furnace generates Metals, but slightly lowers Fuel and Mineral gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Metals, /` +format(tmp[this.layer].buyables[this.id].mineralConsumption) + ` Minerals, /` +format(tmp[this.layer].buyables[this.id].fuelConsumption) + ` Fuel</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“A simple, charcoal-fueled furnace made out of clay.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8C8888', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8C8888', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 23))},
        },
        103: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Charcoal Pits<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Wood</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.65);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 103).mul(0.10).plus(1)
                return eff
            },
            woodConsumption() {
                let eff = getBuyableAmount('Homeworld', 103).mul(0.04).plus(1)
                return eff
            },
            canAfford() { if (player.Wood.woodPoints.gte(this.cost())) {return true}},
            buy() {
                player.Wood.woodPoints = player.Wood.woodPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Wood.woodPoints.div(this.cost(0)).add(1).log(1.65) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 103))) setBuyableAmount('Homeworld', 103, max.add(1).floor())
            },
            tooltip(){
                if (hasUpgrade('Research', 27)) return `<span style='font-size:16px'><span style='color:#ffffff'>Charcoal Pits</span><br>――――――――――――<br><span style='font-size:11px'>Increases Fuel gain, but slightly decreases Wood gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Fuel, /` +format(tmp[this.layer].buyables[this.id].woodConsumption) + ` Wood</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Pit dug in the ground for burning firewood into charcoal.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#b37171', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#b37171', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 27))},
        },
        104: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Stone Cabins<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Minerals</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(2);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 104).mul(0.20).plus(1)
                if (hasUpgrade("Workshop", 16)) eff = eff.times(1.25)
                return eff
            },
            consumption() {
                let eff = getBuyableAmount('Homeworld', 104).mul(0.10).plus(1)
                return eff
            },
            canAfford() { if (player.Minerals.mineralPoints.gte(this.cost())) {return true}},
            buy() {
                player.Minerals.mineralPoints = player.Minerals.mineralPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Minerals.mineralPoints.div(this.cost(0)).add(2).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 100))) setBuyableAmount('Homeworld', 100, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Workshop', 11111)) return `<span style='font-size:16px'><span style='color:#ffffff'>Stone Cabins</span><br>――――――――――――<br><span style='font-size:11px'>Better house that boosts Population gain more but also halves Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Population, /` +format(tmp[this.layer].buyables[this.id].consumption) + ` Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Rudimentary housing made out of cobblestone, with just enough room to fit a family.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8C8888', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#8C8888', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 31))},
        },
        105: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Barns<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Metals</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(0.25);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Homeworld', 105).mul(0.02).plus(1)
                return eff
            },
            canAfford() { if (player.Metals.metalPoints.gte(this.cost())) {return true}},
            buy() {
                player.Metals.metalPoints = player.Metals.metalPoints.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(1e100)
                return cap
            },
            buyMax() {
                let max = player.Metals.metalPoints.div(this.cost(0)).add(1).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Homeworld', 100))) setBuyableAmount('Homeworld', 100, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Workshop', 11111)) return `<span style='font-size:16px'><span style='color:#ffffff'>Barns</span><br>――――――――――――<br><span style='font-size:11px'>Gives a small boost to Food, Wood, and Mineral production.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Food, Wood, Minerals</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“A wooden barn reinforced with a bit of metal for storage purposes.”`
            },          
            style() {
                if(!this.canAfford()){return {
                "width": "190px",
                "height": "125px",
                'background-color':'#BABABA', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",}}

                else return {
                "width": "190px",
                "height": "125px",
                'background-color':'#BABABA', 
                'color':'black', 
                "border-top-left-radius": "0px",
                "border-top-right-radius": "0px",
                "border-bottom-left-radius": "0px",
                "border-bottom-right-radius": "0px",
                'box-shadow':'0px 0px 15px #8eff00'
                }
            },
            unlocked() {return (hasUpgrade('Research', 33))},
        },
        
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: {
        "Civilization": {
        content: [
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '('+format(player.Population.populationPoints)+' Population)'}, {"color": "#FFF5C7", "font-size": "25px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 3)) return '(+' + format(player.Population.populationGain.mul(1)) + '/s)'}, {"color": "#FFF5C7", "font-size": "20px"}],
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 2) && !hasUpgrade('Research', 5)) return '('+format(player.Food.foodPoints)+' Food)'}, {"color": "#8ED47F", "font-size": "18px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 2) && !hasUpgrade('Research', 5)) return "(+" + format(player.Food.foodGain.mul(1)) + "/s)"}, {"color": "#8ED47F", "font-size": "15px"}],
            "blank",
            ["raw-html", function() {if (hasUpgrade('Research', 5)) return '<span style="color:#8ED47F">('+format(player.Food.foodPoints)+' Food)</span>⠀⠀<span style="color:#A35F00">('+format(player.Wood.woodPoints)+' Wood)'}, {"color": "#A35F00", "font-size": "18px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 5)) return '<span style="color:#8ED47F">('+ format(player.Food.foodGain.mul(1)) + '/s)</span>⠀⠀⠀⠀⠀⠀<span style="color:#A35F00">(' + format(player.Wood.woodGain.mul(1)) + '/s)'}, {"color": "#A35F00", "font-size": "15px"}],
        "blank",
        ["raw-html", function() {if (hasUpgrade('Research', 11) && !getBuyableAmount("Homeworld", 102).gte(1)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "18px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 11) && !getBuyableAmount("Homeworld", 102).gte(1)) return '(+' + format(player.Minerals.mineralGain.mul(1)) + '/s)'}, {"color": "#8C8888", "font-size": "15px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 23) && getBuyableAmount("Homeworld", 102).gte(1) && !hasUpgrade('Research', 1111)) return '<span style="color:#8C8888">('+format(player.Minerals.mineralPoints)+' Minerals)</span>⠀⠀<span style="color:#BABABA">('+format(player.Metals.metalPoints)+' Metals)'}, {"color": "#A35F00", "font-size": "18px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 23) && getBuyableAmount("Homeworld", 102).gte(1) && !hasUpgrade('Research', 1111)) return '<span style="color:#8C8888">('+ format(player.Minerals.mineralGain.mul(1)) + '/s)</span>⠀⠀⠀⠀⠀⠀⠀⠀<span style="color:#BABABA">(' + format(player.Metals.metalGain.mul(1)) + '/s)'}, {"color": "#A35F00", "font-size": "15px"}],
            "blank",
            ["raw-html", function() {if (hasUpgrade('Research', 27) && getBuyableAmount("Homeworld", 103).gte(1)) return '('+format(player.Fuel.fuelPoints)+' Fuel)'}, {"color": "#b37171", "font-size": "18px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 27) && getBuyableAmount("Homeworld", 103).gte(1)) return '(+' + format(player.Fuel.fuelGain.mul(1)) + '/s)'}, {"color": "#b37171", "font-size": "15px"}],
                ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "HomeworldTabs"],

                ]
            
        },
        "Culture": {
            style() {return  {'background-color': '#1C1219'}},
            unlocked() {return hasUpgrade('Research', 37)},
            buttonStyle: {"border-color": "#cd87b6"},
            embedLayer: 'Culture',
        },
    },
        microtabs: {
            HomeworldTabs: {
                "Buildings": {
                    unlocked() { return hasUpgrade('Research', 7) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        ["column", [ ["row", [ ["buyable", 100], "blank", ["buyable", 101], "blank", ["buyable", 102],]]]],
                        "blank",
                        ["column", [ ["row", [ ["buyable", 103], "blank", ["buyable", 104], "blank", ["buyable", 105],]]]],
                      ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],

                    ]
                },
                "Jobs": {
                    unlocked() { return hasUpgrade('Research', 4) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 2], "blank", ["buyable", 3],]]]],
                      ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#FFFFFF", "font-size": "32px"}],
                    ]
                },
            }
        },
})