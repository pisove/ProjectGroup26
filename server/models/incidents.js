let mongoose = require('mongoose');

let incidentsModel = mongoose.Schema({
    issue: String,
    status: String,
    description: String,
    date: String,
    time: String
    },
    {
        collection: "incidents"
    }
);
module.exports = mongoose.model('incidents', incidentsModel);