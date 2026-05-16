let modInfo = {
	name: "The Particle Tree",
	id: "particlingitup",
	author: "The Big G",
	pointsName: "Energy",
	modFiles: ["Layers/U1/Charge.js","Layers/U1/Energy.js","Layers/Side/achievements.js","Layers/Side/stats.js","math.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Full Release",
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
	return hasUpgrade("e", 11)
}


// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.0001)
	gain=gain.times(buyableEffect('e', 11))
	gain=gain.times(buyableEffect('e', 12))
	gain=gain.times(buyableEffect('e', 13))
	if (hasUpgrade("e", 12)) gain = gain.times(upgradeEffect("e", 12))
	if (hasUpgrade("e", 13)) gain = gain.times(upgradeEffect("e", 13))
	if (hasUpgrade("e", 23)) gain = gain.times(upgradeEffect("e", 23))
	if (hasUpgrade("e", 43)) gain = gain.times(upgradeEffect("e", 43))
	if (hasUpgrade("c", 11)) gain = gain.times(upgradeEffect("c", 11))
	if (hasUpgrade("c", 12) && !player.points.gte('10')) gain = gain.times(upgradeEffect("c", 12))
	if (hasUpgrade("c", 13)) gain = gain.times(upgradeEffect("c", 13))
	if (hasUpgrade("c", 21))  gain = gain.times(tmp.c.upgrades[21].effect1)
	if (hasUpgrade("c", 22)) gain = gain.times(upgradeEffect("c", 22))
	if (hasUpgrade("c", 23) && player.points.gte('100')) gain = gain.times(upgradeEffect("c", 23))
    if (hasUpgrade("c", 31)) gain = gain.times(upgradeEffect("c", 31))
	if (hasUpgrade("c", 51)) gain = gain.times(2)
    if (hasUpgrade("c", 52)) gain = gain.times(upgradeEffect("c", 52))
	if (hasUpgrade("c", 53)) gain = gain.pow(upgradeEffect("c", 53))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    notation:'Scientific',
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade("e", 111111)
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

