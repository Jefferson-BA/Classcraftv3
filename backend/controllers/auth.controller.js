const UserModel = require('../models/user.model');

const registerTeacher = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  UserModel.registerTeacher({ username, email, password }, (err, result) => {
    if (err) {
      if (err.code === 'EMAIL_EXISTS') {
        return res.status(409).json({ message: 'El correo ya está registrado.' });
      }
      return res.status(500).json({ message: 'Error al registrar maestro.' });
    }
    // Solo mensaje, sin teacherId
    res.status(201).json({ message: 'Maestro registrado exitosamente' });
  });
};

module.exports = {
  registerTeacher,
  // ...otros métodos...
};