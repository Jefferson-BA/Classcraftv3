const Teacher = require('../models/teacher.model');

// === GESTIÓN DE PROFESORES ===

// Crear profesor
const createTeacher = (req, res) => {
  Teacher.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear profesor' });
    res.json({ message: 'Profesor creado', id: result.insertId });
  });
};

// === EXPORTACIÓN DE FUNCIONES ===
module.exports = {
  createTeacher
};
