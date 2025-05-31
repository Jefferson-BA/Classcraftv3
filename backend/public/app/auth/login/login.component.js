angular.module('app')
  .controller('LoginController', function($location, AuthService) {
    const vm = this;

    vm.login = function() {
      AuthService.login(vm.email, vm.password)
        .then(() => {
          alert('Login exitoso');
          $location.path('/dashboard/teacher');
        })
        .catch(() => {
          alert('Credenciales inválidas');
        });
    };

    vm.goToRegister = function() {
      $location.path('/register/teacher');
    };

    vm.goBack = function() {
      $location.path('/role-selection');
    };
  });