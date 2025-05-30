// backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/auth', require('./routes/auth.routes'));
// Agrega más rutas aquí si tienes otras

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir rutas que no sean API al index.html (para HTML5 mode)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
