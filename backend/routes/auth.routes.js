const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post('/register/teacher', AuthController.registerTeacher);
router.post('/login/teacher', AuthController.loginTeacher); // <-- Este debe existir

module.exports = router;