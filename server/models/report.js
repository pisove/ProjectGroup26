let mongoose = require('mongoose');
//create store model
let storeModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: Number,
    price: Number,
},
{
    collection: "catalogue",
}
);

module.exports = mongoose.model('Store', storeModel);
