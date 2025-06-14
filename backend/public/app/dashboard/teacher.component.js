angular.module('app')
  .controller('TeacherController', function ($location) {
    const vm = this;
    vm.message = "Bienvenido al panel del maestro";

    vm.goToClassroom = function () {
      $location.path('/classroom');
    };
    vm.goToDashboard = function () {
      $location.path('/dashboard/teacher');
    };
    vm.$location = $location;
  });