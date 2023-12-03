let mongoose = require('mongoose');
//create resolvehub model
let resolvehubModel = mongoose.Schema
({
    name: String,
    catagory: String,
    description: String,
    stock: Number,
    price: Number,
},
{
    collection: "entries",
}
);

module.exports = mongoose.model('ResolveHub', resolvehubModel);
