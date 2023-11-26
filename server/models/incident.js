let mongoose = require('mongoose');
//create store model
let storeModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: String,
    price: String,
},
{
    collection: "catalogue",
}
);
module.exports = mongoose.model('Incident', storeModel);
