const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller');

router.post('/', ExamController.createExam);
router.get('/student/:studentId', ExamController.getExamsForStudent);
router.get('/:examId', ExamController.getExamWithQuestions);

module.exports = router;