angular.module('app')
  .controller('LoginController', function($location, AuthService) {
    const vm = this;

    vm.login = function() {
      AuthService.login(vm.email, vm.password)
        .then(() => $location.path('/dashboard/teacher'))
        .catch(err => alert('Credenciales inválidas'));
    };

    vm.goToRegister = function() {
      $location.path('/register/teacher');
    };
  });
