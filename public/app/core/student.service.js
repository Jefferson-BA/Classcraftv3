angular.module('app')
  .factory('StudentService', function ($http) {
    return {
      joinClass: function (alumno_id, codigo_union) {
        return $http.post('/api/students/join-class', { alumno_id, codigo_union });
      },
      getMyClasses: function (alumno_id) {
        return $http.get('/api/students/my-classes/' + alumno_id);
      },
      darOro: function (studentId, cantidad) {
        return $http.post('/api/students/' + studentId + '/dar-oro', { cantidad });
      },
      getStudentById: function (studentId) {
        return $http.get('/api/students/' + studentId);
      },
      getMascotasTienda: function () {
        return $http.get('/api/shop/mascotas');
      },
      comprarMascota : function (studentId, mascotaId) {
        return $http.post('/api/shop/comprar-mascota', { studentId, mascotaId });
      },
      getMisMascotas : function (studentId) {
        return $http.get('/api/shop/mis-mascotas/' + studentId);
      }
      // ..agrega aquí otros métodos si los necesitas...
    };
  });