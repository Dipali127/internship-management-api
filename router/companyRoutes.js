const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

//register company
router.post('/register', companyController.registerCompany)
//login company
router.post('/login', companyController.companyLogin)

module.exports = router;