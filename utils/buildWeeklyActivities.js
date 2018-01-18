var definition = require('../manifest/DestinyMilestoneDefinition.json');
var activities = require('../manifest/DestinyActivityDefinition.json');

function hashMapping(base){
    var hashMap = {};
    var index = 0;
    for(let item of base){
        hashMap[item.json.hash] = index;
        index++ ;
    };
    return hashMap;
}

function getModification(quest) {
    var map = hashMapping(activities);
    var hash;
    if (quest.activity) {
        hash = quest.activity.activityHash;
        return activities[map[hash]].json.displayProperties.name;
    }
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
                modification: getModification(inputQuests[0]) || '',
                // icon: displayProperties.icon
                about: displayProperties ? displayProperties.description : ''
            }
            outputData.push(newItem);
        }
    }
    return outputData;
}

module.exports = buildWeeklyActivities;