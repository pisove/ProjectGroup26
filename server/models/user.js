let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required'
    },
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'DisplayName is required'
    },
    // required:'TOTP secret is required'
    secret:
    {
        type:String,
        default:"",
        trim:true,
    },
    created:{
        type:Date,
        default: Date.now
    },
    update:{
        type:Date,
        default: Date.now
    }
},
{
    collection: "user"
}
)

// configure options for user model
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User',User);