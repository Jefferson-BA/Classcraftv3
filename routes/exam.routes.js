const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/exam.controller');

router.post('/', ExamController.createExam);
router.get('/student/:studentId', ExamController.getExamsForStudent);
router.get('/:examId/questions', ExamController.getExamWithQuestions);
router.get('/teacher/:teacherId', ExamController.getExamsForTeacher);
router.delete('/api/exams/:id', ExamController.deleteExam);
router.get('/api/exams/teacher/:teacherId', ExamController.getExamsForTeacher);
router.put('/api/exams/:id', ExamController.updateExam);
router.post('/api/exams', ExamController.createExam);

module.exports = router;