angular.module('app')
  .controller('ExamCreateController', function(ExamService, $location, $window) {
    const vm = this;
    vm.exam = { preguntas: [] };
    vm.examenes = [];
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

    ExamService.getExamsForTeacher(vm.currentUser.id).then(function(resp) {
      vm.examenes = resp.data;
    });

    vm.addPregunta = function() {
      vm.exam.preguntas.push({ pregunta: '', imagen: '', puntaje: 0 });
    };

    vm.createExam = function() {
      ExamService.createExam(vm.exam).then(function() {
        ExamService.getExamsForTeacher(vm.currentUser.id).then(function(resp) {
          vm.examenes = resp.data;
        });
        vm.exam = { preguntas: [] };
      });
    };
  });