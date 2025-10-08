// importiamo mysql2
const mysql = require("mysql2");

// creo la connessione
const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connesso al database MySQL!');
});

// stabilisco la connessione al db
connection.connect((err) => {
    if (err) {
        console.log(process.env.DB_USER)
        console.log(`Errore nella connessione al db: ${err}`);
    } else {
        console.log("Connessione al db avvenuta correttamente");
    }
});

module.exports = connection;