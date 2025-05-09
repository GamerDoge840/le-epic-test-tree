let modInfo = {
	name: "The Particle Tree",
	id: "manilikequarks",
	author: "The Big G",
	pointsName: "Energy",
	modFiles: ["Layers/Row 1/ColorCharge.js","Layers/Row 1/Quarks.js","Layers/Row 0/Charge.js", "math.js", "Layers/Side/stats.js", "Layers/Side/achievements.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
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
	return hasUpgrade("Charge", 11);
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.0010)
	if (hasUpgrade('Charge', 12)) gain = gain.times(upgradeEffect('Charge', 12))
	if (hasUpgrade('Charge', 13)) gain = gain.times(upgradeEffect('Charge', 13))
	if (hasUpgrade('Charge', 13)) gain = gain.times(2)
	if (hasUpgrade('Charge', 14)) gain = gain.times(upgradeEffect('Charge', 14))
	if (hasUpgrade('Charge', 22)) gain = gain.times(1.5)
	if (hasUpgrade('Charge', 24)) gain = gain.times(1.25)
	if (hasUpgrade('Charge', 31)) gain = gain.times(1.25)
	if (hasUpgrade('Charge', 101)) gain = gain.times(1.30)
	if (hasUpgrade('Charge', 101)) gain = gain.times(upgradeEffect('Charge', 101))
	gain=gain.times(buyableEffect('Charge', 11))
	if (hasUpgrade('Charge', 102)) gain = gain.times(upgradeEffect('Charge', 102))
	if (hasUpgrade('Quarks', 11)) gain = gain.times(2.5)
	if (hasUpgrade('Quarks', 12)) gain = gain.times(upgradeEffect('Quarks', 12))
	if (hasUpgrade('Quarks', 14) && !player.points.gte('1e6')) gain = gain.times(2.00)
	if (hasUpgrade('Quarks', 23)) gain = gain.times(buyableEffect('Charge', 12))
	gain=gain.times(buyableEffect('Charge', 21))
	if (hasUpgrade('Quarks', 31)) gain = gain.times(1.45)
	gain=gain.times(buyableEffect('Quarks', 11))
	if (hasUpgrade('Quarks', 32)) gain = gain.times(upgradeEffect('Quarks', 32))
	if (hasUpgrade('ColorCharge', 12)) gain = gain.times(3)
	if (hasUpgrade('ColorCharge', 13)) gain = gain.times(upgradeEffect('ColorCharge', 13))
	if (hasUpgrade('ColorCharge', 22)) gain = gain.times(upgradeEffect('ColorCharge', 22))
	if (hasUpgrade('ColorCharge', 32)) gain = gain.times(upgradeEffect('ColorCharge', 32))
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