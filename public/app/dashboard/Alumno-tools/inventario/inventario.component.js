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
            StudentService.getMisMascotas($scope.currentStudentId).then(function (resp) {
                $scope.misMascotas = resp.data;
            });
        };

        $scope.comprarMascota = function (mascotaId) {
            StudentService.comprarMascota($scope.currentStudentId, mascotaId)
                .then(function () {
                    alert('¡Mascota comprada!');
                    $scope.cargarMisMascotas();
                    $scope.cargarOro(); // Si tienes esta función para mostrar el oro actualizado
                }, function (err) {
                    alert(err.data.error);
                });
        };

        // Inicializar
        $scope.cargarMascotasTienda();
        $scope.cargarMisMascotas();
    });