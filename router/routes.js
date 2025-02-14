const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')
const companyController = require('../controllers/companyController');
const internshipController = require('../controllers/internshipController');
const applicationController = require('../controllers/applicationController');
const jwt = require('../middleware/auth')
const uploadFile = require('../middleware/multer.middleware')

<<<<<<< HEAD
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>student>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//register student
router.post('/register', studentController.registerStudent)
//login student
router.post('/loginStudent', studentController.studentLogin)
//update student details
router.put('/update/:studentID', jwt.authentication,studentController.editStudentdetails)
//get Internship
router.get('/getIntership', jwt.authentication,internshipController.getInternship)
//get internship by Id
router.get('/getInternshipById/:internshipId', jwt.authentication, internshipController.getInternshipById)
//apply to internship
router.post('/apply/:studentID',jwt.authentication,uploadFile,applicationController.applyInternship)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>company>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//register company
router.post('/registerCompany', companyController.registerCompany)
//login company
router.post('/loginCompany', companyController.companyLogin)
//company post internship
router.post('/postInternship/:companyId', jwt.authentication,internshipController.postInternship)
//update internship
router.put('/updateInternship/:internshipId', jwt.authentication, internshipController.updateInternship)
//get application review
=======
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Student Routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//Register student
router.post('/student/signup', studentController.registerStudent);
//Login student
router.post('/student/login', studentController.studentLogin);
//Edit/update student details
router.put('/update/:studentID', jwt.authentication,studentController.editStudentdetails)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Company Routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//Register company
router.post('/company/signup', companyController.registerCompany)
//Login company
router.post('/company/login', companyController.companyLogin);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Internship Routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//Company post an internship
router.post('/postInternship/:companyId', jwt.authentication,internshipController.postInternship);
//Company update an internship
router.put('/updateInternship/:internshipId', jwt.authentication, internshipController.updateInternship);
//Student gets all Internship
router.get('/internships/list', jwt.authentication,internshipController.getInternship);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Application Routes>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//Student apply for an internship
router.post('/apply/:studentID',jwt.authentication,uploadFile,applicationController.applyInternship)
//Company gets all applied student's application
>>>>>>> 0beca9970a14fe4d90756a5674ded7eb297b5185
router.get('/getAllAppliedStudents/:internshipId', jwt.authentication, applicationController.getAllAppliedStudents )


// route for incorrect endpoints.
router.all("/*",(req,res)=>{res.status(404).send({status:false,message:"Endpoint is not correct"})})

module.exports = router;



