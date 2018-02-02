var definition = require('../manifest/DestinyMilestoneDefinition.json');
var activities = require('../manifest/DestinyActivityDefinition.json');
var modifier = require('../manifest/DestinyActivityModifierDefinition.json');
var challenges = require('../manifest/DestinyObjectiveDefinition.json');

function hashMapping(base){
    var hashMap = {};
    var index = 0;
    for(let item of base){
        hashMap[item.json.hash] = index;
        index++ ;
    };
    return hashMap;
}

function getChallenge (objectives) {
    var map = hashMapping(challenges);
    var output = [];
    var contentChecker = {};
    for (let item in objectives) {
        let writtenProperty = challenges[map[objectives[item].objectiveHash]].json.displayProperties.name;
        if (!contentChecker[writtenProperty]) {
            let newItem = {
                title: writtenProperty,
                description: challenges[map[objectives[item].objectiveHash]].json.displayProperties.description
            }
            output.push(newItem);
            contentChecker[writtenProperty] = true;
        }
    };
    return output;
}

function getModification(quests) {
    var map = hashMapping(activities);
    var mod = hashMapping(modifier);
    var outputMods = [];
    
    var hash;
    var outputQuests = [];
    var outputChallenges = [];
    for (let number in quests){
        if (quests[number].activity) {
            hash = quests[number].activity.activityHash;
            let modHashes = quests[number].activity.modifierHashes;
            if (modHashes) {          
                for (let modItem in modHashes) {
                    outputMods.push({
                        title: modifier[mod[modHashes[modItem]]].json.displayProperties.name,
                        description: modifier[mod[modHashes[modItem]]].json.displayProperties.description,
                    })
                }
            }
            if (quests[number].challenges) {
                outputChallenges = getChallenge(quests[number].challenges);
            }
            outputQuests.push({
                title: activities[map[hash]].json.displayProperties.name,
                challenges: outputChallenges,
                mods: outputMods,
                img: activities[map[hash]].json.pgcrImage || activities[map[hash]].json.image || ''
            });
        }
    }
    return outputQuests;
};

function buildWeeklyActivities(inputData) {;
    var map = hashMapping(definition); 
    var outputData = [];

    for (let item in inputData) {
        let inputQuests = inputData[item].availableQuests
        let quests = definition[map[item]].json.quests;
        let questHash;
        try {
            if (inputQuests){
                let questHash = inputQuests[0].questItemHash;
                let displayProperties = quests[questHash] ? quests[questHash].displayProperties : false;
                if (!quests[questHash]) {
                    console.log(' quest hash ' + questHash +' not found');
                }
                
                let newItem = {
                    title: displayProperties ? displayProperties.name : '',
                    modification: getModification(inputQuests) || [],
                    about: displayProperties ? displayProperties.description : '',
                    img: definition[map[item]].json.image || quests[questHash].image ||  quests[questHash].overrideImage || quests[questHash].pgcrImage ||  ''
                }
                outputData.push(newItem);

            } else if (definition[map[item]].json.displayProperties) {
                outputData.push({
                    title: definition[map[item]].json.displayProperties.name,
                    about: definition[map[item]].json.displayProperties.description,
                    img: definition[map[item]].json.image || definition[map[item]].json.pgcrImage || '' 
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    
    return outputData;
}

module.exports = buildWeeklyActivities;