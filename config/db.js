const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sin contraseña
  database: 'classcraft_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err);
    process.exit(1);
  } else {
    console.log('✅ Conexión a MySQL exitosa');
  }
});

module.exports = connection;