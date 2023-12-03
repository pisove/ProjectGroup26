let mongoose = require('mongoose');

let incidentsModel = mongoose.Schema({
    name: String,
    userName: String,
    description: String,
    email: String,
    number: Number
    },
    {
        collection: "incidents"
    }
);
module.exports = mongoose.model('incidents', incidentsModel);