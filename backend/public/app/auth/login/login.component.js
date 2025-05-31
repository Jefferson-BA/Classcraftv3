// MODIFICADO: Se añadió función goBack
angular.module('app')
  .controller('LoginController', function($location, AuthService) {
    const vm = this;

    vm.login = function() {
      AuthService.login(vm.email, vm.password)
        .then(() => {
          alert('Login exitoso');
          $location.path('/dashboard/teacher');
        })
        .catch(err => {
          alert('Credenciales inválidas');
          console.error(err);
        });
    };

    vm.goToRegister = function() {
      $location.path('/register/teacher');
    };

    // NUEVO: Función para regresar
    vm.goBack = function() {
      $location.path('/role-selection');
    };
  });