let modInfo = {
	name: "Accretive Ascension",
	id: "ascendingthataccretion",
	author: "The Big G",
	pointsName: "Essence",
	modFiles: ["Layers/Realm of Origin/Purity.js","Layers/Realm of Origin/Fruits.js","Layers/Realm of Origin/Levels/Level.js","Layers/Realm of Origin/Essence.js","math.js", "Layers/Side/achievements.js", "Layers/Side/stats.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0",
	name: "Accretive Ascension",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>s
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "accumulatorMiniReset", "levelReset"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("Essence", 11)
}


// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.1)

    //Direct Boosts

	//Upgrades
	if (hasUpgrade('Essence', 12)) gain = gain.times(upgradeEffect('Essence', 12))
	if (hasUpgrade('Essence', 13)) gain = gain.times(upgradeEffect('Essence', 13))
    if (hasUpgrade('Essence', 23)) gain = gain.times(upgradeEffect('Essence', 23))
	
	//Buyables
	gain=gain.times(buyableEffect('Fruits', 2))

    //Milestones
	if (hasMilestone('Level', 1)) gain = gain.times(tmp.Level.milestones[1].effect)
	if (hasMilestone('Level', 3)) gain = gain.times(tmp.Level.milestones[3].effect)

	//Layer Effects
	if (player.Level.total.gte(1))
		gain = gain.times(tmp.Level.essenceEffect);
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

