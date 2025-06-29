const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller'); // <-- AGREGA ESTA LÍNEA

router.post('/register/teacher', AuthController.registerTeacher);
router.post('/login/teacher', AuthController.loginTeacher);
router.post('/register/student', AuthController.registerStudent);
router.post('/login/student', AuthController.loginStudent);
router.post('/register', UserController.registerUser);

module.exports = router;