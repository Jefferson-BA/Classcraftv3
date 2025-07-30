angular.module('app')
  .controller('ExamStudentListController', function(ExamService, $window) {
    const vm = this;
    vm.currentUser = JSON.parse($window.localStorage.getItem('currentUser') || '{}');
    vm.examenes = [];
    vm.currentPage = 1;
    vm.pageSize = 5;

    ExamService.getExamsForStudent(vm.currentUser.id).then(function(resp) {
      vm.examenes = resp.data;
      vm.totalPages = Math.ceil(vm.examenes.length / vm.pageSize);
    });

    vm.goToExam = function(examId) {
      window.location.href = '#!/dashboard/alumno/examen/' + examId;
    };

    vm.setPage = function(page) {
      if (page >= 1 && page <= vm.totalPages) {
        vm.currentPage = page;
      }
    };

    vm.getPagedExams = function() {
      const start = (vm.currentPage - 1) * vm.pageSize;
      return vm.examenes.slice(start, start + vm.pageSize);
    };
  });