let modInfo = {
	name: "INCREMENTER",
	id: "thebigassnumbergameidosupposeitis",
	author: "The Big G",
	pointsName: "Number",
	modFiles: ["Layers/Row 0/Level.js", "math.js", "Layers/Side/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
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
	return hasUpgrade("Level", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.0000001)
	if (hasUpgrade('Level', 21)) gain = gain.times(1.10)
	if (hasUpgrade('Level', 22)) gain = gain.times(1.20)
	if (hasUpgrade('Level', 23)) gain = gain.times(1.30)
	if (hasUpgrade('Level', 24)) gain = gain.times(1.40)
	if (hasUpgrade('Level', 31)) gain = gain.times(1.50)
	if (hasUpgrade('Level', 32)) gain = gain.times(1.60)
	if (hasUpgrade('Level', 33)) gain = gain.times(1.70)
	if (hasUpgrade('Level', 34)) gain = gain.times(1.80)
	if (hasUpgrade('Level', 51)) gain = gain.times(1.90)
	if (hasUpgrade('Level', 52)) gain = gain.times(2.00)
	if (hasUpgrade('Level', 53)) gain = gain.times(2.10)
	if (hasUpgrade('Level', 54)) gain = gain.times(2.20)
	if (hasUpgrade('Level', 41)) gain = gain.times(2)
	if (hasUpgrade('Level', 42)) gain = gain.times(3)
	if (hasUpgrade('Level', 43)) gain = gain.times(4)
	if (hasUpgrade('Level', 44)) gain = gain.times(5)

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