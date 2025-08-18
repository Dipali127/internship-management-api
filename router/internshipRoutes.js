const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const jwt = require('../middleware/auth')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>company>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//company post internship
router.post('/postInternship/:companyId', jwt.authentication,internshipController.postInternship)
//update internship
router.put('/updateInternship/:internshipId', jwt.authentication, internshipController.updateInternship)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>student>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//get Internship
router.get('/getIntership', jwt.authentication,internshipController.getInternship)
//get internship by Id
router.get('/getInternshipById/:internshipId', jwt.authentication, internshipController.getInternshipById)


module.exports = router;