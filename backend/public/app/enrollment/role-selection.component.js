angular.module('app')
  .controller('RoleSelectionController', function($location) {
    this.selectRole = function(role) {
      if (role === 'teacher') {
        $location.path('/login/teacher');
      }
    };
  });
