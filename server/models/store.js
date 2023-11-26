let mongoose = require('mongoose');
//create store model
let storeModel = mongoose.Schema
({
    issue: String,
    status: String,
    description: String,
    date: Number,
    time: Number,
},
{
    collection: "catalogue",
}
);

module.exports = mongoose.model('Store', storeModel);
