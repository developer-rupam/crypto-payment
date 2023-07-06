const MerchantModel = require('../models/MerchantModel');
const { setErrorData } = require('../_helpers/Library'); 

/* Get all merchant details */
module.exports.getAllMerchants = async (req,res) => {
    MerchantModel.find().then((data) => {
        let obj = {
            error : setErrorData(0,''),
            merchant : data
        };
        res.status(200).send(obj);
    }).catch((error) => {
        console.log('API error',error)
        res.send({error : setErrorData(1,error),merchants:null})
    }); 
    
    
}

/* Get all merchant details */
module.exports.addMerchant = async (req,res) => {
    const {merchant} = req.body

    MerchantModel.create({merchant}).then((data) => {
        console.log('Merchant data saved successfully');
        let obj = {
            error : setErrorData(0,''),
            merchant : data
        };
        res.status(200).send(obj);
    }).catch((error) => {
        res.send({error : setErrorData(1,error),merchants:null})
    }); 
}