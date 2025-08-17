const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')
const jwt = require('../middleware/auth')

//register student
router.post('/register', studentController.registerStudent)
//login student
router.post('/login', studentController.studentLogin)
//update student details
router.put('/update/:studentID', jwt.authentication,studentController.editStudentdetails)

module.exports = router;