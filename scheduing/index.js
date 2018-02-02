var sched = require('node-schedule');
var mongo = require('mongodb').MongoClient;
var url = "mongodb://dbo:123@localhost:27017/d2clans?authSource=admin";
var bungie = require('../bungienetapi');

var rule = new sched.RecurrenceRule();
rule.hour = 0; rule.minute = 0; rule.second = 0;

var updateDB = sched.scheduleJob(rule, function(){
    doSomthing();

    var args = {
        headers: {
            "Content-Type": "application/json",
            "X-API-Key" : ""
        },
        path: {
            "groupId": ""
        }
    };

    bungie.restClient.methods.GroupV2GetGroup(args, function(data, res){
        console.log(data.Response.detail);
    });
});

function doSomthing() {
    console.log("Ready!!!");
    mongo.connect(url,function(err, db){
        if (err) throw err;
        console.log("DB Connected!!!");

        db.

        db.close();
    });
};

module.exports.updateDB = updateDB;