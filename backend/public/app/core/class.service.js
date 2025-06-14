angular.module('app')
  .factory('ClassService', function ($http) {
    return {
      createClass: function (data) {
        return $http.post('/api/classes/create', data);
      },
      getAllClasses: function () {
        return $http.get('/api/classes');
      },
      getClasesProfesor: function (profesorId) {
        return $http.get('/api/classes/mis-clases', { params: { profesor_id: profesorId } });
      },
      eliminarClase: function (claseId) {
        return $http.delete('/api/classes/' + claseId);
      },
      getEstudiantesDeClase: function (claseId) {
        return $http.get('/api/classes/' + claseId + '/alumnos');
      },
      eliminarAlumnoDeClase: function (claseId, alumnoId) {
        return $http.delete('/api/classes/' + claseId + '/alumnos/' + alumnoId);
      },
      editarClase: function (claseId, data) {
        return $http.put('/api/classes/' + claseId, data);
      }
    };
  });