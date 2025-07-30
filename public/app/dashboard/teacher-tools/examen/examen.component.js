angular.module('app')
  .controller('ExamCreateController', function (ExamService, $location, $window) {
    const vm = this;
    vm.exam = { preguntas: [] };
    vm.examenes = [];
    vm.showForm = false;
    vm.selectedExam = null;
    vm.editMode = false;
    vm.examStudents = [];
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

    function loadExams() {
      return ExamService.getExamsForTeacher(vm.currentUser.id).then(function (resp) {
        vm.examenes = resp.data;
        vm.showForm = vm.examenes.length === 0;
      });
    }
    loadExams();

    vm.showCreateForm = function () {
      vm.showForm = true;
      vm.editMode = false;
      vm.exam = { preguntas: [] };
      vm.selectedExam = null;
    };

    vm.createExam = function () {
      vm.exam.teacher_id = vm.currentUser.id;
      ExamService.createExam(vm.exam).then(function () {
        vm.exam = { preguntas: [] };
        vm.showForm = false;
        loadExams();
      });
    };

    vm.editExam = function (exam) {
      vm.exam = angular.copy(exam);
      vm.showForm = true;
      vm.editMode = true;
      vm.selectedExam = null;
    };

    vm.updateExam = function () {
      console.log('Actualizando:', vm.exam); // <-- Para depurar
      ExamService.updateExam(vm.exam).then(function () {
        vm.exam = { preguntas: [] };
        vm.showForm = false;
        vm.editMode = false;
        loadExams().then(function () {
          vm.viewExamDetails({ examen_id: vm.exam.examen_id });
        });
      });
    };

    vm.viewExamDetails = function (exam) {
      // Busca el examen actualizado por examen_id
      const actualizado = vm.examenes.find(e => e.examen_id === exam.examen_id);
      vm.selectedExam = actualizado || exam;
      vm.showForm = false;
      vm.editMode = false;
    };

    vm.toggleBlockExam = function (exam) {
      const nuevoEstado = exam.estado === 'bloqueado' ? 'activo' : 'bloqueado';
      ExamService.cambiarEstadoExamen(exam.examen_id, nuevoEstado).then(function () {
        exam.estado = nuevoEstado;
        Swal.fire('Listo', `El examen fue ${nuevoEstado === 'bloqueado' ? 'bloqueado' : 'activado'}.`, 'success');
      });
    };

    vm.cancelForm = function () {
      vm.showForm = false;
      vm.editMode = false;
      vm.exam = { preguntas: [] };
    };
    vm.deleteExam = function (exam) {
      ExamService.deleteExam(exam.examen_id).then(function () {
        loadExams().then(function () {
          vm.selectedExam = null; // Limpia la previsualización si el examen eliminado estaba seleccionado
        });
      });
    };
  });