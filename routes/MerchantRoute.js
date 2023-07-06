const express = require("express");
const router = express.Router();

const { getAllMerchants,addMerchant } = require('../controllers/MerchantController');

router.get('/merchants/allMerchants', getAllMerchants);
router.get('/merchants/add', addMerchant);

module.exports = router;