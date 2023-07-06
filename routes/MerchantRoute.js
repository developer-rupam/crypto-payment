const express = require("express");
const router = express.Router();

const MerchantController = require('../controllers/MerchantController');

router.get('/merchants/allMerchants', MerchantController.getAllMerchants);
router.post('/merchants/add', MerchantController.addMerchant);
router.post('/merchants/merchantDetails', MerchantController.getSpecificMerchant);

module.exports = router;