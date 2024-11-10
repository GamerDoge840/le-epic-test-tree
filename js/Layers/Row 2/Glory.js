addLayer("Glory", {
    name: "Glory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#faff92",
    nodeStyle() {
        return {
            'border': '2px solid white',
            'background-image': 'linear-gradient(#faff92, #ffcd7a)',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',
            
        }
    },
    requires: new Decimal("6.00e20"), // Can be a function that takes requirement increases into account
    resource: "Glory", // Name of prestige currency
    branches: ["Honor"],
    resetDescription: "Revel in Glory.<br>----------<br>",
    baseResource: "Honor", // Name of resource prestige is based on
    baseAmount() {return player.Honor.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    tooltip() {
        let tooltip = "<font size='3'>Glory<br>----------------<br> <font size='2'><h3 class='glory'> " +formatWhole(player.Glory.points)+" Glory</h3>"
        return tooltip
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasMilestone("Rank", 13) || player.Glory.total.gte(1)},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    componentStyles: {
        "prestige-button": {
             "background-image": 'url("resources/glorygradient.png")',        
            'background-position': 'center center',
            'background-size': '160%',},
    },
    upgrades: {
        rows: 6,
        cols: 6,
        11: {    
            title: "Glorious Power",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Power</span></b><font size="2"><br>Triple Honor gain and retain access to Energy.<br><br>Double Energy gain, and the Activate Generator upgrade instead boosts it by 10x.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return player.Glory.total.gte(1)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Power</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>Note that you need at least 1 Prestige to generate any Energy."},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "225px",
            "height": "195px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        21: {    
            title: "Glorious Energy",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Glorious Energy</span></b><font size="2"><br>Every total Glory point doubles Energy gain (Until 8 Total Glory), you can reset for max Ranks, and remove the penalty of the Rank 7 milestone.<br>-------------<br>Currently: `+format(upgradeEffect(this.layer, this.id))+`x<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            effect() {
                let eff = player.Glory.total.pow_base(2);
                return eff.min(256);
            }, 
            unlocked() {return hasUpgrade("Glory", 11)},
            tooltip() {return "<span style='color:#ffffff'>Glorious Energy</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "195px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "195px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "195px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        22: {    
            title: "Prestigious Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Prestigious Automator</span></b><font size="2"><br>Autobuy Prestige upgrades, and passive Prestige generation is always enabled.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("Glory", 21)},
            tooltip() {return "<span style='color:#ffffff'>Prestigious Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        23: {    
            title: "True Potential",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>True Potential</span></b><font size="2"><br>Unlocks two new Energy upgrades (That are kept on Glory reset).<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(1),
            unlocked() {return hasUpgrade("Glory", 22)},
            tooltip() {return "<span style='color:#ffffff'>True Potential</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        31: {    
            title: "Leveled Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Leveled Automator</span></b><font size="2"><br>Level automation is always enabled.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(4),
            unlocked() {return hasUpgrade("Glory", 23)},
            tooltip() {return "<span style='color:#ffffff'>Leveled Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
        32: {    
            title: "Ranked Automator",
            fullDisplay() {return `<font size="3"><b><span style='color:#000000'>Ranked Automator</span></b><font size="2"><br>Automates Ranks.<br>-------------<br>Cost: `+format(tmp[this.layer].upgrades[this.id].cost)+`<span style='color:#000000'> Glory</span>`},        
            cost: new Decimal(12),
            unlocked() {return hasUpgrade("Glory", 31)},
            tooltip() {return "<span style='color:#ffffff'>Ranked Automator</span><br>---------------<br><span style='font-size:11px'><span style='color:#7d837c'>"},
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#98a86c',
                    "width": "200px",
            "height": "175px",
            "background-image": 'url("resources/glorygradient.png")',        
                    'background-position': 'center center',
                     'background-size': '160%',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else if (!canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#bf8f8f' ,
                    "width": "200px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
                else if (canAffordUpgrade(this.layer, this.id)) {
                    return {
                    'background-color': '#f3ff00' ,
                    "width": "250px",
            "height": "175px",
            'border': '5px solid',
        'border-color': 'rgba(0, 0, 0, 0.125)',
                    }
                }
            },
        },
    },
    
    buyables: {
        rows: 5,
        cols: 4,
    },
     tabFormat: {
        "Glory": {
            content: [ 
                ["display-text",
                    function() {return '('+format(player.points)+' Essence)'},
                    {"font-size": "14px"}],
                    ["display-text",
                        function() {return '<span style="color:#31aeb0">('+format(player.Prestige.points)+' Prestige)</span>'},
                        {"font-size": "14px"}],
                ["display-text",
                    function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                    {"color": "#faff92", "font-size": "32px"}],
                ['display-text',function(){return '<h4>You have <span style="color:#faff92">'+quickDoubleColor(formatWhole(player.Glory.points),'#faff92','#ffcd7a' ) +' <h3 class="glory">Glory</h3></span>.'}],
                "blank",
                ["raw-html", function() {if (!hasMilestone("Rank", 13)) return 'To perform a Glory reset, you need the corresponding Rank milestone.'}],
                function() {if (hasMilestone("Rank", 13)) return "prestige-button"},
                 "blank",
                 ["display-text",
                    function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                    {"color": "#faff92", "font-size": "32px"}],
                    
                    ["display-text",
                        function() {return "<span style='color:#faff92'>"+format(player.Honor.points)+" Honor</span>"},
                        {"color": "#faff92", "font-size": "19px"}],
                        ["display-text",
                            function() {return "<h3 class='glory'>"+format(player.Glory.total)+" total <h3 class='glory'>Glory</h3>"},
                            {"color": "#faff92", "font-size": "19px"}],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                    ["display-text",
                        function() {return "<span style='color:#faff92'>----------Tier 2</span><span style='color:#ffcd7a'> Reset Layer----------</span>"},
                        {"color": "#faff92", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Glory resets <span style='color:#31aeb0'>Prestige</span> and <span style='color:#faff92'> Honor</span> features (<span style='color:#faff92'>Honor, Honor Upgrades, </span><span style='color:#ffcd7a'>Ranks, Rank Milestones, </span><span style='color:#c1ffee'>Energy, Energy Upgrades</span>) in exchange for <h3 class='glory'>Glory</h3> to boost progression further."},
                        {"font-size": "16px"}],
                        ["display-text",
                            function() {return "<span style='color:#faff92'>----------</span><span style='color:#ffcd7a'>----------</span>"},
                            {"color": "#faff92", "font-size": "32px"}],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                            
                            ["upgrades", [1]],
                            "blank",
                            ["upgrades", [2, 3, 4]],
                            ["display-text",
                                function() {return "<span style='color:#faff92'>==============</span><span style='color:#ffcd7a'>===============</span>"},
                                {"color": "#FFFC91", "font-size": "32px"}], 
                    
            ]
            
        },
    },
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})