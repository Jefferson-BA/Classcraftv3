angular.module('app')
  .factory('ExamService', function($http) {
    return {
      createExam: function(data) {
        return $http.post('/api/exams', data);
      },
      getExamsForTeacher: function(teacherId) {
        return $http.get('/api/exams/teacher/' + teacherId);
      },
      getExamsForStudent: function(studentId) {
        return $http.get('/api/exams/student/' + studentId);
      },
      getExamWithQuestions: function(examId) {
        return $http.get('/api/exams/' + examId + '/questions');
      },
      finishExam: function(data) {
        return $http.post('/api/exams/finish', data);
      }
    };
  });