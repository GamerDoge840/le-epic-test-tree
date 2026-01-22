let modInfo = {
	name: "Beans Incremental",
	id: "beansmaxxing",
	author: "The Big G",
	pointsName: "Beans",
	modFiles: ["Layers/Bean World/BeanTier.js","Layers/Bean World/Factory.js","Layers/Bean World/Gold.js","Layers/Bean World/Money.js","Layers/Bean World/BeanLevel.js","Layers/Bean World/Beans.js","math.js", "Layers/Side/achievements.js", "Layers/Side/stats.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Beans Incremental",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "moneyReset", "goldReset"]

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

	let gain = new Decimal(0.001)
    gain=gain.times(buyableEffect('Beans', 1))
	gain=gain.times(buyableEffect('Beans', 3))
	gain=gain.times(buyableEffect('Money', 1))
	gain=gain.times(buyableEffect('Gold', 1))
	gain=gain.times(buyableEffect('Money', 4))

	if (player.BeanLevel.total.gte(1))
		gain = gain.times(tmp.BeanLevel.effect);
	if (player.Factory.total.gte(1))
		gain = gain.times(tmp.BeanTier.beanEffect);

	if (hasMilestone('Factory', 2)) gain = gain.times(tmp.Factory.milestones[2].effect)
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

