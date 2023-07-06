const mongoose = require('mongoose');
const merchantVerificationSchema = new mongoose.Schema({
    merchant_id : {
        type : String,
        required : true,
    },
    active : {
        type:Boolean,
        default : false,
    },
    email_verification : {
        type:Boolean,
        default : false,
    },
    created : {
        type : Date,
        required : true,
        default:Date.now,
    },

        
});

module.exports = mongoose.model("merchant_verification",merchantVerificationSchema);