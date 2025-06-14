angular.module('app')
  .controller('LoginController', function($location, AuthService, $window) {
    const vm = this;

    vm.login = function() {
      AuthService.login(vm.email, vm.password)
        .then((response) => {
          // Guarda el usuario en localStorage
          if (response.data && response.data.user) {
            $window.localStorage.setItem('currentUser', JSON.stringify(response.data.user));
          }
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
