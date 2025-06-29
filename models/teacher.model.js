const db = require('../config/db');

exports.create = (teacher, callback) => {
  db.query('INSERT INTO teachers SET ?', teacher, callback);
};

exports.findById = (id, callback) => {
  db.query('SELECT * FROM teachers WHERE id = ?', [id], callback);
};