var mongoose = require('mongoose');
var importedTable = require('../manifest/Milestones.json')
// mongodb://d2clans:%GCb%uv0MGXA@ds251807.mlab.com:51807/heroku_9jgddrlc
function DbMilestone () {
    mongoose.connect('mongodb://localhost:8080/', { useMongoClient: true });
    mongoose.Promise = global.Promise;

    var MileStone = mongoose.model('MileStone', {});

    var milestone = new MileStone(importedTable);
    milestone.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved');
        }
    });
};

DbMilestone.prototype.get = function (hash) {

}

module.exports = DbMilestone;