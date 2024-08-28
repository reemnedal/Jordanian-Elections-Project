const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userauthController'); // Ensure this path is correct
router.post('/login',userAuthController.authenticateUser);

module.exports = router;
