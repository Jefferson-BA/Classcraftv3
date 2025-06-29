const Exam = require('../models/exam.model');

// === GESTIÓN DE EXÁMENES ===

// Crear examen con preguntas
const createExam = (req, res) => {
  const { titulo, descripcion, imagen, tiempo_limite, xp_total, teacher_id, preguntas } = req.body;

  Exam.createExam({ titulo, descripcion, imagen, tiempo_limite, xp_total, teacher_id }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear examen' });

    const examId = result.insertId;

    // Guardar preguntas si existen
    if (preguntas && preguntas.length) {
      preguntas.forEach(p => {
        Exam.addQuestion({ exam_id: examId, pregunta: p.pregunta, imagen: p.imagen, puntaje: p.puntaje }, () => {});
      });
    }

    res.json({ message: 'Examen creado', examId });
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
  Exam.getExamWithQuestions(req.params.examId, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error al obtener examen' });
    res.json(data);
  });
};

// === EXPORTACIÓN DE FUNCIONES ===
module.exports = {
  createExam,
  getExamsForStudent,
  getExamWithQuestions
};
