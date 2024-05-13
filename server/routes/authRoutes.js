const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verifyEmail/:emailToken', authController.verifyEmail);

module.exports = router;