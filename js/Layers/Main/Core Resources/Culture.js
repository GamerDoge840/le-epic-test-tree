addLayer("Culture", {
    name: "Culture", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked(){return true},
		points: new Decimal(0),
        culturePoints: new Decimal(0),
        cultureGain: new Decimal(0)
    }},
    color: "#cd87b6",
    update(delta) {
        let onepersec = new Decimal(1)

        //Base Culture Gain
        player.Culture.cultureGain = new Decimal(0.01)
        if (hasUpgrade('Culture', 1))  player.Culture.cultureGain = player.Culture.cultureGain.mul(1.50)
        if (hasUpgrade('Culture', 4))  player.Culture.cultureGain = player.Culture.cultureGain.mul(1.50)
        if (hasUpgrade('Research', 38)) player.Culture.cultureGain = player.Culture.cultureGain.mul(tmp.Culture.buyables[1].effect)
        if (hasUpgrade('Research', 44)) player.Culture.cultureGain = player.Culture.cultureGain.mul(tmp.Culture.buyables[2].effect)

        if (hasUpgrade('Research', 37)) player.Culture.culturePoints = player.Culture.culturePoints.add(player.Culture.cultureGain.mul(delta))
        //For currencies generated like this, delta MUST go after upgrade effects
        
        },
    row: '0', // Row the layer is in on the tree (0 is the first row)
    milestones: {
    },
    upgrades: {   
        1: {    
            fullDisplay() {return `<font size="3"><b>[C01] Culture Boost</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture 
                `},                
            costs: {
                Culture: 0.5,
              },
              canAfford() {
                return player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            unlocked() {return (hasUpgrade('Research', 37))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Culture Boost</span><br>――――――――――――<br><span style='font-size:11px'>Boosts Culture gain by 1.50x.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#8C587B',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#cd87b6',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        2: {    
            fullDisplay() {return `<font size="3"><b>[C02] Cultured Production</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture 
                `},                
            costs: {
                Culture: 1,
              },
              canAfford() {
                return player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            branches: ["Culture", 1],
            unlocked() {return (hasUpgrade('Culture', 1))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Cultured Production</span><br>――――――――――――<br><span style='font-size:11px'>Boosts all previous currencies by 1.025x. This includes Research, Food, Population, Wood, Minerals, Metals and Fuel.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#8C587B',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#cd87b6',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        3: {    
            fullDisplay() {return `<font size="3"><b>[C03] Cultured Research</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture 
                `},                
            costs: {
                Culture: 1,
              },
              canAfford() {
                return player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            effect() {
                let eff = player.Culture.culturePoints.plus(2).pow(0.075);
                return eff;
            }, 
            branches: ["Culture", 2],
            unlocked() {return (hasUpgrade('Culture', 2))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Cultured Research</span><br>――――――――――――<br><span style='font-size:11px'>Give a boost to Research based on Culture.</span><br>――――――――――――――――――<br>
                    Effect: `+format(upgradeEffect(this.layer, this.id))+`x <br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#8C587B',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#cd87b6',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },
        4: {    
            fullDisplay() {return `<font size="3"><b>[C04] Culture Boost II</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture 
                `},                
            costs: {
                Culture: 3.5,
              },
              canAfford() {
                return player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            branches: ["Culture", 3],
            unlocked() {return (hasUpgrade('Research', 49))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'> Culture Boost II</span><br>――――――――――――<br><span style='font-size:11px'>Boost Culture gain by 1.50x, again.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#8C587B',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#cd87b6',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },  
        5: {    
            fullDisplay() {return `<font size="3"><b>[C05] Cultured Production II</b><font size="2"><br>――――――――――――<br>
                Costs: `+format(tmp[this.layer].upgrades[this.id].costs.Culture)+` Culture 
                `},                
            costs: {
                Culture: 5.7,
              },
              canAfford() {
                return player.Culture.culturePoints.gte(this.costs.Culture)
              },
              pay() {
                player.Culture.culturePoints = player.Culture.culturePoints.minus(this.costs.Culture);
              },
            branches: ["Culture", 4],
            unlocked() {return (hasUpgrade('Culture', 4))},
            tooltip(){
                return `<span style='font-size:16px'><span style='color:#ffffff'>Cultured Production II</span><br>――――――――――――<br><span style='font-size:11px'>Boosts all previous currencies by 1.025x, again. This includes the same resources as the previous upgrade.</span><br>――――――――――――――――――<br>
                    </span><span style='font-size:11px'><span style='color:#757575'>“”`
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#8C587B',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',

                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#b1b1b1',
                    "width": "155px",
            "height": "155px",
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                        'border-color': '#8eff00',
                'background-color': '#cd87b6',
                'color': 'black',
                        "width": "155px",
            "height": "155px",
            'box-shadow':'0px 0px 15px #8eff00'
                    }
                }
            },
        },                                                                                             
    },
    buyables: {
        1: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Trilithons<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Minerals</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(1.75);
                let cost = base.pow(x).times(1.50);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Culture', 1).mul(0.15).plus(1)
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
                let max = player.Minerals.mineralPoints.div(this.cost(0)).add(1.50).log(1.75) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Culture', 1))) setBuyableAmount('Culture', 1, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Workshop', 11111)) return `<span style='font-size:16px'><span style='color:#ffffff'>Trilithons</span><br>――――――――――――<br><span style='font-size:11px'>Each Trilithon boosts Culture gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Culture</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Big stucture comprised out of different stones.”`
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
            unlocked() {return (hasUpgrade('Research', 38))},
        },
        2: {
            display(){
                if (!hasUpgrade("Workshop", 11111)) return `<font size="3"><b>(`+formatWhole(getBuyableAmount(this.layer, this.id), 0)+`)<br>Bonfires<br>――――――――――――――――</b></b>
                Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` Wood</b><br><b>`
            },
            cost(x) {
                let base = new Decimal(2);
                let cost = base.pow(x).times(5);
                return cost;
              },
              effect() {
                let eff = getBuyableAmount('Culture', 2).mul(0.075).plus(1)
                if (hasUpgrade("Research", 49)) eff = eff.times(1.25)
                return eff
            },
            effect2() {
                let eff = getBuyableAmount('Culture', 2).mul(0.01).plus(1)
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
                let max = player.Wood.woodPoints.div(this.cost(0)).add(5).log(2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Culture', 2))) setBuyableAmount('Culture', 2, max.add(1).floor())
            },
            tooltip(){
                if (!hasUpgrade('Workshop', 11111)) return `<span style='font-size:16px'><span style='color:#ffffff'>Bonfires</span><br>――――――――――――<br><span style='font-size:11px'>Each Bonfire boosts Culture gain and gives a small boost to Food gain.</span><br>――――――――――――――――――<br>
                    <span style='font-size:14px'>Currently: ` +format(tmp[this.layer].buyables[this.id].effect) + `x Culture, ` +format(tmp[this.layer].buyables[this.id].effect2) + `x Food</span><br>――――――――――――――――――<br><span style='font-size:11px'><span style='color:#757575'>“Large, controlled wooden fire.”`
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
            unlocked() {return (hasUpgrade('Research', 44))},
        },
    },
    challenges: {
    },
    clickables: {
    },
     tabFormat: [
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],
            ["raw-html", function() {if (hasUpgrade('Research', 37)) return '('+format(player.Culture.culturePoints)+' Culture)'}, {"color": "#cd87b6", "font-size": "25px"}],
        ["raw-html", function() {if (hasUpgrade('Research', 37)) return '(+' + format(player.Culture.cultureGain.mul(1)) + '/s)'}, {"font-size": "20px"}],
        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],
                    "blank",
                           ["microtabs", "CultureTabs"],

            
        ],
        microtabs: {
            CultureTabs: {
                "Upgrades": {
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 1],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 2], "blank", ["upgrade", 3],]]]],
                    "blank",
                    ["column", [ ["row", [ ["upgrade", 4], "blank", ["upgrade", 5],]]]],
                    ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],
                    ]
                },
                "Buildings": {
                    unlocked() { return hasUpgrade('Research', 38) },
                    content: [
                        ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 38)) return '('+format(player.Minerals.mineralPoints)+' Minerals)'}, {"color": "#8C8888", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 44)) return "(" + format(player.Wood.woodPoints) + " Wood)"}, {"color": "#A35F00", "font-size": "20px"}],
                    ["raw-html", function() {if (hasUpgrade('Research', 2)) return "―――――――――――――――――――――――――――――"}, {"color": "#cd87b6",}],
                    "blank",
                        ["column", [ ["row", [ ["buyable", 1], "blank", ["buyable", 2],]]]],
                        "blank",
                      ["display-text",
                    function() {return "―――――――――――――――――――――――――――――"},
                    {"color": "#cd87b6", "font-size": "32px"}],

                    ]
                },
            }
        },
})