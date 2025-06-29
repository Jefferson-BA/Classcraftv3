angular.module('app')
  .controller('ExamStudentViewController', function (ExamService, $routeParams, $window, $location) {
    const vm = this;
    vm.examId = $routeParams.examId;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.respuestas = [];
    vm.showModal = false;

    ExamService.getExamWithQuestions(vm.examId).then(function (resp) {
      vm.exam = resp.data.exam;
      vm.preguntas = resp.data.questions;
    });

    vm.finishExam = function () {
      ExamService.finishExam({
        student_id: vm.currentUser.id,
        exam_id: vm.examId,
        respuestas: vm.respuestas
      }).then(function () {
        alert('Examen enviado');
      });
    };

    vm.closeModal = function () {
      vm.showModal = false;
      $location.path('/dashboard/alumno/examenes');
    };
  });