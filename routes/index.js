var express = require('express');
var router = express.Router();
var path = require('path');
var milestoneBuilder = require('../utils/buildWeeklyActivities');
const Destiny2API = require('node-destiny-2');
const destiny = new Destiny2API({
    key: '8d7f75b5c93c4a61a55e5c072bc8a1a4'
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    destiny.getPublicMilestoneContent('4253138191')
        .then((res) => {
            console.log(res.Response);
            console.log('\n\n');
        })
        .catch((error) => {
            console.log(`getPublicMilestoneContent Error: ${error}`);
        });
    destiny.getDestinyEntityDefinition('DestinyMilestoneDefinition', '202035466')
        .then((res) => {
            const data = res.Response;
            console.log(data);
            console.log('\n\n');
        })
        .catch((error) => {
            console.error(`getEntityDefinition Error: ${error}`);
        });
    destiny.getItem(1, '4611686018452936098', '6917529034457803619', [300])
        .then((res) => {
            console.log(res.Response);
            console.log('\n\n');
        })
        .catch((error) => {
            console.log(`getItem Error: ${error}`);
        });
});

router.post('/getWeeklyActivities', function (req, res) {
    var resData = milestoneBuilder(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json(resData)
})

module.exports = router;