const db = require('../config/db');

// === CREACIÓN DE EXÁMENES Y COMPONENTES ===

// Crear examen
const createExam = (exam, callback) => {
  db.query('INSERT INTO exams SET ?', exam, callback);
};

// Agregar pregunta al examen
const addQuestion = (question, callback) => {
  db.query('INSERT INTO exam_questions SET ?', question, callback);
};

// Agregar opción a una pregunta
const addOption = (option, callback) => {
  db.query('INSERT INTO exam_options SET ?', option, callback);
};

// === CONSULTAS ===

// Obtener exámenes para un estudiante
const getExamsForStudent = (studentId, callback) => {
  // Puedes filtrar por clase o por estudiante si lo deseas
  db.query('SELECT id, titulo, descripcion, imagen, tiempo_limite, xp_total FROM exams', callback);
};

// Obtener exámenes creados por un profesor
const getExamsForTeacher = (teacherId, callback) => {
  db.query(
    'SELECT id AS examen_id, titulo, descripcion, imagen, tiempo_limite, xp_total FROM exams WHERE teacher_id = ?',
    [teacherId],
    (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    }
  );
};

// Obtener un examen con sus preguntas
const getExamWithQuestions = (examId, callback) => {
  db.query('SELECT * FROM exams WHERE id = ?', [examId], (err, exams) => {
    if (err || !exams.length) return callback(err || new Error('No exam'), null);

    db.query('SELECT * FROM exam_questions WHERE exam_id = ?', [examId], (err2, questions) => {
      if (err2) return callback(err2, null);

      // RESPUESTA CORRECTA:
      callback(null, { exam: exams[0], questions });
    });
  });
};

const updateExam = (examId, examData, callback) => {
  db.query(
    'UPDATE exams SET titulo = ?, descripcion = ?, imagen = ?, tiempo_limite = ?, xp_total = ? WHERE id = ?',
    [examData.titulo, examData.descripcion, examData.imagen, examData.tiempo_limite, examData.xp_total, examId],
    callback
  );
};

// === EXPORTACIÓN DE FUNCIONES ===
module.exports = {
  createExam,
  addQuestion,
  addOption,
  getExamsForStudent,
  getExamsForTeacher,
  getExamWithQuestions,
  updateExam
};