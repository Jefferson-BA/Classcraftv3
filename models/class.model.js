const db = require('../config/db');

const getAllClasses = (callback) => {
  db.query('SELECT * FROM mis_clases', callback);
};

const getClassById = (classId, callback) => {
  db.query('SELECT * FROM mis_clases WHERE id = ?', [classId], callback);
};

const createClass = (data, callback) => {
  const {
    nombre_clase,
    seccion,
    ciclo,
    fecha_inicio,
    fecha_fin,
    estado,
    profesor_id
  } = data;
  // Genera un código de unión aleatorio
  const codigo_union = Math.random().toString(36).substring(2, 8).toUpperCase();
  db.query(
    `INSERT INTO mis_clases (nombre_clase, seccion, ciclo, fecha_inicio, fecha_fin, estado, profesor_id, codigo_union)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombre_clase, seccion, ciclo, fecha_inicio, fecha_fin, estado, profesor_id, codigo_union],
    function (err, result) {
      if (err) return callback(err);
      callback(null, { insertId: result.insertId, codigo_union });
    }
  );
};

const updateClass = (classId, classData, callback) => {
  db.query(
    'UPDATE mis_clases SET nombre_clase = ?, seccion = ?, ciclo = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
    [classData.nombre_clase, classData.seccion, classData.ciclo, classData.fecha_inicio, classData.fecha_fin, classId],
    callback
  );
};

const deleteClass = (classId, callback) => {
  db.query('DELETE FROM mis_clases WHERE id = ?', [classId], callback);
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};