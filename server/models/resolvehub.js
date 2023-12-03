let mongoose = require('mongoose');
//create resolvehub model
let resolvehubModel = mongoose.Schema
({
    issue: String,
    status: String,
    description: String,
    date: String,
    time: String,
},
{
    collection: "entries",
}
);

module.exports = mongoose.model('ResolveHub', resolvehubModel);
