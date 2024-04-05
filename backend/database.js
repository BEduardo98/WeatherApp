const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    console.error("Erreur de connexion à la base de données : ", error.message);
  } else {
    console.log("Connexion à la base de données réussie.");
  }
});

module.exports = connection;
