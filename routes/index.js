var express = require('express');
var router = express.Router();
var path = require('path');
var milestoneBuilder = require('../utils/getWeeklyActivities');
var buildLeaderBoard = require('../utils/LeaderBoards');
var buildClanList = require('../utils/buildClanList');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* GET weekly reset view page. */
router.get('/weeklyResetView', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'weeklyResetView.html'));
});

router.post('/getWeeklyActivities', function (req, res) {
    var resData = milestoneBuilder(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json(resData)
});

router.post('/getLeaderBoard', function (req, res) {
    var resData = buildLeaderBoard(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json(resData)
});

router.post('/sendList', function (req, res) {
    buildClanList.write(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'sent'});
});

router.post('/getList', function (req, res) {
    new Promise ((resolve, reject)=>{
        return buildClanList.read(req.body, resolve);
    }).then((data)=>{
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.parse(data));
    });
});

module.exports = router;