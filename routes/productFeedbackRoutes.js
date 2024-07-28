const express = require('express');
const router = express.Router();
const productFeedbackController = require('../controllers/productFeedbackController');


router.post('/', productFeedbackController.createProductFeedback);
router.get('/', productFeedbackController.getAllProductsFeedback);


module.exports = router;