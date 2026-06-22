let modInfo = {
	name: "Tree of Civilization",
	id: "evolvemaxxing",
	author: "The Big G",
	pointsName: "Research",
	modFiles: [ "Layers/Main/Core Resources/Culture.js",
		"Layers/Main/Intermediate Materials/Fuel.js","Layers/Main/Intermediate Materials/Metals.js","Layers/Main/Basic Materials/Minerals.js","Layers/Main/Workshop.js",
		"Layers/Main/Basic Materials/Wood.js","Layers/Main/Core Resources/Population.js","Layers/Main/Basic Materials/Food.js","Layers/Main/Core Resources/Research.js","Layers/Main/Homeworld.js","math.js", 
		"Layers/Side/achievements.js", "Layers/Side/stats.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Tree of Civilization",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return (hasUpgrade('Research', 1))
}


// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.001)
	//Direct Bonuses
	if (hasUpgrade('Research', 8)) gain = gain.times(2)
	if (hasUpgrade('Research', 16)) gain = gain.times(3)
	if (hasUpgrade('Research', 26)) gain = gain.times(2)
	if (hasUpgrade('Research', 47)) gain = gain.times(1.25)
    if (hasUpgrade('Culture', 2)) gain = gain.times(1.025)
    if (hasUpgrade('Culture', 5)) gain = gain.times(1.025)
    if (hasUpgrade('Research', 50)) gain = gain.times(1.5)
	if (hasUpgrade('Culture', 3)) gain = gain.times(upgradeEffect('Culture', 3))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    notation:'Mixed Scientific',
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

