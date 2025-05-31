const UserModel = require('../models/user.model');
const db = require('../config/db');

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
  // Busca el usuario con rol teacher
  const loginTeacher = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ? AND role = "teacher"',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
      if (results.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
      }
      res.status(200).json({ message: 'Login exitoso', user: results[0] });
    }
  );
};

module.exports = {
  registerTeacher,
  loginTeacher,
  // ...otros métodos...
};