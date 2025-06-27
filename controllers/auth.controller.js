const UserModel = require('../models/user.model');
const db = require('../config/db');

// Registro de maestro
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
    res.status(201).json({ message: 'Maestro registrado exitosamente' });
  });
};

// Login de maestro
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

// Registro de alumno
const registerStudent = (req, res) => {
  const { username, email, password, nombre, apellido } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  // Verifica si el email ya existe
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
    if (results.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }
    // Crea el usuario
    db.query(
      'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, "student")',
      [username, password, email],
      (err2, result) => {
        if (err2) return res.status(500).json({ message: 'Error al registrar usuario.' });
        const userId = result.insertId;
        // Crea el registro en students con el mismo id
        db.query(
          'INSERT INTO students (id, nombre, apellido) VALUES (?, ?, ?)',
          [userId, nombre || username, apellido || ''],
          (err3) => {
            if (err3) return res.status(500).json({ message: 'Error al crear estudiante.' });
            res.status(201).json({ message: 'Alumno registrado exitosamente', userId });
          }
        );
      }
    );
  });
};

// Login de alumno
const loginStudent = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ? AND role = "student"',
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
  registerStudent,
  loginStudent
  // ...otros métodos...
};