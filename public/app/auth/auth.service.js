angular.module('app')
  .service('AuthService', function($http) {
    this.registerStudent = function(userData) {
      return $http.post('/api/auth/register-student', userData);
    };
    // ...otros métodos...
  });