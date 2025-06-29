angular.module('app')
  .controller('ExamCreateController', function(ExamService, $location) {
    const vm = this;
    vm.exam = { preguntas: [] };

    vm.addPregunta = function() {
      vm.exam.preguntas.push({ pregunta: '', imagen: '', puntaje: 0 });
    };

    vm.createExam = function() {
      ExamService.createExam(vm.exam).then(function() {
        alert('Examen creado');
        $location.path('/dashboard/teacher');
      });
    };
  });