const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

router.get('/employees', userController.getEmployees);
router.post('/addEmployee', userController.addEmployee);
router.put('/editEmployee', userController.updateEmployee);
router.delete('/deleteEmployee/:id', userController.deleteEmployee);
router.get('/clients/count', userController.getClientCount);

module.exports = router; 
