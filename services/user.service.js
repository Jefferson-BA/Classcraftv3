angular.module('app.core', [])
  .factory('AuthService', function($http) {
    const API_URL = 'http://localhost:3000/api/auth';
    return {
      // Profesor
      register: function(data) {
        return $http.post(`${API_URL}/register/teacher`, data);
      },
      login: function(email, password) {
        return $http.post(`${API_URL}/login/teacher`, { email, password });
      },
      // Alumno
      registerStudent: function(data) {
        return $http.post(`${API_URL}/register/student`, data);
      },
      loginStudent: function(email, password) {
        return $http.post(`${API_URL}/login/student`, { email, password });
      }
    };
  });