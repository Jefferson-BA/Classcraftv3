angular.module('app')
  .controller('LoginAlumnoController', function($location, AuthService) {
    const vm = this;

    vm.login = function() {
      AuthService.loginStudent(vm.email, vm.password)
        .then(function() {
          alert('Login exitoso');
          $location.path('/dashboard/alumno');
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