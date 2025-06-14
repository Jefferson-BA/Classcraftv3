const db = require('../config/db');

// Obtener todas las clases
const getAllClasses = (callback) => {
  const query = 'SELECT * FROM mis_clases';
  db.query(query, callback);
};

// Obtener clase por ID
const getClassById = (classId, callback) => {
  const query = 'SELECT * FROM mis_clases WHERE id = ?';
  db.query(query, [classId], callback);
};

// Generador de código de 6 caracteres alfanuméricos
function generarCodigoUnion() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const createClass = (classData, callback) => {
  const codigo_union = generarCodigoUnion();
  const query = 'INSERT INTO mis_clases (nombre_clase, seccion, ciclo, fecha_inicio, fecha_fin, estado, codigo_union) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [
    classData.nombre_clase,
    classData.seccion,
    classData.ciclo,
    classData.fecha_inicio,
    classData.fecha_fin,
    classData.estado || 'activa',
    codigo_union
  ], function (err, result) {
    if (err) return callback(err);
    // Devuelve también el código de unión
    callback(null, { insertId: result.insertId, codigo_union });
  });
};

// Actualizar clase
const updateClass = (classId, classData, callback) => {
  const query = 'UPDATE mis_clases SET nombre_clase = ?, seccion = ?, ciclo = ? WHERE id = ?';
  db.query(query, [classData.nombre_clase, classData.seccion, classData.ciclo, classId], callback);
};

// Eliminar clase
const deleteClass = (classId, callback) => {
  const query = 'DELETE FROM mis_clases WHERE id = ?';
  db.query(query, [classId], callback);
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};