angular.module('app')
  .controller('ClassroomController', function (ClassService, $window) {
    const vm = this;

    // === VARIABLES INICIALES ===
    const currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
    vm.teacherId = currentUser ? currentUser.id : null;

    vm.className = '';
    vm.section = '';
    vm.cycle = '';
    vm.fechaInicio = '';
    vm.fechaFin = '';
    vm.codigoUnion = null;
    vm.showCreateForm = false;
    vm.classList = [];
    vm.claseSeleccionada = null;
    vm.estudiantesClase = [];

    // === CARGA DE CLASES DEL PROFESOR ===
    vm.cargarClases = function () {
      if (!vm.teacherId) return;
      ClassService.getClasesProfesor(vm.teacherId)
        .then(function (response) {
          vm.classList = response.data;
          vm.showCreateForm = vm.classList.length === 0;
        })
        .catch(function () {
          vm.classList = [];
          vm.showCreateForm = true;
        });
    };

    vm.cargarClases(); // Llamada inicial

    // === FORMULARIO DE CREACIÓN ===
    vm.openCreateForm = function () {
      vm.showCreateForm = true;
      vm.codigoUnion = null;
    };

    vm.closeCreateForm = function () {
      vm.showCreateForm = false;
      vm.className = '';
      vm.section = '';
      vm.cycle = '';
      vm.fechaInicio = '';
      vm.fechaFin = '';
      vm.codigoUnion = null;
    };

    vm.createClass = function () {
      const data = {
        nombre_clase: vm.className,
        seccion: vm.section,
        ciclo: vm.cycle,
        fecha_inicio: vm.fechaInicio,
        fecha_fin: vm.fechaFin,
        profesor_id: vm.teacherId
      };
      if (!data.nombre_clase || !data.seccion || !data.ciclo || !data.fecha_inicio || !data.fecha_fin || !data.profesor_id) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
      }
      ClassService.createClass(data)
        .then(function (response) {
          vm.codigoUnion = response.data.codigo_union;
          Swal.fire({
            title: 'Clase agregada',
            html: 'La clase fue creada exitosamente.<br><b>Código de unión: ' + vm.codigoUnion + '</b>',
            icon: 'success'
          });
          vm.closeCreateForm();
          vm.cargarClases();
        })
        .catch(function (err) {
          Swal.fire('Error', err.data && err.data.message ? err.data.message : 'Error al crear la clase', 'error');
        });
    };

    // === DETALLES DE CLASE ===
    vm.verDetalles = function (clase) {
      vm.claseSeleccionada = clase;
      ClassService.getEstudiantesDeClase(clase.id)
        .then(function (response) {
          vm.estudiantesClase = Array.isArray(response.data) ? response.data : (response.data.alumnos || []);
        });
    };

    vm.cerrarModal = function () {
      vm.claseSeleccionada = null;
      vm.estudiantesClase = [];
    };


    // === ELIMINAR CLASE ===
    vm.eliminarClase = function (clase) {
      Swal.fire({
        title: '¿Eliminar esta clase?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ClassService.eliminarClase(clase.id)
            .then(function () {
              vm.cargarClases();
              Swal.fire('Eliminada', 'La clase fue eliminada.', 'success');
            });
        }
      });
    };

    // === EDITAR CLASE ===
    vm.editarClase = function (clase) {
      Swal.fire({
        title: 'Editar clase',
        html: `
          <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${clase.nombre_clase}">
          <input id="swal-seccion" class="swal2-input" placeholder="Sección" value="${clase.seccion}">
          <input id="swal-ciclo" class="swal2-input" placeholder="Ciclo" value="${clase.ciclo}">
          <input id="swal-inicio" class="swal2-input" placeholder="Fecha Inicio" value="${clase.fecha_inicio}">
          <input id="swal-fin" class="swal2-input" placeholder="Fecha Fin" value="${clase.fecha_fin}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            nombre_clase: document.getElementById('swal-nombre').value,
            seccion: document.getElementById('swal-seccion').value,
            ciclo: document.getElementById('swal-ciclo').value,
            fecha_inicio: document.getElementById('swal-inicio').value,
            fecha_fin: document.getElementById('swal-fin').value
          };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          ClassService.editarClase(clase.id, result.value)
            .then(function () {
              Swal.fire('Actualizado', 'La clase fue actualizada.', 'success');
              vm.cargarClases();
            });
        }
      });
    };
    vm.finalizarClase = function (clase) {
      Swal.fire({
        title: '¿Finalizar esta clase?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ClassService.cambiarEstadoClase(clase.id, 'finalizada')
            .then(function () {
              Swal.fire('Finalizada', 'La clase fue finalizada.', 'success');
              vm.cargarClases();
            });
        }
      });
    };

    vm.bloquearClase = function (clase) {
      const nuevoEstado = clase.estado === 'bloqueada' ? 'activa' : 'bloqueada';
      ClassService.cambiarEstadoClase(clase.id, nuevoEstado)
        .then(function () {
          clase.estado = nuevoEstado;
          Swal.fire('Listo', 'El estado de la clase ha sido actualizado.', 'success');
        });
    };

    // === FUNCIONES DE ESTUDIANTES ===
    vm.eliminarAlumnoDeClase = function (claseId, alumnoId) {
      Swal.fire({
        title: '¿Eliminar estudiante?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          ClassService.eliminarAlumnoDeClase(claseId, alumnoId)
            .then(function () {
              Swal.fire('Eliminado', 'El estudiante fue eliminado.', 'success');
              // Refresca la lista de alumnos de la clase
              vm.verDetalles({ id: claseId });
            });
        }
      });
    };

    vm.verPerfilAlumno = function (alumnoId) {
      Swal.fire({
        title: 'Perfil del estudiante',
        text: 'ID: ' + alumnoId,
        icon: 'info'
      });
    };

    vm.cerrarModal = function () {
      vm.claseSeleccionada = null;
      vm.estudiantesClase = [];
    };

    // === UTILITARIOS ===
    vm.copyToClipboard = function (text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        Swal.fire('Copiado', 'Código copiado al portapapeles', 'success');
      }
    };

    vm.copiarCodigo = function (codigo) {
      navigator.clipboard.writeText(codigo);
      $window.alert('Código copiado: ' + codigo);
    };
  });
