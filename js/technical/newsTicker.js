let newsTicker = {
    current: [],
    pos: 0,
    new: true,
}

let newsEntries = [// Standard news
[true, "This is a news ticker."], [true, "Hrm"], [true, "News ticker annoying you? Head to the options and turn it off. It's as simple as that."], [true, "Prestreestuck? What's that? Andrew Hussie died in a tragic car accident in 2009. Wake up."], [true, "Don't forget to take care of yourself, goober."], [true, "The next news ticker is a lie, and therefore cannot be trusted."], [true, "The next news ticker is telling the truth, and absolutely must be trusted."], [true, "The truth of the next news ticker cannot be ascertained. Due to it's dubious authenticity, it should be taken with a grain of salt."], [true, "This thing is extremely annoying and yet you still keep it on?"], [true, "Prestige: widespread respect and admiration felt for someone or something on the basis of a perception of their achievements or quality."], 
[true, "Homestuck does not exist."], [true, "Click this to not get a secret achievement."], [true, "✡︎⚐︎🕆︎ ☺︎🕆︎💧︎❄︎ 🕈︎✌︎💧︎❄︎☜︎👎︎ ✡︎⚐︎🕆︎☼︎ ❄︎✋︎💣︎☜︎ ❄︎☼︎✌︎☠︎💧︎☹︎✌︎❄︎✋︎☠︎☝︎ ❄︎☟︎✋︎💧︎ ☟︎✌︎☟︎✌︎"], [true, "The cake is a lie!"], [true, "The cake is a truth."], [true, "Wash your hands after playing an incremental, it's always a good idea."], [true, "gwa"], [true, "Get real."], [true, "Next update in five hours...maybe...possibly..."], [true, "This isn't actual news."], [true, "The number must go up."], [true, "There is so such thing as too much essence. No such thing."], [true, "Personnel are to be reminded that Homestuck is not a real thing, and continued asssurance that it is will result in immediate transferance to the psych ward."], [true, "Don't forget, today is pizza day, so head on down to the cafeteria to grab yourself a hot slice!"], [true, "I hope you're progressing through this game well. It's a bit long."], [true, "You can stop playing now."], [true, "<span style='color:#ff0000'>We just ran out of white ink for a moment. Thank goodness Jerry has a concerning amount of red pens.</span>"], [true, "Breaking News: A politician somewhere just said something stupid."],
[true, "I wonder how many of these news tickers are actually related to the game?"], [true, "Saving up currency for that next upgrade I see?"], [true, "Remember to export your save, and back up that export onto some third-party file hosting site! You never know when your computer could spontaneously combust."], [true, "The game gets extremely complicated at Constellations and may require a third-party guide to progress past that point."], [true, "The reason that this game doesn't have a Discord is because that website if rife with Discord."], [true, "B̶R̶E̶A̶K̶I̶N̶G̶ N̶E̶W̶S̶:̶ A̶w̶w̶w̶ m̶a̶n̶, I̶ t̶h̶i̶n̶k̶ I̶ j̶u̶s̶t̶ b̶r̶o̶k̶e̶ t̶h̶e̶ n̶e̶w̶s̶. T̶h̶e̶r̶e̶'s̶ t̶h̶i̶s̶ w̶e̶i̶r̶d̶ l̶i̶n̶e̶ g̶o̶i̶n̶g̶ t̶h̶r̶o̶u̶g̶h̶ i̶t̶ n̶o̶w̶!̶"], [true, "𝓨𝓸𝓾 𝓵𝓸𝓿𝓮 𝓽𝓸 𝓰𝓪𝓲𝓷 𝓟𝓻𝓮𝓼𝓽𝓲𝓰𝓮, 𝔂𝓮𝓽 𝔂𝓸𝓾 𝓭𝓸𝓷'𝓽 𝓽𝔂𝓹𝓮 𝓲𝓷 𝓬𝓾𝓻𝓼𝓲𝓿𝓮. 𝓒𝓾𝓻𝓲𝓸𝓾𝓼."], [true, "Want to pay a visit to Lucifer? Go in the settings, and change the notation to Cancer. Do it. I dare you!"], [true, "At first, using the Standard notation seems to be completely fine. Then you get to the huge numbers."],
[true, "<a onclick='newsTicker.pos=-1/0'>Click here to get the next news early!</a>"], [true, "Click here to do absolutely nothing.</a>"], [true, "What's the largest number? 4 + 1."], [true, "This game is so boring, all it's just buying upgrades!"], [true, "EVIL Incrementals be like: Buy this upgrade to divide point gain by 1.5x! (Would that just be a Decremental?)"], [true, "Buy upgrade, number goes up more, brain gets dopamine. Rinse and repeat."],
[true, () => {
    let newsCount = newsEntries.length
      , newsAvail = newsEntries.filter(x => run(x[0])).length;
    return "If you're wondering, there's currenty " + format(newsAvail, 0) + " news available. You might be able to unlock a few more if you progress through the game!";
}
], 

// Prestige
[ () => (hasUpgrade('Prestige', 21)), "Wow, you bought an upgrade? Incredible.",
],
[ () => (hasUpgrade('Prestige', 22)), "An upgrade that upgrades upgrades? Pff, that's nothing, later in the game you'll probably get an upgrade that upgrades an upgrade that upgrades an upgrade that upgrades an upgrade that upgrades an upgrade that upgrades an upgrade that upgrades an upgrade.",
],

[true, () => {
    let list = ["Terraria", "Minecraft", "Antimatter Dimensions", "Synergism", "Incremental Mass", "Cookie Clicker", "Dodeca Dragons", "The Original Prestige Tree", "Calculator Evolution", "Grass Cutting Incremental", "Crop Farming Incremental", "The Plant Tree", "Ordinal Markup", "Ordinal Pringles", "Celestial Incremental", "Factorio", "Satisfactory", "Download RAM Idle", "NGU Idle", "Shark Incremental", "Fundamental", "SC2FMFR", "Pizza Tower",];
    return "Also try " + list[Math.floor(Math.random() * list.length)] + "!";
}
],
//GARGBAGE BEYOND THIS POINT
//============================================================================================
//[true, () => {
    //let list = ["かめりあ", "Toby Fox"];
    //return "The universe will collapse when " + list[Math.floor(Math.random() * list.length)] + " becomes a TMT mod-creator";
//}
//],
// Quote machine
//[true, "Introducing: The Quote Machine™! The rules are simple: If you say something funny that is related to the game I will put your speech here. Good luck!"],
// Conditional news
//[ () => player.points.gte(Number.MAX_VALUE), "Hold on, numbers in this game can go above 1.798e308?"], [ () => !options.forceOneTab, "This game plays best with Single-Tab Mode set to ALWAYS, I sugeest you to turn that on by clicking the gear button. The option is in the Display tab. (I mean, since you can turn this news ticker on, I sure know you can find it yourself.)"], [ () => Math.random() < .001, "Most of the game that has a news ticker feature always have these kind of messages that's rarer to get than other ones and they are all about how lucky you are to be able to get those. So uhh, if you can see this, congrats I guess."],
// Jacorb (always on)
//[true, "What if you want to enjoy your currently playing incremental game, but the game says (softcapped), (scaled), or any text in parentheses in general"], [true, "If you remember what the old Prestige Tree theme looks like, you deserve a veteran boost to your point gain."], [true, "If you remember this image --&gt; <img src='remove.png' width='12' height='12'>, you deserve a veteran boost to your point gain."], [true, "Distance Incremental - Metascore: 713/100. Critics' Review: \"Beautiful game with lots of unlockable mechanics, very large numbers and funny gags. Also (softcapped)\""], [true, "The Prestige Tree - Gamerscore: 350/100. Critics' Review: \"I mean, the game is so good it even has a modding community\""], [true, "The four High Gods of Jacorbian community: (softcapped), J, gwa, and Homestuck."], [true, "Calling buyables \"buyables\" assumes that one-time-purchasable upgrades aren't \"buyable\""], [true, "Did you know that the game <i>Derivative Clicker</i> describe its one time purchasable upgrades bought using prestige currencies as \"buyables\" and the repeatable upgrades bought using money as \"upgrades\"? Next time if you see someone refer to repeatable upgrades as \"buyables\" tell them this fact."],
//[true, "This news message is (hardca"], [true, () => {
    //let str = "This news message is (softcapped).";
    //let news = "";
    //for (let chr = 0; chr < str.length; chr++)
       // news += `<span style='display:inline-block;padding-left:${1.2 ** chr}px'>${str[chr]}</span>`;
   // return news;
//}
//], [true, () => {
    //let str = "This news message is (scaled).";
    //let news = "";
   // for (let chr = 0; chr < str.length; chr++)
        //news += `<span style='display:inline-block;transform:scaleX(${1.2 ** chr / 20 + 1});width:${1.2 ** chr / 20 + 1}ch'>${str[chr]}</span>`;
    //return news;
//}
//],
// Aarex
//[ () => tmp.Prestige.layerShown, "The Aarex Dimensions are supposed to recreate Universal Attractor, not Antimatter Dimensions, what are you talking about?"], [ () => tmp.aar.layerShown, "Insert jokes about Aarex timewalls here- wait, he doesn't make timewalls anymore?"], [ () => tmp.aar.layerShown, "Insert jokes about 5 hours here- wait, the Reality update is already released?"], [ () => tmp.aar.layerShown, "Still waiting for Aarex's Upsiding by the way"],
];

function updateNewsTicker(diff, force) {
    newsTicker.new = false;
    if (force || !newsTicker.current[1] || newsTicker.pos + 50 < -(document.getElementById("newsmessage")?.offsetWidth || 0)) {
        newsTicker.current = newsEntries[force || Math.floor(Math.random() * newsEntries.length)];
        if (!force)
            while (!run(newsTicker.current[0]))
                newsTicker.current = newsEntries[Math.floor(Math.random() * newsEntries.length)];
        newsTicker.current = run(newsTicker.current[1]);
        newsTicker.pos = window.innerWidth + 50;
        newsTicker.new = true;
    }
    newsTicker.pos -= diff * 150;
}
