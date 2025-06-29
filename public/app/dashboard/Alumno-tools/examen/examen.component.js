angular.module('app')
  .controller('ExamStudentViewController', function(ExamService, $routeParams, $window) {
    const vm = this;
    vm.examId = $routeParams.examId;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.respuestas = [];

    ExamService.getExamWithQuestions(vm.examId).then(function(resp) {
      vm.exam = resp.data.exam;
      vm.preguntas = resp.data.questions;
    });

    vm.finishExam = function() {
      ExamService.finishExam({
        student_id: vm.currentUser.id,
        exam_id: vm.examId,
        respuestas: vm.respuestas,
        nota: 0, // Calcula la nota real
        xp_obtenido: 0, // Calcula XP real
        hp_perdido: 0 // Calcula HP perdido
      }).then(function() {
        alert('Examen enviado');
      });
    };
  });