let mongoose = require('mongoose');
//create store model
let incidentModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: String,
    price: String,
},
{
    collection: "entries",
}
);
module.exports = mongoose.model('Incident', incidentModel);
