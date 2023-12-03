let mongoose = require('mongoose');
//create authentaction model
let authentactionModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: Number,
    price: Number,
},
{
    collection: "authentaction",
}
);

module.exports = mongoose.model('authentaction', authentactionModel);
