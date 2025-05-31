angular.module('app')
  .controller('RegisterController', function($location, AuthService) {
    const vm = this;

    vm.register = function() {
      if (vm.password !== vm.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const userData = {
        username: vm.username,
        email: vm.email,
        password: vm.password
        // NO se envía el campo role, el backend lo pone por defecto
      };

      AuthService.register(userData)
        .then(function() {
          alert('Registro exitoso');
          $location.path('/login/teacher');
        })
        .catch(function(err) {
          alert('Error en el registro');
          console.error(err);
        });
    };

    vm.goToLogin = function() {
      $location.path('/login/teacher');
    };

    vm.goBack = function() {
      $location.path('/teacher/role-selection.component.html');
    };
  });