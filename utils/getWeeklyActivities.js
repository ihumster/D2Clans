const Destiny2API = require('node-destiny-2');
const apiKey = require('./apiKey')
const destiny = new Destiny2API({
    key: apiKey,
    oauthConfg: {
        id: 23137,
        secret: null
    }
});

const milestones = require('../_manifest/DestinyMilestoneDefinition.json');
const activities = require('../_manifest/DestinyActivityDefinition.json');
const objectives = require('../_manifest/DestinyObjectiveDefinition.json');

function buildWeeklyActivities(inputData) {
    var isDataExist = typeof inputData === 'object' && inputData.length != 0;
    var errors = [];
    var outputData = []
    if (isDataExist) {
        for (let item in inputData) {
            try {
                let responseItem = {};
                let isHotSpot = milestones[item].friendlyName == 'Hotspot';
                if (inputData[item].availableQuests) {
                    responseItem.quests = getQuests(inputData[item]);
                }

                if (isHotSpot) {
                    responseItem.title = responseItem.quests[0].title;
                    responseItem.about = responseItem.quests[0].about;
                    responseItem.icon = responseItem.quests[0].icon;
                    responseItem.img = responseItem.quests[0].img;
                } else if (milestones[item].displayProperties) {
                    responseItem.title = milestones[item].displayProperties.name;
                    responseItem.about = milestones[item].displayProperties.description;
                    responseItem.icon = milestones[item].displayProperties.icon || null;
                    responseItem.img =  inputData[item].availableQuests ? responseItem.quests[0].img || milestones[item].image : milestones[item].image || null;
                } 
                
                if (inputData[item].availableQuests) {
                    if (responseItem.quests[0].title == responseItem.title) {
                        responseItem.quests[0].title = null;
                    }
                    if (responseItem.quests[0].about == responseItem.about) {
                        responseItem.quests[0].about = null;
                    }
                    if (responseItem.quests[0].icon == responseItem.icon) {
                        responseItem.quests[0].icon = null;
                    }
                }

                if (responseItem.title) {
                    if (!responseItem.about) {
                        errors.push(item + ' description is not found.');
                    } else {
                        outputData.push(responseItem);
                    }
                }
            } catch (error) {
                errors.push(item + ' item is not found. ' + error.message);
            }
        }
    }
    return {
        outputData: outputData,
        errors: errors
    }

    function getQuests (data) {
        let outputQuests = [];
        // currentPathQuests - here are all quest hashes
        let currentPathQuests = milestones[data.milestoneHash].quests;
        let inputQuestsArray = data.availableQuests
        
        for (let item of inputQuestsArray) {
            let currentHash = item.questItemHash;
            let newObjectToPush = {};
            if (item.challenges){
                newObjectToPush.challenges = getChallenges(item.challenges);
            }
            if (item.activity){
                newObjectToPush.activity = getActivities (item.activity);
            }
            if (currentPathQuests[currentHash].displayProperties) {
                newObjectToPush.title = currentPathQuests[currentHash].displayProperties.name || null;
                newObjectToPush.about = currentPathQuests[currentHash].displayProperties.description || null;
                newObjectToPush.icon = currentPathQuests[currentHash].displayProperties.icon || null;
                if (item.challenges) {
                    newObjectToPush.img = newObjectToPush.activity ? newObjectToPush.activity.img || currentPathQuests[currentHash].overrideImage : currentPathQuests[currentHash].overrideImage || null;
                } else { 
                    newObjectToPush.img = currentPathQuests[currentHash].overrideImage || null;
                }
            }
            outputQuests.push(newObjectToPush);
        }
        return outputQuests;
    }

    function getActivities (activity) {
        let itemToOutput = {};
        let currentHash = activity.activityHash;
        let activityItem = activities[currentHash]
        try {
            itemToOutput = {
                title: activityItem.displayProperties.name || null,
                about: activityItem.displayProperties.description || null,
                icon: activityItem.displayProperties.icon || null,
                img: activityItem.pgcrImage || null,
            };
        } catch (error) {
            errors.push(item + ' activity is not found.' + error.message);
        }
        return itemToOutput;
    }

    function getChallenges(items) {
        let output = [];
        let objectToPush ={};

        for (let item of items) {
            let hash = item.objectiveHash;
            let currentObjective = objectives[hash].displayProperties;
            let isDuplicate = output.some((element)=> element.title == currentObjective.name );
            if (!isDuplicate) {
                output.push({
                    title: currentObjective.name || null,
                    about: currentObjective.description || null,
                    icon: currentObjective.icon || null
                });
            }
        }
        return output;
    }
};

module.exports = buildWeeklyActivities;

