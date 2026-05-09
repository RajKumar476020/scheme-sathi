const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/check-eligibility', apiController.checkEligibility);
router.get('/schemes', apiController.getSchemes);
router.get('/scheme/:id', apiController.getSchemeById);

module.exports = router;
