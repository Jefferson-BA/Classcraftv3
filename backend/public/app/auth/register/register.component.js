angular.module('app')
  .controller('RegisterController', function($location, AuthService) {
    const vm = this;

    vm.register = function() {
      const userData = {
        username: vm.username,
        email: vm.email,
        password: vm.password
      };

      AuthService.register(userData)
        .then(() => {
          alert('Registro exitoso');
          $location.path('/login/teacher');
        })
        .catch(err => {
          alert('Error en el registro');
          console.error(err);
        });
    };

    vm.goToLogin = function() {
      $location.path('/login/teacher');
    };
  });
