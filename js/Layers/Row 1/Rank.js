addLayer("Rank", {
    name: "Rank", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffcd7a",
    nodeStyle() {
        return {
            'border': '2px solid #ffffff',
            "width": 100,
        "height": 100,
        'min-height': '100px',
        'min-width': '100px',  
        }
    },
    requires: new Decimal("100000"), // Can be a function that takes requirement increases into account
    resource: "Ranks", // Name of prestige currency
    resetDescription: "Rank up.<br>----------<br>",
    resetsNothing() {return hasMilestone("Rank", 11)},
    autoUpgrade() {return hasUpgrade("Honor", 101)},
    baseResource: "Honor", // Name of resource prestige is based on
    autoPrestige() {return hasUpgrade("Honor", 101)},
    canBuyMax() {return hasUpgrade("Honor", 101)},
    baseAmount() {return player.Honor.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasMilestone('Rank', 5)) mult = mult.times(100)
        if (hasUpgrade('Honor', 34)) mult = mult.dividedBy(upgradeEffect('Honor', 34))
        return mult 
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    addToBase() {
        let base = new Decimal(0);
        return base;
    },
    effectBase() {
        let base = new Decimal(1.10);
        base = base.plus(tmp.Rank.addToBase);
        return base.pow(tmp.Rank.power);
    },
    power() {
        let power = new Decimal(1);
        return power;
    },
    effect() {
        return Decimal.pow(tmp.Rank.effectBase, player.Rank.points);
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    bars: {
        rankbar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            instant: true,
            progress() {return new Decimal(tmp.Rank.baseAmount).dividedBy(getNextAt(this.layer, true))},
            display() {
                return "<h5>" + format(player.Honor.points) + "/" + formatWhole(tmp.Rank.nextAt) + "<h5> Honor to next Rank.</h5>";
            },
            baseStyle: { 'background-color': 'black' },
            fillStyle: { 'background-color': '#e0a150' },
        },
},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row <= this.row) return;
        let keptUpgrades = []
        let keptMilestones = []
        layerDataReset(this.layer);
        player[this.layer].upgrades.push(...keptUpgrades)
        player[this.layer].milestones.push(...keptMilestones)
    },
    upgrades: {
        rows: 5,
        cols: 4,
    },
    buyables: {
        rows: 5,
        cols: 4,
    },
    
    milestones: {
        0: {
            requirementDescription: "<font size='3'><b>Rank 1</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Keep Levels unlocked upon Honor reset.</span>'},
            done() {return player.Rank.points.gte(1)},
            unlocked() {return hasUpgrade("Prestige", 52)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        1: {
            requirementDescription: "<font size='3'><b>Rank 2</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Each Rank boosts Essence gain by 1.25x.</span><br>-----------------<br>Currently: '+format(+format(tmp.Rank.milestones[this.layer, this.id].effect))+'x'},
            done() {return player.Rank.points.gte(2)},
            effect() {
                let eff = player.Rank.points.dividedBy(4).plus(1);
                return eff;
            },  
            unlocked() {return hasMilestone("Rank", 0)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        2: {
            requirementDescription: "<font size='3'><b>Rank 3</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Just boost Prestige by a flat 500x.</span>'},
            done() {return player.Rank.points.gte(3)},
            unlocked() {return hasMilestone("Rank", 1)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        3: {
            requirementDescription: "<font size='3'><b>Rank 4</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Passively generate 5% of Honor gain on reset every second.</span>'},
            done() {return player.Rank.points.gte(4)},
            unlocked() {return hasMilestone("Rank", 2)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        4: {
            requirementDescription: "<font size='3'><b>Rank 5</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Passive Honor generation increased to 25%.</span>'},
            done() {return player.Rank.points.gte(5)},
            unlocked() {return hasMilestone("Rank", 3)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        5: {
            requirementDescription: "<font size='3'><b>Rank 7</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Passive Honor generation increased to 100%, remove the ability to perform the Honor reset. <br>However, Ranks suffer a price jump and become 100 times more expensive.</span>'},
            done() {return player.Rank.points.gte(7)},
            unlocked() {return hasMilestone("Rank", 4)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        6: {
            requirementDescription: "<font size='3'><b>Rank 8</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Slightly weaken the second Prestige softcap.</span>'},
            done() {return player.Rank.points.gte(8)},
            unlocked() {return hasMilestone("Rank", 5)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        7: {
            requirementDescription: "<font size='3'><b>Rank 10</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Further weaken the second Prestige softcap.</span>'},
            done() {return player.Rank.points.gte(10)},
            unlocked() {return hasMilestone("Rank", 6)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        8: {
            requirementDescription: "<font size='3'><b>Rank 12</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Each Rank boosts Honor gain.</span><br>-----------------<br>Currently: '+format(+format(tmp.Rank.milestones[this.layer, this.id].effect))+'x'},
            done() {return player.Rank.points.gte(12)},
            effect() {
                let eff = player.Rank.points.dividedBy(10).plus(1);
                return eff;
            },  
            unlocked() {return hasMilestone("Rank", 7)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        9: {
            requirementDescription: "<font size='3'><b>Rank 13</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Unlocks something new in the Honor upgrade tab.</span>'},
            done() {return player.Rank.points.gte(13)},
            unlocked() {return hasMilestone("Rank", 8)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        10: {
            requirementDescription: "<font size='3'><b>Rank 15</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Each Rank boosts Energy gain.</span><br>-----------------<br>Currently: '+format(+format(tmp.Rank.milestones[this.layer, this.id].effect))+'x'},
            done() {return player.Rank.points.gte(15)},
            effect() {
                let eff = player.Rank.points.dividedBy(7).plus(1);
                return eff;
            },  
            unlocked() {return hasMilestone("Rank", 9)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        11: {
            requirementDescription: "<font size='3'><b>Rank 22</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Ranking Up no longer resets anything.</span>'},
            done() {return player.Rank.points.gte(22)},
            unlocked() {return hasMilestone("Rank", 10)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        12: {
            requirementDescription: "<font size='3'><b>Rank 31</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Completely remove the second Prestige softcap.</span>'},
            done() {return player.Rank.points.gte(31)},
            unlocked() {return hasMilestone("Rank", 11)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
        13: {
            requirementDescription: "<font size='3'><b>Rank 50</b><font size='2'>",
            effectDescription() {return '-----------------<br><font size="2">Unlocks Glory.</span>'},
            done() {return player.Rank.points.gte(50)},
            unlocked() {return hasMilestone("Rank", 12)},
            style() {
                if (hasMilestone(this.layer, this.id)) return {
                    'background-color': '#ffcd7a',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)',
                }
                else return {
                    'background-color': '#bf8f8f',
            'border': '5px solid',
            'border-color': 'rgba(0, 0, 0, 0.125)'
                    }
                }
        },
    },
     tabFormat: [
        ["display-text",
            function() {return '('+format(player.points)+' Essence)'},
            {"font-size": "14px"}],
        ["display-text",
            function() {return '<span style="color:#31aeb0">('+format(player.Prestige.points)+' Prestige)</span>'},
            {"font-size": "14px"}],
            "blank",
            ['display-text',function(){return '<h4><span style="color:#faff92">'+quickBigColor(format(player.Honor.points),'#faff92') +' Honor</span>'}],
            ["raw-html", function() {if (hasMilestone("Rank", 5)) return "<font size='5'>(+" + (format(getResetGain("Honor"))) + " Honor/s)"}],
        ["display-text",
            function() {return "--------------------"},
            {"color": "#ffcd7a", "font-size": "32px"}],        
        ['display-text',function(){return '<h4>You are at <span style="color:#ffcd7a">Rank '+quickBigColor(format(player.Rank.points),'#ffcd7a') +'</span>,'}],
                ["display-text",
                    function() {return "which boosts <span style='color:#31aeb0'>Prestige</span> by <span style='color:#ffcd7a'> "+ format(tmp.Rank.effect) +"x</span>."},
                    {"font-size": "16px"}],
                "blank",
                 "prestige-button",
                 "blank",
                 ["display-text",
                    function() {return "============================="},
                    {"color": "#ffcd7a", "font-size": "32px"}],
                 ["display-text",
                    function() {return "----------Tier 1 Reset Layer----------"},
                    {"color": "#ffcd7a", "font-size": "32px"}],
                    ["display-text",
                        function() {return "Ranking up resets <span style='color:#31aeb0'>Prestige</span> features like Honor does, but instead gain <span style='color:#ffcd7a'>Ranks</span>, which operate on a milestone-based system in addition to boosting <span style='color:#31aeb0'>Prestige</span>."},
                        {"font-size": "16px"}],
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#ffcd7a", "font-size": "32px"}],
                            ["display-text",
                                function() {return "============================="},
                                {"color": "#ffcd7a", "font-size": "32px"}],
                    ['display-text',function(){return '<span style="color:#faff92">'+format(player.Honor.points)+' Honor</span>'}],
                    ["bar", "rankbar"],
                    //["raw-html", function() {if (hasUpgrade("Level", 22)) return "<font size='3'>(+" + (format(getResetGain("Prestige"))) + " Prestige/s)"}],
                    ["display-text",
                        function() {return "--------------------"},
                        {"color": "#ffcd7a", "font-size": "32px"}],
                        "milestones",
                        ["display-text",
                            function() {return "--------------------"},
                            {"color": "#ffcd7a", "font-size": "32px"}],
                    
                        ],
    infoboxes:{
        KnowledgeLore: {
         title: "Beans",
         titleStyle: {'color': '#000000'},
         body: "You find yourself in a long-forgotten, extremely overgrown jungle riddled with ruins.<br><br>Naturally you decide to start growing some delicious Beans. Maybe if you grow enough, something will happen?",
         bodyStyle: {'background-color': "#000000"}
     }
 },
})