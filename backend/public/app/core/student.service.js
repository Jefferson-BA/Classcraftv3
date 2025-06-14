angular.module('app')
  .factory('StudentService', function($http) {
    return {
      joinClass: function(alumno_id, codigo_union) {
        return $http.post('/api/students/join-class', { alumno_id, codigo_union });
      },
      getMyClasses: function(alumno_id) {
        return $http.get('/api/students/my-classes/' + alumno_id);
      }
    };
  });