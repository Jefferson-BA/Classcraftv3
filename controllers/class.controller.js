const ClassModel = require('../models/class.model');
const db = require('../config/db');

// === CONSULTAS GENERALES ===

// Obtener todas las clases
const getAllClasses = (req, res) => {
  ClassModel.getAllClasses((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clases' });
    res.json(results);
  });
};

// Obtener clase por ID
const getClassById = (req, res) => {
  const classId = req.params.id;
  ClassModel.getClassById(classId, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener la clase' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(results[0]);
  });
};

// Obtener clases del profesor
const getClasesProfesor = (req, res) => {
  const profesorId = req.query.profesor_id;

  db.query('SELECT * FROM mis_clases WHERE profesor_id = ?', [profesorId], (err, results) => {
    if (err) {
      console.error('Error SQL:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json(results);
  });
};

// Obtener alumnos de una clase
const getEstudiantesDeClase = (req, res) => {
  const claseId = req.params.id;

  db.query(
    `SELECT u.id, u.username, u.email
     FROM alumnos_clases ac
     JOIN users u ON ac.alumno_id = u.id
     WHERE ac.clase_id = ? AND u.role = 'student'`,
    [claseId],
    (err, results) => {
      if (err) {
        console.error('Error SQL:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
    }
  );
};

// === GESTIÓN DE CLASES ===

// Crear clase
const createClass = (req, res) => {
  const {
    nombre_clase,
    seccion,
    ciclo,
    fecha_inicio,
    fecha_fin,
    profesor_id
  } = req.body;

  if (!nombre_clase || !seccion || !ciclo || !fecha_inicio || !fecha_fin || !profesor_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const nuevaClase = {
    nombre_clase,
    seccion,
    ciclo,
    fecha_inicio,
    fecha_fin,
    estado: 'activa',
    profesor_id
  };

  ClassModel.createClass(nuevaClase, (err, result) => {
    if (err) {
      console.error('Error en createClass:', err);
      return res.status(500).json({ message: 'Error al crear la clase.' });
    }

    res.status(201).json({
      message: 'Clase agregada exitosamente',
      codigo_union: result.codigo_union
    });
  });
};

// Cambiar estado de la clase
const cambiarEstadoClase = (req, res) => {
  const claseId = req.params.id;
  const { estado } = req.body;
  if (!['activa', 'finalizada', 'bloqueada'].includes(estado)) {
    return res.status(400).json({ message: 'Estado no válido.' });
  }
  db.query('UPDATE mis_clases SET estado = ? WHERE id = ?', [estado, claseId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cambiar el estado de la clase.' });
    }
    res.json({ message: 'Estado de la clase actualizado.' });
  });
};  

// Actualizar clase
const updateClass = (req, res) => {
  const classId = req.params.id;
  const classData = req.body;

  ClassModel.updateClass(classId, classData, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la clase' });
    res.json({ message: 'Clase actualizada correctamente' });
  });
};

// Eliminar clase (con limpieza de relaciones)
const deleteClass = (req, res) => {
  const claseId = req.params.id;

  // Paso 1: Eliminar alumnos vinculados
  db.query('DELETE FROM alumnos_clases WHERE clase_id = ?', [claseId], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar alumnos de la clase' });

    // Paso 2: Eliminar la clase
    db.query('DELETE FROM mis_clases WHERE id = ?', [claseId], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al eliminar la clase' });
      res.json({ message: 'Clase eliminada correctamente' });
    });
  });
};

// Eliminar alumno de una clase
const eliminarAlumnoDeClase = (req, res) => {
  const { claseId, alumnoId } = req.params;
  db.query(
    'DELETE FROM alumnos_clases WHERE clase_id = ? AND alumno_id = ?',
    [claseId, alumnoId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar al alumno de la clase.' });
      }
      res.json({ message: 'Alumno eliminado de la clase.' });
    }
  );
};

// === EXPORTACIÓN DE FUNCIONES ===
module.exports = {
  getAllClasses,
  getClassById,
  getClasesProfesor,
  getEstudiantesDeClase,
  createClass,
  updateClass,
  deleteClass,
  cambiarEstadoClase,
  eliminarAlumnoDeClase
};