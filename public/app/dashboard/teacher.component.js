angular.module('app')
  .controller('TeacherController', function ($location) {
    const vm = this;
    vm.$location = $location;

    vm.message = "Bienvenido al panel del maestro";

    vm.goToClassroom = function () {
      $location.path('/classroom');
    };
    vm.goToDashboard = function () {
      $location.path('/dashboard/teacher');
    };
    vm.goToRandomEvents = function () {
      $location.path('/random-events');
    };
    vm.goToExamCreate = function () {
      vm.$location.path('/dashboard/teacher/examen/create');
    };
  });