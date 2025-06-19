angular.module('app')
  .controller('LoginController', function ($location, AuthService, $window) {
    const vm = this;

    vm.login = function () {
      AuthService.login(vm.email, vm.password)
        .then((response) => {
          if (response.data && response.data.user) {
            $window.localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            // Redirige según el rol
            if (response.data.user.role === 'teacher') {
              $location.path('/dashboard/teacher');
            } else if (response.data.user.role === 'student') {
              $location.path('/alumno/classroom');
            } else {
              alert('Rol no reconocido');
            }
          } else {
            alert('Respuesta inválida del servidor');
          }
        })
        .catch(() => {
          alert('Credenciales inválidas');
        });
    };

    vm.goToRegister = function () {
      $location.path('/register/teacher');
    };

    vm.goBack = function () {
      $location.path('/role-selection');
    };
  });