angular.module('app')
  .controller('RegisterAlumnoController', function ($location, AuthService) {
    const vm = this;

    vm.register = function () {
      if (vm.password !== vm.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const userData = {
        username: vm.username,
        email: vm.email,
        password: vm.password
      };
      AuthService.registerStudent(userData)
        .then(function () {
          alert('Alumno registrado exitosamente');
          $location.path('/login/alumno');
        })
        .catch(function (err) {
          alert('Error en el registro');
          console.error(err);
        });
    };

    vm.goToLogin = function () {
      $location.path('/login/alumno');
    };

    vm.goBack = function () {
      $location.path('/teacher/role-selection.component.html');
    };
  });