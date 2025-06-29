angular.module('app')
  .controller('ExamStudentListController', function(ExamService, $window) {
    const vm = this;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.examenes = [];

    ExamService.getExamsForStudent(vm.currentUser.id).then(function(resp) {
      vm.examenes = resp.data;
    });
  });