const StudentModel = require('../models/student.model');
const db = require('../config/db');

// Unirse a clase por código
const joinClass = (req, res) => {
  const { alumno_id, codigo_union } = req.body;
  if (!alumno_id || !codigo_union) {
    return res.status(400).json({ message: 'Faltan datos.' });
  }
  db.query('SELECT id FROM mis_clases WHERE codigo_union = ?', [codigo_union], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
    if (results.length === 0) return res.status(404).json({ message: 'Código no válido.' });
    const clase_id = results[0].id;
    db.query('INSERT IGNORE INTO alumnos_clases (alumno_id, clase_id) VALUES (?, ?)', [alumno_id, clase_id], (err2) => {
      if (err2) return res.status(500).json({ message: 'Error al unirse a la clase.' });
      res.json({ message: 'Te has unido a la clase correctamente.' });
    });
  });
};

// Obtener clases del alumno
const getMyClasses = (req, res) => {
  const alumno_id = req.params.alumno_id;
  db.query(
    `SELECT c.* FROM mis_clases c
     JOIN alumnos_clases ac ON c.id = ac.clase_id
     WHERE ac.alumno_id = ?`,
    [alumno_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
      res.json(results);
    }
  );
};

const getAllStudents = (req, res) => {
  StudentModel.getAllStudents((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
    res.json(results);
  });
};

const getStudentById = (req, res) => {
  const studentId = req.params.id;
  StudentModel.getStudentById(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(results[0]);
  });
};

const createStudent = (req, res) => {
  const studentData = req.body;
  StudentModel.createStudent(studentData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el estudiante' });
    }
    res.status(201).json({ message: 'Estudiante creado correctamente', id: result.insertId });
  });
};

const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const studentData = req.body;
  StudentModel.updateStudent(studentId, studentData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
    res.json({ message: 'Estudiante actualizado correctamente' });
  });
};

const deleteStudent = (req, res) => {
  const studentId = req.params.id;
  StudentModel.deleteStudent(studentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
    res.json({ message: 'Estudiante eliminado correctamente' });
  });
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  joinClass,
  getMyClasses
};