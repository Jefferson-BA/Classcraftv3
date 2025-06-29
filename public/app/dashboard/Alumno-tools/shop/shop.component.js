angular.module('app')
  .controller('ShopController', function($scope, $http, $window) {
    $scope.currentStudentId = JSON.parse($window.localStorage.getItem('currentUser')).id;
    $scope.mascotasTienda = [];

    $scope.cargarMascotasTienda = function() {
      $http.get('/api/shop/mascotas').then(function(resp) {
        $scope.mascotasTienda = resp.data;
      });
    };

    $scope.comprarMascota = function(mascotaId) {
      $http.post('/api/shop/comprar-mascota', { studentId: $scope.currentStudentId, mascotaId: mascotaId })
        .then(function() {
          alert('¡Mascota comprada!');
        }, function(err) {
          alert(err.data.error);
        });
    };

    // Inicializar
    $scope.cargarMascotasTienda();
  });