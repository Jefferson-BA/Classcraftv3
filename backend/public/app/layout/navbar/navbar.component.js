angular.module('app')
  .component('navbarComponent', {
    templateUrl: 'app/layout/navbar/navbar.template.html',
    controller: function($location) {
      const vm = this;

      // Navegar a selección de rol
      vm.goToRoleSelection = function() {
        $location.path('/teacher/role-selection.component.html');
      };

      // Navegar a login
      vm.goToLogin = function() {
        $location.path('/login');
      };

      // Navegar a home
      vm.goToHome = function() {
        $location.path('/');
      };
    },
    controllerAs: 'vm'
  });