var milestoneBuilder = require('../utils/getWeeklyActivities');
var token;

var fetch = require('node-fetch');
// const apiKey = require('./apiKey').apiKey;
const apiKey = '6b1b4758f7ff430d9bbc2b05c7f38bcc';

function fetchData () {
    return fetch('https://www.bungie.net/Platform/Destiny2/Milestones/', {
        method: 'GET',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then((resp)=>{
            return resp.json().then((data)=>{
                return data;
            })
        });
};

function buildView (data){
    var tempString = '';
    for (let item of data) {
        let tempQuests = '';
        if (item.quests) {
            for (let quest of item.quests) {
                let tempActivity = '';
                let tempChallenges = '';
                if (quest.activity) {
                    tempActivity = `<p>
                                        <b>${quest.activity.title}</b>
                                    </p>
                                    <p>${quest.activity.about}</p>`;
                }
                if (quest.challenges) {
                    for (let challenge of quest.challenges){
                        tempChallenges = tempChallenges +  `<li>
                                                                <b>${challenge.title}: </b>${challenge.about}
                                                            </li>`;
                    }
                }
                tempQuests = tempQuests +  `<p>
                                                ${quest.title ? '<h2>' + quest.title + '</h2>' : ''}
                                                ${quest.about ? '<p>' + quest.about + '</p>' : ''}
                                                ${tempActivity}
                                                ${quest.challenges ? '<ul>' + tempChallenges + '</ul>': ''}
                                            </p>`
                
            };
        }
        let tempImg = item.img ? `<img src="https://www.bungie.net${item.img }" alt="">`:'';
        tempString = tempString +  `<div class="iv_section"><h1>${item.title}</h1>
                                        <p>${item.about}</p>
                                        <div>${tempQuests}</div>
                                        ${tempImg}
                                    </div>`
    }
    var output = {
        html: tempString
    }
    return output;
};

module.exports = {
    fetchData: fetchData,
    buildView: buildView
};