const UserModel = require('../models/user.model');
const db = require('../config/db'); // Asegúrate de tener esta línea para usar la conexión directa

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

// REGISTRO DE USUARIO (con creación automática en teachers si es maestro)
const registerUser = (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;

  UserModel.createUser({ nombre, apellido, email, password, rol }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
    const userId = result.insertId;

    // Si el rol es maestro, crea también en teachers con el MISMO id
    if (rol && ['teacher', 'maestro', 'profesor'].includes(rol.toLowerCase())) {
      console.log('ROL RECIBIDO:', rol);
      db.query(
        'INSERT INTO teachers (id, user_id, nombre, apellido, email) VALUES (?, ?, ?, ?, ?)',
        [userId, userId, nombre, apellido, email],
        (err2) => {
          if (err2) {
            console.error('Error al registrar maestro:', err2);
            return res.status(500).json({ error: 'Error al registrar maestro' });
          }
          return res.json({ message: 'Usuario y maestro registrados correctamente', userId, teacherId: userId });
        }
      );
    }

    else {
      return res.json({ message: 'Usuario registrado correctamente', userId });
    }
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  registerUser
};