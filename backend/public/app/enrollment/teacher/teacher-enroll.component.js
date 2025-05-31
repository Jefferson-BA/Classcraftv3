// NUEVO: Controlador para el dashboard del maestro
angular.module('app')
  .controller('TeacherDashboardController', function($location) {
    const vm = this;

    vm.logout = function() {
      // Aquí puedes agregar lógica para limpiar el token/sesión
      alert('Cerrando sesión...');
      $location.path('/');
    };
  });