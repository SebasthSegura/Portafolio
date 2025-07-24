// Instala primero: npm install mysql2 dotenv

require('dotenv').config({ path: './database.env' });
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
  // Aquí puedes realizar tus consultas
  connection.end();
});