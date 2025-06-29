const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller');

router.post('/', ExamController.createExam);
router.get('/student/:studentId', ExamController.getExamsForStudent);
router.get('/:examId/questions', ExamController.getExamWithQuestions);
router.get('/teacher/:teacherId', ExamController.getExamsForTeacher);

module.exports = router;