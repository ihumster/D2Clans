var definition = require('../manifest/DestinyMilestoneDefinition.json');

function hashMapping(base){
    var hashMap = {};
    var index = 0;
    for(let item of base){
        hashMap[item.json.hash] = index;
        index++ ;
    };
    return hashMap;
}

function resolveQuests ( milstoneIndex, questHash) {};

function buildWeeklyActivities(inputData) {;
    var map = hashMapping(definition); 
    var outputData = [];
    for (let item in inputData) {
        var displayProperties = definition[map[item]].json.displayProperties;
        let newItem = {
            title: displayProperties ? displayProperties.name : ''
        }
        outputData.push(newItem);
    }
    return outputData;
}

module.exports = buildWeeklyActivities;