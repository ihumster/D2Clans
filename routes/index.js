var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/getWeeklyActivities', function(req, res){
    // console.log(req);
    res.setHeader('Content-Type', 'application/json');
    res.json({"data":"test"})
})

module.exports = router;
