const mongoose = require('mongoose');
const coinSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    symbol : {
        type : String,
        required : true,
    },
    logo : {
        type : String,
        required : true,
    },
    created : {
        type : Date,
        required : true,
        default:Date.now,
    },

        
});

module.exports = mongoose.model("Coins",coinSchema);