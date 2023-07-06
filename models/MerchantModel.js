const mongoose = require('mongoose');
const merchantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    phone : {
        type : String,
        required : true,
        unique: true
    },
    logo : {
        type : String,
        required : false,
    },
    password : {
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