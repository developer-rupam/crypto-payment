const mongoose = require('mongoose');
const merchantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    profile_pic : {
        type : String,
        required : true,
    },
    created : {
        type : Date,
        required : true,
        default:Date.now,
    },

        
});

module.exports = mongoose.model("merchants",merchantSchema);