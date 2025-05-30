angular.module('app.core', [])
  .factory('AuthService', function($http) {
    const API_URL = 'http://localhost:3000/api/auth';

    return {
      login: function(email, password) {
        return $http.post(`${API_URL}/login/teacher`, { email, password });
      },
      register: function(data) {
        return $http.post(`${API_URL}/register/teacher`, data);
      },
      getUsersByRole: function(role) {
        return $http.get(`${API_URL}/${role}`);
      }
    };
  });
