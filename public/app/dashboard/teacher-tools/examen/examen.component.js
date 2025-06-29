angular.module('app')
  .controller('ExamCreateController', function(ExamService, $location, $window) {
    const vm = this;
    vm.exam = { preguntas: [] };
    vm.examenes = [];
    vm.showForm = true;
    vm.selectedExam = null;
    vm.examStudents = [];
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

    function loadExams() {
      ExamService.getExamsForTeacher(vm.currentUser.id).then(function(resp) {
        vm.examenes = resp.data;
      });
    }
    loadExams();

    vm.addPregunta = function() {
      vm.exam.preguntas.push({ pregunta: '', imagen: '', puntaje: 0 });
    };

    vm.createExam = function() {
      vm.exam.teacher_id = vm.currentUser.id;
      ExamService.createExam(vm.exam).then(function() {
        vm.exam = { preguntas: [] };
        vm.showForm = false;
        loadExams();
      });
    };

    vm.showCreateForm = function() {
      vm.showForm = true;
      vm.exam = { preguntas: [] };
      vm.selectedExam = null;
    };

    vm.viewExamDetails = function(exam) {
      vm.selectedExam = exam;
      vm.showForm = false;
      // Llama a tu servicio para obtener alumnos y su estado en el examen
      ExamService.getExamStudentsStatus(exam.id).then(function(resp) {
        vm.examStudents = resp.data;
      });
    };
  });