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
      ExamService.getExamsForTeacher(vm.currentUser.id).then(function (resp) {
        vm.examenes = resp.data;
        vm.showForm = vm.examenes.length === 0;
      });
    }
    loadExams();
    ExamService.getExamsForTeacher(vm.currentUser.id).then(function (resp) {
      vm.examenes = resp.data;
      console.log('Examenes:', vm.examenes); // <-- Aquí verás el array en la consola
      vm.showForm = vm.examenes.length === 0;
    });

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
      ExamService.updateExam(vm.exam).then(function () {
        vm.exam = { preguntas: [] };
        vm.showForm = false;
        vm.editMode = false;
        loadExams(); // Recarga la lista
        vm.selectedExam = null; // Limpia la selección
      });
    };

    vm.deleteExam = function (exam) {
      if (confirm('¿Seguro que deseas eliminar este examen?')) {
        ExamService.deleteExam(exam.examen_id).then(function () {
          loadExams();
        });
      }
    };

    vm.toggleBlockExam = function (exam) {
      const nuevoEstado = exam.estado === 'bloqueado' ? 'activo' : 'bloqueado';
      ExamService.cambiarEstadoExamen(exam.id, nuevoEstado).then(function () {
        exam.estado = nuevoEstado;
        Swal.fire('Listo', `El examen fue ${nuevoEstado === 'bloqueado' ? 'bloqueado' : 'activado'}.`, 'success');
      });
    };

    vm.viewExamDetails = function (exam) {
      // Busca el examen actualizado en la lista
      const actualizado = vm.examenes.find(e =>
        (e.id && exam.id && e.id === exam.id) ||
        (e.examen_id && exam.examen_id && e.examen_id === exam.examen_id)
      );
      vm.selectedExam = actualizado || exam;
      vm.showForm = false;
      vm.editMode = false;
    };

    vm.cancelForm = function () {
      vm.showForm = false;
      vm.editMode = false;
      vm.exam = { preguntas: [] };
    };
  });