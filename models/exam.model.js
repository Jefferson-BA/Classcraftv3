const db = require('../config/db');

exports.createExam = (exam, callback) => {
  db.query('INSERT INTO exams SET ?', exam, callback);
};

exports.addQuestion = (question, callback) => {
  db.query('INSERT INTO exam_questions SET ?', question, callback);
};

exports.addOption = (option, callback) => {
  db.query('INSERT INTO exam_options SET ?', option, callback);
};

exports.getExamsForStudent = (studentId, callback) => {
  // Ejemplo: todos los exámenes (puedes filtrar por clase)
  db.query('SELECT * FROM exams', callback);
};

exports.getExamWithQuestions = (examId, callback) => {
  db.query('SELECT * FROM exams WHERE id = ?', [examId], (err, exams) => {
    if (err || !exams.length) return callback(err || new Error('No exam'), null);
    db.query('SELECT * FROM exam_questions WHERE exam_id = ?', [examId], (err2, questions) => {
      if (err2) return callback(err2, null);
      // Opcional: cargar opciones de cada pregunta
      callback(null, { exam: exams[0], questions });
    });
  });
};