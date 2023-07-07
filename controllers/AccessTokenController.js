const AccessTokenModel = require('../models/AccessTokenModel');
const { setErrorData } = require('../_helpers/Library');





/* Get Access token on based of an Id  */

module.exports.getAccessToken = async (merchant_id) => {
    let status = AccessTokenModel.find({ logged_in_user_id: merchant_id })
    return status

}

/* Delete Access token on based of an Id  */

module.exports.deleteAccessToken = async (merchant_id) => {
    let status = AccessTokenModel.deleteOne({ logged_in_user_id: merchant_id });
    return status;
}

/* Set Access token on based of an Id  */

module.exports.setAccessToken = async (merchant_id) => {

    let token = btoa(merchant_id + new Date().valueOf());
    let payload = { logged_in_user_id: merchant_id, access_token: token }
    let status = AccessTokenModel.create(payload);
    return status

}

/* Method defination for checking if access token is valid or not */
module.exports.isAccessTokenValid = async (req,res) => {

   let storedAccessToken =  await exports.getAccessToken(req.body.merchant_id);
   console.log('storedAccessToken',storedAccessToken)

    let isAuthorized = false;
    let loggedIn = new Date(storedAccessToken[0].logged_in).valueOf();
    let expiresIn = new Date(storedAccessToken[0].expires_in).valueOf();
    let currentTime = new Date().valueOf();
    let dateDiff = expiresIn - loggedIn
    //console.log(dateDiff,currentTime - expiresIn)
    //console.log(currentTime,loggedIn,expiresIn);
    if (req.body.merchant_id != storedAccessToken[0].logged_in_user_id) {
        isAuthorized = false
    } else if (storedAccessToken[0].access_token != req.headers.token) {
        isAuthorized = false
    } else if (dateDiff <= 0){
        isAuthorized = false
    } else if ((expiresIn - currentTime) <=0){
        isAuthorized = false
    }else{
        isAuthorized = true
    }
    return isAuthorized;
}


