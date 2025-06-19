const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
const classRoutes = require('./routes/class.routes');
app.use('/api/classes', classRoutes);

const studentRoutes = require('./routes/student.routes');
app.use('/api/students', studentRoutes);
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir rutas que no sean API al index.html (para HTML5 mode)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});