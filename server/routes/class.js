const classController = require('../controllers/classController');

const router = require('express').Router();

//METHOD : GET

/*
*admin
GET /classes/
get all classes 
*/
router.get('/', classController.getClasses);

/* 
*admin
GET /classes/{classId}
get specific class 
*/
router.get('/:classId', classController.getClass);

/* 
*teacher
GET /classes/{classId}/students
get all students from the current class 
*/
router.get('/:classId/students', classController.getAllStudent);

/* 
*teacher
GET /classes/{classId}/student/{studentId}
get specific students from the current class 
*/
router.get('/:classId/student/:studentId', classController.findStudentInClass);

//METHOD : POST

module.exports = router;
