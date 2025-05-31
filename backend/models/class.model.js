// NUEVO: Modelo para clases
const db = require('../config/db');

const getAllClasses = (callback) => {
  const query = 'SELECT * FROM classes';
  db.query(query, callback);
};

const getClassById = (classId, callback) => {
  const query = 'SELECT * FROM classes WHERE id = ?';
  db.query(query, [classId], callback);
};

const createClass = (classData, callback) => {
  const query = 'INSERT INTO classes (name, description, teacher_id) VALUES (?, ?, ?)';
  db.query(query, [classData.name, classData.description, classData.teacher_id], callback);
};

const updateClass = (classId, classData, callback) => {
  const query = 'UPDATE classes SET name = ?, description = ? WHERE id = ?';
  db.query(query, [classData.name, classData.description, classId], callback);
};

const deleteClass = (classId, callback) => {
  const query = 'DELETE FROM classes WHERE id = ?';
  db.query(query, [classId], callback);
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};