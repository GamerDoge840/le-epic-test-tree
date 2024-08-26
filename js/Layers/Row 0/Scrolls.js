addLayer("Scrolls", {
    name: "Scrolls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sussyamogu", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#CD7F32",
    nodeStyle() {
        return {
            'border': '5px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("5"), // Can be a function that takes requirement increases into account
    resource: "Scrolls", // Name of prestige currency
    resetDescription: "Scribe scrolls of knowledge.<br>----------<br>",
    baseResource: "Knowledge", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "Ponder 10 Times",
            effectDescription() {return '---------<br><font size="2">Unlock <span style="color:#ddeded">Pacing</span>.'},
            done() { return getBuyableAmount("Knowledge", 11).gte(10000) },
            unlocked() { return hasUpgrade("Knowledge", 11111111111) },
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#5a8c7b',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#696969',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
    },
    upgrades: {        
        rows: 4,
        cols: 4,
        11: {    
            title: "Scribed Knowledge",
            fullDisplay() {return `<font size="3"><b><span style='color:#CD7F32'>Scribed Knowledge</span></b><font size="2"><br>Unlock a new <span style="color:#ddeded">Knowledge</span> upgrade.<br>-----------------<br>Cost: 1 <span style='color:#CD7F32'>Scroll</span>`},    
            cost: new Decimal(1),
            tooltip() {return "<span style='color:#CD7F32'>Scribed Knowledge</span><br>----------------<br><span style='font-size:11px'><span style='color:#7d837c'>Scrolls shall make my studying much easier."},
            style() {
                    if (hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#8d6948',
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#696969' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                    else if (canAffordUpgrade(this.layer, this.id)) {
                        return {
                        'background-color': '#ffbf84' ,
                        "width": "195px",
                "height": "135px",
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                        }
                    }
                },
        }
        
    },
    buyables: {
        rows: 5,
        cols: 4,
        11: {
            display() {return `<font size="3"><b>Scroll Reading</b><font size="2"><br>Increases <span style='color:#8fd7be'>Knowledge</span> gain by 1.50x with every purchase.<br>-----------------<br><b>Cost: `+format(tmp[this.layer].buyables[this.id].cost)+` <span style='color:#ffbf84'>Scrolls</span></b> <br>-----------------<br><b>Read Scrolls `+format(getBuyableAmount(this.layer, this.id), 0)+`/`+format(tmp[this.layer].buyables[this.id].purchaseLimit)+` times</b> <br>-----------------<br><b>Current Effect: ` +format(tmp[this.layer].buyables[this.id].effect) + `x</b>`},
            cost(x) {
                let base = new Decimal(2.2);
                let cost = base.pow(x).times(1);
                return cost;
              },
              effect() { 
                let extra = new Decimal(0)
                return getBuyableAmount('Scrolls', 11).add(extra).pow_base(1.50) }, 

            canAfford() { if (player.points.gte(this.cost())) {return true}},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() {
                cap = new Decimal(100)
                return cap
            },
            tooltip() {return "<span style='color:#ffbf84'>Scroll Reading</span><br>----------------<br>"},
            buyMax() {
                let max = player.points.div(this.cost(0)).add(1).log(2.2) //add is cost, log is base
                max = max.min(this.purchaseLimit())
                if(max.gt(getBuyableAmount('Scrolls', 11))) setBuyableAmount('Scrolls', 11, max.add(1).floor())
            },
            style() {
                return {
                'height': '175px',
                'width': '250px',
                'border': '5px solid',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
            unlocked() { return hasUpgrade("Scrolls", 11) },
    
        },
    },
     
    tabFormat: [
        ["infobox", "KnowledgeLore"],
                ['display-text',function(){return '<h4>You have scribed '+quickBigColor(format(player.Scrolls.points),'#CD7F32') +' <span style="color:#CD7F32">Scrolls</span>.'}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#CD7F32", "font-size": "32px"}],
                            "prestige-button",
                            ["display-text",
                                function() {return "--------------------"},
                                {"color": "#CD7F32", "font-size": "32px"}],
                            "resource-display",
                            ['display-text',function(){return '<h4>You have scribed <span style="color:#CD7F32">'+(formatWhole(player.Scrolls.total)) +' </span> total <span style="color:#CD7F32">Scrolls</span>. '}],

                            ["display-text",
                                function() {return "--------------------"},
                                {"color": "#CD7F32", "font-size": "32px"}],
                            ["display-text",
                                function() {return "<span style='color:#CD7F32'>Scrolls</span> are the first reset on your journey.<br><br>Scribing <span style='color:#CD7F32'>Scrolls</span> will reset all <span style='color:#ddeded'>Knowledge</span> features (<span style='color:#ddeded'>Knowledge and Knowledge Upgrades</span>)."},
                                {"color": "white", "font-size": "16px"}],
                                "blank",
                                ["display-text",
                                    function() {return "In exchange, you will gain <span style='color:#CD7F32'>Scrolls</span> to spend on new <span style='color:#CD7F32'>Scroll Upgrades</span> in order to progress back to where you were faster."},
                                    {"color": "white", "font-size": "16px"}],
                ["display-text",
                    function() {return "============================="},
                    {"color": "#CD7F32", "font-size": "32px"}], 
                    ["buyables", [1, 2]], 
                ["display-text",
                    function() {return "============================="},
                    {"color": "#CD7F32", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#CD7F32", "font-size": "32px"}],
                        ["upgrades", [1, 2, 3, 4]], 
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#CD7F32", "font-size": "32px"}],  
                        ["milestones", [0, 1, 2, 3, 4]], 
    ],
    infoboxes:{
        KnowledgeLore: {
         title: "Act 0 - Chapter 2: Scrolls",
         titleStyle: {'color': '#000000'},
         body: "After much time spent thinking, you realize that scribing your knowledge onto scrolls would be a worthwhile endeavor to speed your learning. You just barely manage to scrunge up enough money to buy some low-quality ink, a quill, and some paper.<br><br> You sit at your desk, ready to write your very first scroll of knowledge.",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})