var express = require('express');
var router = express.Router();
var path = require('path');
var milestoneBuilder = require('../utils/getWeeklyActivities');
var buildLeaderBoard = require('../utils/LeaderBoards');
var buildClanList = require('../utils/buildClanList');
var getResetView = require('../utils/resetViewBuilder');
var fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* GET weekly reset view page. */
router.get('/weeklyResetView', function (req, res, next) {
    var lang = req.query.lang || 'rus'
    new Promise ((resolve)=>{
        getResetView.fetchData().then((content)=>{
            var data = milestoneBuilder(content.Response, lang);
            var resolvedContent = getResetView.buildView(data.outputData);
            resolve(resolvedContent);   
        }).catch((error)=>{
            console.log('Content is not available');
            return 'Content is not available';
        });
    }).then((htmlContent)=>{  
        fs.writeFileSync(path.join(__dirname, '../', 'views', 'weeklyResetView.html'), `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Недельный ресет</title>
                <style>
                    * {
                        font-family: sans-serif;
                        font-size: 18px;
                    }
                    .iv {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 0 auto;
                        min-width: 400px;
                        max-width: 800px;
                    }
                    img {
                        width: 100%;
                    }
                    h1 {
                        font-size: 25px;
                    }
                </style>
            </head>
            <body>
                <div class="iv">${htmlContent.html}</div>
            </body>
            </html>` , (err)=>{
            })
             res.sendFile(path.join(__dirname, '../', 'views', 'weeklyResetView.html'));
    }).catch((e)=>console.log(e.message));
});

router.post('/getWeeklyActivities', function (req, res) {
    new Promise((resolve, reject)=>{
        reject();
    }).catch(()=>{
        console.log('custom');
    })
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