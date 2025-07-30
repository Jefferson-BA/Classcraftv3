angular.module('app')
    .factory('ExamService', function ($http) {
        return {
            createExam: function (data) {
                return $http.post('/api/exams', data);
            },
            getExamsForTeacher: function (teacherId) {
                return $http.get('/api/exams/teacher/' + teacherId);
            },
            getExamsForStudent: function (studentId) {
                return $http.get('/api/exams/student/' + studentId);
            },
            getExamWithQuestions: function (examId) {
                return $http.get('/api/exams/' + examId + '/questions');
            },
            finishExam: function (data) {
                return $http.post('/api/exams/finish', data);
            },
            getExamStudentsStatus: function (examId) {
                return $http.get('/api/exams/' + examId + '/students-status');
            },
            deleteExam: function (examId) {
                return $http.delete('/api/exams/' + examId);
            },
            updateExam: function (exam) {
                return $http.put('/api/exams/' + exam.examen_id, exam);
            },
            cambiarEstadoExamen: function (examId, nuevoEstado) {
                return $http.patch('/api/exams/' + examId + '/estado', { estado: nuevoEstado });
            }
        };
    });