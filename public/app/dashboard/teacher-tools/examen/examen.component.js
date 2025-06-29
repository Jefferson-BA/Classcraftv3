angular.module('app')
  .controller('ExamCreateController', function(ExamService, $location, $window) {
    const vm = this;
    vm.exam = { preguntas: [] };

    vm.addPregunta = function() {
      vm.exam.preguntas.push({ pregunta: '', imagen: '', puntaje: 0 });
    };

    vm.createExam = function() {
      // Obtener el profesor logueado
      const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
      vm.exam.teacher_id = currentUser.id; // Asigna el id automáticamente

      ExamService.createExam(vm.exam).then(function() {
        alert('Examen creado');
        $location.path('/dashboard/teacher');
      }).catch(function(err) {
        alert('Error al crear examen');
      });
    };
  });