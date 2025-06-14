angular.module('app')
  .controller('StudentClassesController', function(StudentService, $window) {
    const vm = this;

    // Obtener alumno desde localStorage
    const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.alumnoId = currentUser ? currentUser.id : null;

    // VARIABLES
    vm.codigoUnion = '';
    vm.myClasses = [];

    // Cargar clases del alumno
    vm.loadMyClasses = function() {
      if (!vm.alumnoId) return;
      StudentService.getMyClasses(vm.alumnoId)
        .then(function(response) {
          vm.myClasses = response.data;
        });
    };

    // Unirse a clase
    vm.joinClass = function() {
      if (!vm.codigoUnion || !vm.alumnoId) return;

      StudentService.joinClass(vm.alumnoId, vm.codigoUnion)
        .then(function(response) {
          if (window.Swal) {
            Swal.fire('¡Listo!', response.data.message, 'success');
          } else {
            $window.alert(response.data.message);
          }
          vm.codigoUnion = '';
          vm.loadMyClasses();
        })
        .catch(function(error) {
          const msg = error.data && error.data.message
            ? error.data.message
            : 'Error al unirse a la clase';
          if (window.Swal) {
            Swal.fire('Error', msg, 'error');
          } else {
            $window.alert(msg);
          }
        });
    };

    // Llamada inicial
    vm.loadMyClasses();
  });
