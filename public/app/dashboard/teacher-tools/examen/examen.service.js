angular.module('app')
  .factory('ExamService', function($http) {
    return {
      createExam: function(data) {
        return $http.post('/api/exams', data);
      },
      getExamsForStudent: function(studentId) {
        return $http.get('/api/exams/student/' + studentId);
      },
      getExamWithQuestions: function(examId) {
        return $http.get('/api/exams/' + examId);
      }
    };
  });