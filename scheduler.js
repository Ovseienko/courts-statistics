var schedule = require('node-schedule');
var app = require("./app");

function scheduler () {
    schedule.scheduleJob('54 * * * *', function () {
        app.start();
    })
}

scheduler();
