angular.module('app')
  .controller('AlumnoController', function ($location, $rootScope, $window, StudentService) {
    const vm = this;
    vm.$location = $location;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser')) || {};


    // Mensaje de bienvenida (puedes personalizarlo o quitarlo)
    vm.message = "Bienvenido al panel del alumno";

    // Método para navegar a la sección de clases del alumno
    vm.goToClassroom = function () {
      $location.path('/alumno/classroom');
    };
    vm.isActive = function (route) {
      return $location.path() === route;
    };


    // Si necesitas el usuario logueado:

    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.showCharacterCreation = !vm.currentUser.personaje_creado;

    vm.onCharacterCreated = function () {
      vm.showCharacterCreation = false;
      vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    };
    vm.loadStudent = function () {
      if (!vm.currentUser.id) return;
      StudentService.getStudentById(vm.currentUser.id).then(function (resp) {
        vm.student = resp.data;
      });
    };
    vm.loadStudent();

    vm.goToExamList = function () {
      vm.$location.path('/dashboard/alumno/examenes');
    };


  });