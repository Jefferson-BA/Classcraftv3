// NUEVO: Controlador básico para estudiantes
const StudentModel = require('../models/student.model');

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
  deleteStudent
};