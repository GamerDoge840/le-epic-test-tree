var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
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
    onClick(){if(player.devSpeed!=1e-300) player.devSpeed = 1e-300
    else player.devSpeed = 1},
    canClick(){return true}
})

addLayer("tree-tab", {
    tabFormat: [["tree", [
        ['Prestige'],
        ['Honor'],
        ],
    ]],
    previousTab: "",
    leftTab: true,
})