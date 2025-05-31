// NUEVO: Modelo para estudiantes
const db = require('../config/db');

const getAllStudents = (callback) => {
  const query = 'SELECT * FROM students';
  db.query(query, callback);
};

const getStudentById = (studentId, callback) => {
  const query = 'SELECT * FROM students WHERE id = ?';
  db.query(query, [studentId], callback);
};

const createStudent = (studentData, callback) => {
  const query = 'INSERT INTO students (name, email, class_id) VALUES (?, ?, ?)';
  db.query(query, [studentData.name, studentData.email, studentData.class_id], callback);
};

const updateStudent = (studentId, studentData, callback) => {
  const query = 'UPDATE students SET name = ?, email = ? WHERE id = ?';
  db.query(query, [studentData.name, studentData.email, studentId], callback);
};

const deleteStudent = (studentId, callback) => {
  const query = 'DELETE FROM students WHERE id = ?';
  db.query(query, [studentId], callback);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};