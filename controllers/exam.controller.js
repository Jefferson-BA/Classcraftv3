const Exam = require('../models/exam.model');
const db = require('../config/db');

// === GESTIÓN DE EXÁMENES ===

// Crear examen con preguntas
const createExam = (req, res) => {
  const { titulo, descripcion, imagen, tiempo_limite, xp_total, teacher_id, preguntas } = req.body;

  const examData = { titulo, descripcion, imagen, tiempo_limite, xp_total, teacher_id };

  Exam.createExam(examData, (err, result) => {
    if (err) {
      console.error('Error al crear examen:', err);
      return res.status(500).json({ message: 'Error al crear examen' });
    }

    const examId = result.insertId;

    if (preguntas && preguntas.length > 0) {
      let pending = preguntas.length;
      let errorSent = false;
      for (const pregunta of preguntas) {
        const questionData = {
          exam_id: examId,
          pregunta: pregunta.pregunta,
          imagen: pregunta.imagen,
          puntaje: pregunta.puntaje
        };
        Exam.addQuestion(questionData, (err2) => {
          if (err2 && !errorSent) {
            errorSent = true;
            console.error('Error al agregar pregunta:', err2);
            return res.status(500).json({ message: 'Error al agregar pregunta' });
          }
          pending--;
          if (pending === 0 && !errorSent) {
            return res.json({ message: 'Examen creado con preguntas' });
          }
        });
      }
    } else {
      return res.json({ message: 'Examen creado' });
    }
  });
};

// Obtener exámenes disponibles para un estudiante
const getExamsForStudent = (req, res) => {
  Exam.getExamsForStudent(req.params.studentId, (err, exams) => {
    if (err) return res.status(500).json({ message: 'Error al obtener exámenes' });
    res.json(exams);
  });
};

// Obtener examen con sus preguntas
const getExamWithQuestions = (req, res) => {
  Exam.getExamWithQuestions(req.params.examId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener examen' });
    res.json(result); // <-- Debe ser un objeto { exam, questions }
  });
};

// Obtener exámenes de un maestro
const getExamsForTeacher = (req, res) => {
  const teacherId = req.params.teacherId;
  Exam.getExamsForTeacher(teacherId, (err, exams) => {
    if (err) return res.status(500).json({ message: 'Error al obtener exámenes' });
    res.json(exams);
  });
};

// Eliminar examen
const deleteExam = (req, res) => {
  const examId = req.params.id;
  db.query('DELETE FROM exams WHERE id = ?', [examId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar el examen' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Examen no encontrado' });
    res.json({ message: 'Examen eliminado correctamente' });
  });
};

const updateExam = (req, res) => {
  const examId = req.params.id; // <-- debe ser el mismo que usas en el frontend
  const examData = req.body;
  Exam.updateExam(examId, examData, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al actualizar el examen' });
    res.json({ message: 'Examen actualizado correctamente' });
  });
};


// === EXPORTACIÓN DE FUNCIONES ===
module.exports = {
  getExamsForTeacher,
  createExam,
  getExamsForStudent,
  getExamWithQuestions,
  deleteExam,
  updateExam
};