angular.module('app.core', [])
  .factory('AuthService', function($http) {
    const API_URL = 'http://localhost:3000/api/auth';
    return {
      register: function(data) {
        return $http.post(`${API_URL}/register/teacher`, data);
      }
      // ...otros métodos si los tienes...
    };
  });