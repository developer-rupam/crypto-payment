const MerchantModel = require('../models/MerchantModel');
const MerchantVerificationModel = require('../models/MerchantVerificationModel');
const MerchantVerificationController = require('./MerchantVerificationController');
const AccessTokenController = require('./AccessTokenController');
const { setErrorData } = require('../_helpers/Library');

/* Get all merchant details */
module.exports.getAllMerchants = async (req, res) => {
    MerchantModel.find().then((data) => {
        let obj = {
            error: setErrorData(0, ''),
            merchant: data
        };
        res.status(200).send(obj);
    }).catch((error) => {
        console.log('API error', error)
        res.send({ error: setErrorData(1, error.message), merchants: null })
    });


}


/* Get Merchant by id  */

module.exports.getSpecificMerchant = async (req, res) => {
    let token = req.headers.token;
     let isTokenValid = await AccessTokenController.isAccessTokenValid(req,()=>{})
    //console.log('isTokenValid',isTokenValid)
    if(isTokenValid){
        let statusObject = await MerchantVerificationController.getSpecificMerchantVerificationStatus(req, () => { });
        if (statusObject.length != '') {
            MerchantModel.findById(req.body.merchant_id).then((data) => {
                let merchant = {}
                //Setting status
                merchant['merchant_id'] = statusObject[0].merchant_id
                merchant['active'] = statusObject[0].active
                merchant['email_verification'] = statusObject[0].email_verification
    
                //setting personal details
                merchant['name'] = data.name;
                merchant['email'] = data.email;
                merchant['phone'] = data.phone;
                merchant['created'] = data.created;
                let obj = {
                    error: setErrorData(0, ''),
                    merchant: merchant
                };
                res.status(200).send(obj);
            }).catch((error) => {
                console.log('API error', error)
                res.send({ error: setErrorData(1, error.message), merchant: null })
            });
        } else {
            res.send({ error: setErrorData(1, 'Merchant Verification details not found'), merchants: null })
        }
    }else{
        res.status(401).send({ error: setErrorData(1, 'You are being a trespasser now, please login again'), merchants: null })
    }



}

/* Add Merchant */
module.exports.addMerchant = async (req, res) => {

    MerchantModel.create(req.body).then((data) => {

        /* Grabbing the just created merchant */
        let savedMerchantId = data._id;

        /* Setting merchant verification status */
        let payload = {
            merchant_id: savedMerchantId,
            active: false,
            email_verification: false,
        }
        MerchantVerificationModel.create(payload).then((data) => {
            let obj = {
                error: setErrorData(0, 'Merchant data saved successfully'),
                merchants: null,
            };

            res.status(200).send(obj);
        }).catch((error) => {
            res.send({ error: setErrorData(1, error.message), merchants: null })
        });



    }).catch((error) => {
        res.send({ error: setErrorData(1, error.message), merchants: null })
    });
}
/* Update Merchant */
module.exports.updateMerchant = async (req, res) => {
    const { id } = req.params;
    const { merchant } = req.body;

    MerchantModel.findByIdAndUpdate(id, { merchant }).then((data) => {
        let obj = {
            error: setErrorData(0, 'Merchant data saved successfully'),
            merchant: data
        };
        res.status(200).send(obj);
    }).catch((error) => {
        res.send({ error: setErrorData(1, error.message), merchants: null })
    });
}

/* Login as merchant */

module.exports.merchantLogin = async (req, res) => {
    let reponse = {};
    MerchantModel.find({ email: req.body.email, password: req.body.password }).then((data) => {
        console.log('Login Data',data)
        if (data.length != 0) {
            let merchantId = data[0]._id;

            //Deleting the access token first
            AccessTokenController.deleteAccessToken(merchantId).then(deleteData => {
                
                //setting up the access token 
                AccessTokenController.setAccessToken(merchantId).then(tokenData => {
                    res.send({ 
                        error: setErrorData(0, ''),
                        token:tokenData.access_token,
                        merchant_id : merchantId
                    })
                }).catch((error) => {
                    res.send({ error: setErrorData(1, error.message) })
                });
            }).catch((error) => {
                res.send({ error: setErrorData(1, error.message) })
            });
            
            
        } else {
            res.send({ error: setErrorData(1, 'Alas !! Failed to login, your credentials are incorrect'), merchants: null })
        }
    }).catch((error) => {
        res.send({ error: setErrorData(1, error.message), merchants: null })
    });

    /* let statusObject = await MerchantVerificationController.getSpecificMerchantVerificationStatus(req,() => {});
    if(statusObject.length!= ''){
        MerchantModel.findById(req.body.merchant_id).then((data) => {
            let merchant = {}
            //Setting status
            merchant['merchant_id'] = statusObject[0].merchant_id
            merchant['active'] = statusObject[0].active
            merchant['email_verification'] = statusObject[0].email_verification

            //setting personal details
            merchant['name'] = data.name;
            merchant['email'] = data.email;
            merchant['phone'] = data.phone;
            merchant['created'] = data.created;
        let obj = {
            error: setErrorData(0, ''),
            merchant: merchant
        };
        res.status(200).send(obj);
    }).catch((error) => {
        console.log('API error', error)
        res.send({ error: setErrorData(1, error.message), merchant: null })
    });
    }else{
        res.send({ error: setErrorData(1, 'Merchant Verification details not found'), merchants: null })
    } */



}


