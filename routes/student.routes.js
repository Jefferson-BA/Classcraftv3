// NUEVO: Rutas básicas para gestión de estudiantes
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');

// Rutas básicas para estudiantes
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudentById);
router.post('/', StudentController.createStudent);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);
router.post('/join-class', StudentController.joinClass);
router.get('/my-classes/:alumno_id', StudentController.getMyClasses);




module.exports = router;