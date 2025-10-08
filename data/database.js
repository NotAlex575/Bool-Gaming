const mysql = require("mysql2");

// Usa un pool invece di una connessione singola
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verifica connessione
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Errore nella connessione al database:", err);
  } else {
    console.log("✅ Connessione al database MySQL riuscita!");
    connection.release(); // restituisce la connessione al pool
  }
});

module.exports = pool;
