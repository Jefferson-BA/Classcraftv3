const UserModel = require('../models/user.model');

const listUsersByRole = (req, res) => {
  const role = req.params.role;

  if (!['teacher', 'student', 'parent'].includes(role)) {
    return res.status(400).json({ error: 'Rol inválido' });
  }

  UserModel.getAllUsersByRole(role, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar usuarios' });
    }
    res.json(results);
  });
};

const registerTeacher = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  UserModel.registerTeacher({ username, email, password }, (err, result) => {
    if (err) {
      console.error('Error al registrar maestro:', err);
      return res.status(500).json({ error: 'Error al registrar' });
    }
    res.status(201).json({ message: 'Maestro registrado correctamente' });
  });
};

const loginTeacher = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  UserModel.loginTeacher(email, password, (err, results) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ message: 'Login exitoso', user: results[0] });
  });
};

module.exports = {
  listUsersByRole,
  registerTeacher,
  loginTeacher
};
