const mongoose = require('mongoose');
const accessTokenSchema = new mongoose.Schema({
    logged_in_user_id : {
        type : String,
        required : true,
        unique: true
    },
    access_token : {
        type:String,
        required : true,
    },
    expires_in : {
        type:Date,
        required : false,
        default:(new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)).valueOf(),
    },
    logged_in : {
        type : Date,
        required : false,
        default:new Date().valueOf(),
    },

        
});

module.exports = mongoose.model("access_token",accessTokenSchema);