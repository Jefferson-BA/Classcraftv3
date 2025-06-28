angular.module('app')
  .controller('RandomEventsController', function(ClassService, StudentService, $window) {
    const vm = this;
    vm.classList = [];
    vm.selectedClass = null;
    vm.alumnosClase = [];
    vm.alumnoSeleccionado = null;
    vm.mostrarModalOro = false;
    vm.cantidadOro = 1;

    // Cargar clases del profesor
    const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === 'teacher') {
      ClassService.getClasesProfesor(currentUser.id).then(function(response) {
        vm.classList = response.data;
      });
    }

    // Cargar alumnos de la clase seleccionada
    vm.cargarAlumnos = function() {
      vm.alumnoSeleccionado = null;
      if (vm.selectedClass) {
        ClassService.getEstudiantesDeClase(vm.selectedClass.id).then(function(response) {
          vm.alumnosClase = response.data;
        });
      }
    };

    // Girar ruleta (selección aleatoria)
    vm.girarRuleta = function() {
      if (vm.alumnosClase.length > 0) {
        const idx = Math.floor(Math.random() * vm.alumnosClase.length);
        vm.alumnoSeleccionado = vm.alumnosClase[idx];
      }
    };

    // Dar puntaje (+ o -)
    vm.darPuntaje = function(tipo) {
      // Aquí puedes llamar a tu servicio para sumar/restar puntaje
      alert('Puntaje ' + (tipo === 'mas' ? 'positivo' : 'negativo') + ' para ' + vm.alumnoSeleccionado.username);
      vm.alumnoSeleccionado = null;
    };

    // Dar oro
    vm.darOro = function() {
      vm.cantidadOro = 1;
      vm.mostrarModalOro = true;
    };

    vm.reloadStudent = function() {
      StudentService.getStudentById(vm.currentUser.id).then(function(resp) {
        Object.assign(vm.currentUser, resp.data);
        $window.localStorage.setItem('currentUser', JSON.stringify(vm.currentUser));
      });
    };

    vm.confirmarDarOro = function() {
      StudentService.darOro(vm.alumnoSeleccionado.id, vm.cantidadOro)
        .then(function(response) {
          alert('Se dio ' + vm.cantidadOro + ' de oro a ' + vm.alumnoSeleccionado.username);
          vm.mostrarModalOro = false;
          vm.alumnoSeleccionado = null;
        });
    };
  });