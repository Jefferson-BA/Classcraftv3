const db = require('../config/db');

const getAllUsersByRole = (role, callback) => {
  const query = 'SELECT * FROM users WHERE role = ?';
  db.query(query, [role], callback);
};

const registerTeacher = (userData, callback) => {
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, "teacher")';
  db.query(query, [userData.username, userData.email, userData.password], callback);
};

const loginTeacher = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND role = "teacher"';
  db.query(query, [email, password], callback);
};

module.exports = {
  getAllUsersByRole,
  registerTeacher,
  loginTeacher
};
