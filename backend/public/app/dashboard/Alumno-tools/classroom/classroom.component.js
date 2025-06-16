angular.module('app')
  .controller('StudentClassesController', function(StudentService, $window) {
    const vm = this;
    const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.alumnoId = currentUser ? currentUser.id : null;

    vm.codigoUnion = '';
    vm.myClasses = [];

    vm.loadMyClasses = function() {
      if (!vm.alumnoId) return;
      StudentService.getMyClasses(vm.alumnoId)
        .then(function(response) {
          vm.myClasses = response.data;
        });
    };

    vm.joinClass = function() {
      if (!vm.codigoUnion || !vm.alumnoId) return;
      StudentService.joinClass(vm.alumnoId, vm.codigoUnion)
        .then(function(response) {
          Swal.fire('¡Listo!', response.data.message, 'success');
          vm.codigoUnion = '';
          vm.loadMyClasses();
        })
        .catch(function(error) {
          const msg = error.data && error.data.message
            ? error.data.message
            : 'Error al unirse a la clase';
          Swal.fire('Error', msg, 'error');
        });
    };

    vm.loadMyClasses();
  });