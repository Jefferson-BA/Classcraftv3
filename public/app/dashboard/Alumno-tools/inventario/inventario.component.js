angular.module('app')
    .controller('InventarioController', function ($scope, StudentService, $window) {
        $scope.currentStudentId = JSON.parse($window.localStorage.getItem('currentUser')).id;
        $scope.mascotasTienda = [];
        $scope.misMascotas = [];

        $scope.cargarMascotasTienda = function () {
            StudentService.getMascotasTienda().then(function (resp) {
                $scope.mascotasTienda = resp.data;
            });
        };

        $scope.cargarMisMascotas = function () {
            $http.get('/api/shop/mis-mascotas/' + $scope.currentStudentId)
                .then(function (resp) {
                    $scope.misMascotas = resp.data;
                });
        };

        $scope.comprarMascota = function (mascotaId) {
            $http.post('/api/shop/comprar-mascota', { studentId: $scope.currentStudentId, mascotaId: mascotaId })
                .then(function (resp) {
                    alert('¡Mascota comprada!');
                    $scope.cargarMisMascotas();
                    $scope.cargarOro(); // Si tienes función para actualizar oro
                }, function (err) {
                    alert(err.data.error);
                });
        };

        // Inicializar
        $scope.cargarMascotasTienda();
        $scope.cargarMisMascotas();
    });