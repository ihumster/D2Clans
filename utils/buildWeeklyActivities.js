const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({
    key: '8d7f75b5c93c4a61a55e5c072bc8a1a4',
    oauthConfg: {
        id: 23137,
        secret: null
    }
});

var definition = require('../manifest/DestinyMilestoneDefinition.json');
var activities = require('../manifest/DestinyActivityDefinition.json');
var modifier = require('../manifest/DestinyActivityModifierDefinition.json');
var challenges = require('../manifest/DestinyObjectiveDefinition.json');

function hashMapping(base){
    var hashMap = {};
    var index = 0;
    for(let item of base){
        hashMap[item[1].hash] = index;
        index++ ;
    };
    return hashMap;
}

function getChallenge (objectives) {
    var map = hashMapping(challenges);
    var output = [];
    var contentChecker = {};
    for (let item in objectives) {
        let writtenProperty = challenges[map[objectives[item].objectiveHash]][1].displayProperties.name;
        if (!contentChecker[writtenProperty]) {
            let newItem = {
                title: writtenProperty,
                description: challenges[map[objectives[item].objectiveHash]][1].displayProperties.description
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
                        title: modifier[mod[modHashes[modItem]]][1].displayProperties.name,
                        description: modifier[mod[modHashes[modItem]]][1].displayProperties.description,
                    })
                }
            }
            if (quests[number].challenges) {
                outputChallenges = getChallenge(quests[number].challenges);
            }
            outputQuests.push({
                title: activities[map[hash]][1].displayProperties.name,
                challenges: outputChallenges,
                mods: outputMods,
                img: activities[map[hash]][1].pgcrImage || activities[map[hash]][1].image || ''
            });
        }
    }
    return outputQuests;
};

function buildWeeklyActivities(inputData) {;
    var map = hashMapping(definition); 
    var outputData = [];

    for (let item in inputData) {
        let questHash;
        try {
            let inputQuests = inputData[item].availableQuests
            let quests = definition[map[item]][1].quests;
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
                        img: definition[map[item]][1].image || quests[questHash].image ||  quests[questHash].overrideImage || quests[questHash].pgcrImage ||  ''
                    }
                    outputData.push(newItem);
    
                } else if (definition[map[item]][1].displayProperties) {
                    outputData.push({
                        title: definition[map[item]][1].displayProperties.name,
                        about: definition[map[item]][1].displayProperties.description,
                        img: definition[map[item]][1].image || definition[map[item]][1].pgcrImage || '' 
                    });
                }
            } catch (err) {
                console.log('can not build response');
            }
        } catch (e) {
            console.log('inputQuest or quest is not defined');
            destiny.getPublicMilestoneContent(item)
                .then((res) => {
                    console.dir(res.Response);
                    console.log('\n\n');
                })
                .catch((error) => {
                    console.log(`getPublicMilestoneContent Error: ${error}`);
                });
        }
    }
    
    return outputData;
}

module.exports = buildWeeklyActivities;