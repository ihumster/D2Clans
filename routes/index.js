var express = require('express');
var router = express.Router();
var path = require('path');
var milestoneBuilder = require('../utils/buildWeeklyActivities');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/getWeeklyActivities', function(req, res){
    var resData = milestoneBuilder(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json(resData)
})

module.exports = router;
