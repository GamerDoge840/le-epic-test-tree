var layoutInfo = {
    startTab: "none",
    startNavTab: "realm-of-essence",
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

addLayer("realm-of-essence", {
    tabFormat: [["tree", [
        ['Essence'],
        ['Level', 'Fruits'],
        ['Purity'],
        ],
    ]],
    previousTab: "",
    leftTab: true,
})