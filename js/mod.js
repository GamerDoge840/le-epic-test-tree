let modInfo = {
	name: "Accretive Ascension",
	id: "falsifiedapotheosis",
	author: "Seer",
	pointsName: "Shards",
	modFiles: ["Layers/Row 0/Fragments.js","Layers/Row 0/Shards.js","math.js", "Layers/Side/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
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
	return hasUpgrade("Shards", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.0001)
	if (hasUpgrade('Shards', 21)) gain = gain.times(2)
	if (hasUpgrade('Shards', 22)) gain = gain.times(1.50)
	if (hasUpgrade('Shards', 23)) gain = gain.times(1.25)
	if (hasUpgrade('Shards', 24)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 31)) gain = gain.times(1.30)
	gain=gain.times(buyableEffect('Shards', 11))
    if (hasUpgrade('Shards', 32)) gain = gain.times(1.50)
	if (hasUpgrade('Shards', 33)) gain = gain.times(1.30)
	if (hasUpgrade('Shards', 34)) gain = gain.times(1.25)
	if (hasUpgrade('Shards', 42)) gain = gain.times(1.99)
	if (hasUpgrade('Shards', 43)) gain = gain.times(upgradeEffect('Shards', 43))
	if (hasUpgrade('Shards', 51)) gain = gain.times(upgradeEffect('Shards', 51))
	if (hasUpgrade('Shards', 53)) gain = gain.times(2.50)
	if (hasUpgrade('Shards', 62)) gain = gain.times(upgradeEffect('Shards', 62))
	if (hasUpgrade('Shards', 64)) gain = gain.times(3.00)
	if (hasUpgrade('Fragments', 11)) gain = gain.times(upgradeEffect('Fragments', 11))
	if (hasUpgrade('Shards', 15)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 25)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 35)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 45)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 55)) gain = gain.times(1.10)
	if (hasUpgrade('Shards', 65)) gain = gain.times(1.10)
	if (hasUpgrade('Fragments', 23)) gain = gain.times(upgradeEffect('Fragments', 23))
	if (hasUpgrade('Fragments', 31) && !player.points.gte('1')) gain = gain.times(2.00)
	if (hasUpgrade('Fragments', 33)) gain = gain.times(upgradeEffect('Fragments', 33))
	gain=gain.times(buyableEffect('Shards', 12))
	if (hasUpgrade('Fragments', 43) && player.points.gte('1')) gain = gain.times(2.00)
	if (hasUpgrade('Shards', 71)) gain = gain.times(1.25)
	if (hasUpgrade('Shards', 75)) gain = gain.times(1.25)
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