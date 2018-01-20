var definition = require('../manifest/DestinyMilestoneDefinition.json');
var activities = require('../manifest/DestinyActivityDefinition.json');
var modifier = require('../manifest/DestinyActivityModifierDefinition.json');

function hashMapping(base){
    var hashMap = {};
    var index = 0;
    for(let item of base){
        hashMap[item.json.hash] = index;
        index++ ;
    };
    return hashMap;
}

function getModification(quests) {
    var map = hashMapping(activities);
    var mod = hashMapping(modifier);
    var outputMods = [];
    
    var hash;
    var outpuQuests = [];
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
            outpuQuests.push({
                    title: activities[map[hash]].json.displayProperties.name,
                    mods: outputMods
                });
        }
    }
    return outpuQuests;
};

function buildWeeklyActivities(inputData) {;
    var map = hashMapping(definition); 
    var outputData = [];

    for (let item in inputData) {
        let inputQuests = inputData[item].availableQuests
        let quests = definition[map[item]].json.quests;
        let questHash;
        if (inputQuests){
            let questHash = inputQuests[0].questItemHash;
            let displayProperties = quests[questHash].displayProperties;
            let newItem = {
                title: displayProperties ? displayProperties.name : '',
                modification: getModification(inputQuests) || [],
                // icon: displayProperties.icon
                about: displayProperties ? displayProperties.description : ''
            }
            outputData.push(newItem);
        }
    }
    return outputData;
}

module.exports = buildWeeklyActivities;