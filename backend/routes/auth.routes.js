const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Ruta para registrar un maestro
router.post('/register/teacher', AuthController.registerTeacher);

module.exports = router;