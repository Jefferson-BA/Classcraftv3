// NUEVO: Rutas básicas para gestión de clases
const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/class.controller');

// Rutas básicas para clases
router.get('/', ClassController.getAllClasses);
router.get('/:id', ClassController.getClassById);
router.post('/', ClassController.createClass);
router.put('/:id', ClassController.updateClass);
router.delete('/:id', ClassController.deleteClass);

module.exports = router;