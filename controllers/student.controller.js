const StudentModel = require('../models/student.model');
const db = require('../config/db');

// Unirse a clase por código
const joinClass = (req, res) => {
  const { alumno_id, codigo_union } = req.body;

  db.query('SELECT id FROM mis_clases WHERE codigo_union = ?', [codigo_union], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }
    const clase_id = results[0].id;

    db.query('SELECT id FROM users WHERE id = ? AND role = "student"', [alumno_id], (err2, userResults) => {
      if (err2 || userResults.length === 0) {
        return res.status(404).json({ message: 'Alumno no válido' });
      }

      db.query('INSERT INTO alumnos_clases (alumno_id, clase_id) VALUES (?, ?)', [alumno_id, clase_id], (err3) => {
        if (err3) {
          if (err3.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Ya estás inscrito en esta clase' });
          }
          return res.status(500).json({ message: 'Error al unir al alumno a la clase' });
        }
        res.json({ message: 'Te has unido a la clase correctamente' });
      });
    });
  });
};

// Obtener clases del alumno
const getMyClasses = (req, res) => {
  const alumno_id = req.params.alumno_id;
  db.query(
    `SELECT c.* FROM mis_clases c
     JOIN alumnos_clases ac ON c.id = ac.clase_id
     WHERE ac.alumno_id = ?`,
    [alumno_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error en la base de datos' });
      }
      res.json(results);
    }
  );
};

const getAllStudents = (req, res) => {
  StudentModel.getAllStudents((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
    res.json(results);
  });
};

const getStudentById = (req, res) => {
  const studentId = req.params.id;
  StudentModel.getStudentById(studentId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(results[0]);
  });
};

const createStudent = (req, res) => {
  const studentData = req.body;
  StudentModel.createStudent(studentData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el estudiante' });
    }
    res.status(201).json({ message: 'Estudiante creado correctamente', id: result.insertId });
  });
};

const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const studentData = req.body;
  StudentModel.updateStudent(studentId, studentData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
    res.json({ message: 'Estudiante actualizado correctamente' });
  });
};

const deleteStudent = (req, res) => {
  const studentId = req.params.id;
  StudentModel.deleteStudent(studentId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
    res.json({ message: 'Estudiante eliminado correctamente' });
  });
};
exports.darOro = (req, res) => {
  const { studentId } = req.params;
  const { cantidad } = req.body;
  db.query(
    'UPDATE students SET oro = oro + ? WHERE id = ?',
    [cantidad, studentId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar oro' });
      res.json({ message: 'Oro actualizado' });
    }
  );
};
// Tu función para crear personaje:
const crearPersonaje = (req, res) => {
  const { studentId } = req.params;
  const { nombre, apellido, genero, personaje, clase } = req.body;
  db.query(
    'UPDATE students SET nombre = ?, apellido = ?, genero = ?, personaje = ?, clase = ?, personaje_creado = 1 WHERE id = ?',
    [nombre, apellido, genero, personaje, clase, studentId],
    (err, result) => {
      if (err) {
        console.error('Error SQL:', err);
        return res.status(500).json({ message: 'Error al crear personaje' });
      }
      if (result.affectedRows === 0) {
        // Si no existe, crea el registro
        db.query(
          'INSERT INTO students (id, nombre, apellido, genero, personaje, clase, personaje_creado) VALUES (?, ?, ?, ?, ?, ?, 1)',
          [studentId, nombre, apellido, genero, personaje, clase],
          (err2) => {
            if (err2) {
              console.error('Error SQL (insert):', err2);
              return res.status(500).json({ message: 'Error al crear estudiante' });
            }
            res.json({ message: 'Personaje creado' });
          }
        );
      } else {
        res.json({ message: 'Personaje creado' });
      }
    }
  );
};

const darOro = (req, res) => {
  const { studentId } = req.params;
  let { cantidad } = req.body;
  cantidad = Number(cantidad);

  if (isNaN(cantidad) || cantidad <= 0) {
    return res.status(400).json({ message: 'La cantidad de oro debe ser un número positivo.' });
  }

  db.query(
    'UPDATE students SET oro = oro + ? WHERE id = ?',
    [cantidad, studentId],
    (err, result) => {
      if (err) {
        console.error('Error SQL:', err);
        return res.status(500).json({ message: 'Error al dar oro' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      db.query('SELECT oro FROM students WHERE id = ?', [studentId], (err2, rows) => {
        if (err2) return res.json({ message: 'Oro actualizado' });
        res.json({ message: 'Oro actualizado', oro: rows[0].oro });
      });
    }
  );
};
const getStudent = (req, res) => {
  const { studentId } = req.params;
  db.query('SELECT * FROM students WHERE id = ?', [studentId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error al obtener estudiante' });
    if (!rows.length) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(rows[0]);
  });
};

const startExam = (req, res) => {
  const { student_id, exam_id } = req.body;
  db.query('INSERT INTO student_exam_status (student_id, exam_id, inicio) VALUES (?, ?, NOW())', [student_id, exam_id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al registrar inicio' });
    res.json({ message: 'Inicio registrado' });
  });
};

const finishExam = (req, res) => {
  const { student_id, exam_id, respuestas, nota, xp_obtenido, hp_perdido } = req.body;
  // Guardar respuestas
  respuestas.forEach(r => {
    db.query('INSERT INTO student_exam_answers SET ?', {
      student_id, exam_id, question_id: r.question_id, opcion_id: r.opcion_id, respuesta: r.respuesta, es_correcta: r.es_correcta, puntaje_obtenido: r.puntaje_obtenido
    });
  });
  // Registrar fin
  db.query('UPDATE student_exam_status SET fin = NOW() WHERE student_id = ? AND exam_id = ?', [student_id, exam_id]);
  // Guardar nota
  db.query('INSERT INTO student_notas (student_id, exam_id, nota, xp_obtenido, hp_perdido) VALUES (?, ?, ?, ?, ?)', [student_id, exam_id, nota, xp_obtenido, hp_perdido]);
  res.json({ message: 'Examen finalizado y nota registrada' });
};



module.exports = {
  startExam,
  finishExam,
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  joinClass,
  getMyClasses,
  crearPersonaje,
  darOro,
  getStudent
};