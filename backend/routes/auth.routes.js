const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// rutas
router.post('/register/teacher', AuthController.registerTeacher);
router.post('/login/teacher', AuthController.loginTeacher);
router.get('/role/:role', AuthController.listUsersByRole); // ✅ corregido

module.exports = router;
