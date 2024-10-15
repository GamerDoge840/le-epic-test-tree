let modInfo = {
	name: "Bean Tree",
	id: "BeanQuestToBeTheBeanBest",
	author: "The Big G",
	pointsName: "Beans",
	modFiles: ["Layers/Forgotten Jungle/EXP.js","Layers/Forgotten Jungle/Beans.js", "math.js", "Layers/Side/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0.0000001), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "The Whole Game",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- Added the entire game.<br>
		- Added nothing else other than that.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.01)
	gain=gain.times(buyableEffect('Beans', 11))
	//stoerege
	//gain=gain.times(buyableEffect('Knowledge', 11))
	//gain=gain.times(buyableEffect('Knowledge', 12))
	//gain=gain.times(buyableEffect('Knowledge', 21))
	//gain=gain.times(buyableEffect('Scrolls', 11))
	//if (hasUpgrade('Knowledge', 12)) gain = gain.times(3)
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