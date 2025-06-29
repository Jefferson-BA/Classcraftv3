const db = require('../config/db');

const registerTeacher = (userData, callback) => {
  // Verifica si el email ya existe
  const checkQuery = 'SELECT id FROM users WHERE email = ?';
  db.query(checkQuery, [userData.email], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      // Email ya registrado
      return callback({ code: 'EMAIL_EXISTS' });
    }

    // Inserta el usuario con role 'teacher'
    const insertQuery = 'INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, "teacher", NOW())';
    db.query(
      insertQuery,
      [userData.username, userData.email, userData.password],
      callback
    );
  });
};
const createUser = (user, callback) => {
  db.query(
    'INSERT INTO users (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)',
    [user.nombre, user.apellido, user.email, user.password, user.rol],
    callback
  );
};
module.exports = {
  registerTeacher,
  createUser
  // ...otros métodos...
};