const MerchantVerificationModel = require('../models/MerchantVerificationModel');
const { setErrorData } = require('../_helpers/Library');



/* Get Merchant by id  */

module.exports.getSpecificMerchantVerificationStatus = async (req, res) => {
    let verification = {}
    let status = await MerchantVerificationModel.find({ merchant_id: req.body.merchant_id })
    return status;

}




