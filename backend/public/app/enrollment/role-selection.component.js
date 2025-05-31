angular.module('app')
  .component('roleSelectionComponent', {
    templateUrl: 'app/enrollment/role-selection.component.html',
    controller: function($location) {
      const vm = this;
      vm.selectRole = function(role) {
        if (role === 'teacher') $location.path('/auth/register');
        // Agrega lógica para otros roles si lo necesitas
      };
    },
    controllerAs: 'vm'
  });