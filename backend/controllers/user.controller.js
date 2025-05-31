// NUEVO: Controlador básico para usuarios
const UserModel = require('../models/user.model');

const getAllUsers = (req, res) => {
  UserModel.getAllUsers((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  
  UserModel.getUserById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(results[0]);
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  
  UserModel.updateUser(userId, userData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser
};