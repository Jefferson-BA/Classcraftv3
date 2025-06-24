angular.module('app')
  .controller('LoginAlumnoController', function($location, AuthService, $window) {
    const vm = this;

    vm.login = function() {
      AuthService.loginStudent(vm.email, vm.password)
        .then(function(response) {
          if (response.data && response.data.user) {
            $window.localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            // Cambia esta línea:
            // $location.path('/alumno/classroom');
            // Por esta línea:
            $location.path('/dashboard/alumno');
          } else {
            alert('Respuesta inválida del servidor');
          }
        })
        .catch(function() {
          alert('Credenciales inválidas');
        });
    };

    vm.goToRegister = function() {
      $location.path('/register/alumno');
    };

    vm.goBack = function() {
      $location.path('/teacher/role-selection.component.html');
    };
  });