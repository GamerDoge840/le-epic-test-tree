var layoutInfo = {
    startTab: "tree-tab",
    startNavTab: "Overworld",
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

addLayer("Overworld", {
    tabFormat: [["tree", [
        ['Beans'],
        ['Money', 'Gold'],
        ['Factory'],
        ],
    ]],
    previousTab: "",
    leftTab: true,
})