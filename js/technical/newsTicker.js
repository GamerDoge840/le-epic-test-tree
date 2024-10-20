let newsTicker = {
    current: [],
    pos: 0,
    new: true,
}

let newsEntries = [// Standard news
[true, "This is a news ticker."], [true, "Hrm"], [true, "News ticker annoying you? Head to the options and turn it off. It's as simple as that."], [true, "Prestreestuck? What's that? Andrew Hussie died in a tragic car accident in 2009. Wake up."], [true, "Don't forget to take care of yourself, goober."], [true, "The next news ticker is a lie, and therefore cannot be trusted."], [true, "The next news ticker is telling the truth, and absolutely must be trusted."], [true, "The truth of the next news ticker cannot be ascertained. Due to it's dubious authenticity, it should be taken with a grain of salt."], [true, "This thing is extremely annoying and yet you still keep it on?"], [true, "Prestige: widespread respect and admiration felt for someone or something on the basis of a perception of their achievements or quality."], 
[true, "Homestuck does not exist, and so does Prestreestuck. These are illusions, figments of your imagination."], [true, "Click this to not get a secret achievement."], [true, "✡︎⚐︎🕆︎ ☺︎🕆︎💧︎❄︎ 🕈︎✌︎💧︎❄︎☜︎👎︎ ✡︎⚐︎🕆︎☼︎ ❄︎✋︎💣︎☜︎ ❄︎☼︎✌︎☠︎💧︎☹︎✌︎❄︎✋︎☠︎☝︎ ❄︎☟︎✋︎💧︎ ☟︎✌︎☟︎✌︎"], [true, "The cake is a lie!"], [true, "The cake is a truth."], [true, "Wash your hands after playing an incremental, it's always a good idea."], [true, "gwa"], [true, "Get real."], [true, "Next update in five hours...maybe...possibly..."], [true, "This isn't actual news."], [true, "The number must go up."], [true, "There is so such thing as too much essence. No such thing."], [true, "Personnel are to be reminded that Homestuck is not a real thing, and continued asssurance that it is will result in immediate transferance to the psych ward."], [true, "Don't forget, today is pizza day, so head on down to the cafeteria to grab yourself a hot slice!"], [true, "I hope you're progressing through this game well. It's a bit long."], [true, "You can stop playing now."], [true, "<span style='color:#ff0000'>We just ran out of white ink for a moment. Thank goodness Jerry has a concerning amount of red pens.</span>"], [true, "Breaking News: A politician somewhere just said something stupid."],
[true, "I wonder how many of these news tickers are actually related to the game?"], [true, "Saving up currency for that next upgrade I see?"], [true, "Remember to export your save, and back up that export onto some third-party file hosting site! You never know when your computer could spontaneously combust."], [true, "The game gets extremely complicated at Constellations and may require a third-party guide to progress past that point."], [true, "The reason that this game doesn't have a Discord is because that website is rife with Discord."], [true, "B̶R̶E̶A̶K̶I̶N̶G̶ N̶E̶W̶S̶:̶ A̶w̶w̶w̶ m̶a̶n̶, I̶ t̶h̶i̶n̶k̶ I̶ j̶u̶s̶t̶ b̶r̶o̶k̶e̶ t̶h̶e̶ n̶e̶w̶s̶. T̶h̶e̶r̶e̶'s̶ t̶h̶i̶s̶ w̶e̶i̶r̶d̶ l̶i̶n̶e̶ g̶o̶i̶n̶g̶ t̶h̶r̶o̶u̶g̶h̶ i̶t̶ n̶o̶w̶!̶"], [true, "𝓨𝓸𝓾 𝓵𝓸𝓿𝓮 𝓽𝓸 𝓰𝓪𝓲𝓷 𝓟𝓻𝓮𝓼𝓽𝓲𝓰𝓮, 𝔂𝓮𝓽 𝔂𝓸𝓾 𝓭𝓸𝓷'𝓽 𝓽𝔂𝓹𝓮 𝓲𝓷 𝓬𝓾𝓻𝓼𝓲𝓿𝓮. 𝓒𝓾𝓻𝓲𝓸𝓾𝓼."], [true, "Want to pay a visit to Lucifer? Go in the settings, and change the notation to Cancer. Do it. I dare you!"], [true, "At first, using the Standard notation seems to be completely fine. Then you get to the huge numbers."],
[true, "<a onclick='newsTicker.pos=-1/0'>Click here to get the next news early!</a>"], [true, "Click here to do absolutely nothing.</a>"], [true, "What's the largest number? 4 + 1."], [true, "This game is so boring, it's all just buying upgrades!"], [true, "EVIL Incrementals be like: Buy this upgrade to divide point gain by 1.5x! (Would that just be a Decremental?)"], [true, "Buy upgrade, number goes up more, brain gets dopamine. Rinse and repeat."],
[true, "What is Essence, really? All we know is that enough of it can form Prestige..."], [true, "I hate this job."], [true, "Ever notice how Prestige is just called that, instead of Prestige Points?"],
[true, "Did you know? This game is meant to be played in single-tab mode."], [true, "You haven't known true suffering until you've played through Solarians."],
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
[ () => (hasUpgrade('Prestige', 23)), "You really know how to extract essence from those upgrades, huh?",
],
[ () => (hasUpgrade('Prestige', 31)), "This news ticker is boosting itself is boosting itself is boosting itself is boosting itself is boosting itself is boosting itself is boosting itself.",
],
// Levels
[ () => (hasUpgrade('Prestige', 51)), "What's an Incremental without a leveling system?",
],
[ () => (hasUpgrade('Prestige', 51)), "It sure would be nice if this engine let you put two different prestige buttons belonging to different layers in the same tab...",
],
[ () => (hasUpgrade('Prestige', 51)), "Le vel has arrived.",
],
[ () => (hasUpgrade('Prestige', 51)), "What happens if you level down instead...?",
],
// Honor
[ () => (player.Honor.total.gte(1)), "Do you feel honored yet?",
],
[ () => (player.Honor.total.gte(1)), "Honor: high respect; great esteem.",
],
[ () => (player.Honor.total.gte(1)), "Recovering from a reset sure is fun..................................................NOT!",
],
[ () => (player.Honor.total.gte(1)), "You should feel honored for reaching Honor.",
],
[ () => (player.Honor.total.gte(1)), "Ever notice how reset layers in incrementals have two different phases? Phase 1 is early progression into the reset, where the upgrades focus on speeding your recovery, automation, and quality of life, while Phase 2 is more about unlocking new features since you've automated everything that caused you pain in the previous phase.",
],
[true, () => {
    let list = ["Terraria", "Minecraft", "Antimatter Dimensions", "Synergism", "Incremental Mass", "Cookie Clicker", "Dodeca Dragons", "The Original Prestige Tree", "Calculator Evolution", "Grass Cutting Incremental", "Crop Farming Incremental", "The Plant Tree", "Ordinal Markup", "Ordinal Pringles", "Celestial Incremental", "Factorio", "Satisfactory", "Download RAM Idle", "NGU Idle", "Shark Incremental", "Fundamental", "SC2FMFR", "Pizza Tower",];
    return "Also try " + list[Math.floor(Math.random() * list.length)] + "!";
}
],
[true, () => {
    let list = ["Terraria", "Minecraft", "Antimatter Dimensions", "Synergism", "Incremental Mass", "Cookie Clicker", "Dodeca Dragons", "The Original Prestige Tree", "Calculator Evolution", "Grass Cutting Incremental", "Crop Farming Incremental", "The Plant Tree", "Ordinal Markup", "Ordinal Pringles", "Celestial Incremental", "Factorio", "Satisfactory", "Download RAM Idle", "NGU Idle", "Shark Incremental", "Fundamental", "SC2FMFR", "Pizza Tower",];
    return "Have you played " + list[Math.floor(Math.random() * list.length)] + " yet?";
}
],
[true, () => {
    let list = ["Grass", "Cookies", "Antimatter", "Points"];
    return "Now with 100% more " + list[Math.floor(Math.random() * list.length)] + "!";
}
],
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
