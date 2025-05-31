// NUEVO: Controlador básico para clases
const ClassModel = require('../models/class.model');

const getAllClasses = (req, res) => {
  ClassModel.getAllClasses((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener clases' });
    }
    res.json(results);
  });
};

const getClassById = (req, res) => {
  const classId = req.params.id;
  
  ClassModel.getClassById(classId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la clase' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(results[0]);
  });
};

const createClass = (req, res) => {
  const classData = req.body;
  
  ClassModel.createClass(classData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la clase' });
    }
    res.status(201).json({ message: 'Clase creada correctamente', id: result.insertId });
  });
};

const updateClass = (req, res) => {
  const classId = req.params.id;
  const classData = req.body;
  
  ClassModel.updateClass(classId, classData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la clase' });
    }
    res.json({ message: 'Clase actualizada correctamente' });
  });
};

const deleteClass = (req, res) => {
  const classId = req.params.id;
  
  ClassModel.deleteClass(classId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la clase' });
    }
    res.json({ message: 'Clase eliminada correctamente' });
  });
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};
