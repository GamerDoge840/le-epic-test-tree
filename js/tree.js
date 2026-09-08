var layoutInfo = {
    startTab: "none",
    startNavTab: "overworld",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)

addNode("PAU",{
    row: "side",
    color:'blue',
    tooltip: 'Pause Game',
    onClick(){if(player.devSpeed!=1e-300) player.devSpeed = 1e-300
    else player.devSpeed = 1},
    canClick(){return true}
})

addLayer("overworld", {
    tabFormat: [["tree", [
        ['p'],
        ['h'],
        ],
    ]],
    previousTab: "",
    leftTab: true,
})