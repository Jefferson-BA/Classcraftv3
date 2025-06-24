angular.module('app')
  .controller('AlumnoController', function ($location, $rootScope, $window) {
    const vm = this;

    // Mensaje de bienvenida (puedes personalizarlo o quitarlo)
    vm.message = "Bienvenido al panel del alumno";

    // Método para navegar a la sección de clases del alumno
    vm.goToClassroom = function () {
      $location.path('/alumno/classroom');
    };

    // Puedes agregar aquí lógica para cerrar sesión, cargar datos del alumno, etc.
    // Por ejemplo:
    // vm.logout = function() {
    //   // Limpiar sesión y redirigir
    //   $location.path('/login/alumno');
    // };

    // Si quieres controlar la ruta activa en el sidebar:
    vm.isActive = function (route) {
      return $location.path() === route;
    };

    // Si necesitas el usuario logueado:
    // vm.currentUser = $rootScope.currentUser;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.showCharacterCreation = !vm.currentUser.personaje_creado;

    vm.onCharacterCreated = function() {
      vm.showCharacterCreation = false;
      vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    };
  });