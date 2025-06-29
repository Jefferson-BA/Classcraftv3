const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacher.controller');

router.post('/', TeacherController.createTeacher);

module.exports = router;