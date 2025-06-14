angular.module('app')
  .component('roleSelectionComponent', {
    templateUrl: 'app/enrollment/role-selection.component.html',
    controller: function ($location) {
      const vm = this;

      vm.selectRole = function (role) {
        if (role === 'teacher') {
          $location.path('/auth/register');
        } else if (role === 'student') {
          $location.path('/register/alumno');
        }
      };

      vm.goBack = function () {
        $location.path('/');
      };

      vm.goToLogin = function () {
        $location.path('/login/teacher');
      };
    },
    controllerAs: 'vm'
  });