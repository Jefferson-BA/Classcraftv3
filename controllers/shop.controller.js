const db = require('../config/db');

// Mascotas disponibles en la tienda
exports.getMascotasTienda = (req, res) => {
  db.query(
    `SELECT m.*, t.precio_oro FROM mascotas m
     JOIN tienda t ON t.ref_id = m.id AND t.tipo = 'mascota'`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Error al obtener mascotas' });
      res.json(rows);
    }
  );
};

// Comprar mascota
exports.comprarMascota = (req, res) => {
  const { studentId, mascotaId } = req.body;
  // 1. Obtener precio de la mascota
  db.query(
    `SELECT precio_oro FROM tienda WHERE tipo = 'mascota' AND ref_id = ?`,
    [mascotaId],
    (err, rows) => {
      if (err || rows.length === 0) return res.status(400).json({ error: 'Mascota no disponible en tienda' });
      const costo = rows[0].precio_oro;

      // 2. Verifica oro del estudiante
      db.query('SELECT oro FROM students WHERE id = ?', [studentId], (err2, rows2) => {
        if (err2 || rows2.length === 0) return res.status(400).json({ error: 'Alumno no encontrado' });
        if (rows2[0].oro < costo) return res.status(400).json({ error: 'No tienes suficiente oro' });

        // 3. Descuenta oro
        db.query('UPDATE students SET oro = oro - ? WHERE id = ?', [costo, studentId], (err3) => {
          if (err3) return res.status(500).json({ error: 'Error al descontar oro' });

          // 4. Inserta mascota en inventario
          db.query('INSERT INTO student_mascotas (student_id, mascota_id) VALUES (?, ?)', [studentId, mascotaId], (err4) => {
            if (err4) return res.status(500).json({ error: 'Error al agregar mascota al inventario' });
            res.json({ message: 'Mascota comprada exitosamente' });
          });
        });
      });
    }
  );
};

// Mascotas del alumno
exports.getMascotasAlumno = (req, res) => {
  const studentId = req.params.studentId;
  db.query(
    `SELECT m.* FROM mascotas m
     JOIN student_mascotas sm ON m.id = sm.mascota_id
     WHERE sm.student_id = ?`,
    [studentId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Error al obtener mascotas del alumno' });
      res.json(rows);
    }
  );
};