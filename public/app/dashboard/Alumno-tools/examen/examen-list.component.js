angular.module('app')
  .controller('ExamStudentListController', function(ExamService, $window, $location) {
    const vm = this;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.examenes = [];
    vm.selectedExamId = null;

    ExamService.getExamsForStudent(vm.currentUser.id).then(function(resp) {
      vm.examenes = resp.data;
    });

    vm.goToExam = function(examId) {
      vm.selectedExamId = examId;
      $location.path('/dashboard/alumno/examen/' + examId);
    };
  });