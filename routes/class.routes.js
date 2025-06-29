const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/class.controller');

// Obtener todas las clases
router.get('/', ClassController.getAllClasses);

// Obtener clases del profesor
router.get('/mis-clases', ClassController.getClasesProfesor);

// Obtener clase por ID
router.get('/:id', ClassController.getClassById);

// Obtener alumnos de una clase
router.get('/:id/alumnos', ClassController.getEstudiantesDeClase);

// Crear clase
router.post('/create', ClassController.createClass);

// Actualizar clase
router.put('/:id', ClassController.updateClass);

// Eliminar clase
router.delete('/:id', ClassController.deleteClass);

// Cambiar estado de la clase
router.put('/:id/estado', ClassController.cambiarEstadoClase);

// Eliminar alumno de la clase
router.delete('/:claseId/alumno/:alumnoId', ClassController.eliminarAlumnoDeClase);

module.exports = router;