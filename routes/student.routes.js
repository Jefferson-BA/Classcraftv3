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
router.post('/:studentId/personaje', StudentController.crearPersonaje);
router.post('/:studentId/dar-oro', StudentController.darOro);
router.get('/:studentId', StudentController.getStudent);
router.post('/exam/start', StudentController.startExam);
router.post('/exam/finish', StudentController.finishExam);






module.exports = router;