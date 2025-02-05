const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Create database if not exists
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err) => {
      if (err) {
        console.error("Database creation failed:", err);
        return;
      }
      console.log("Database ready");

      // Connect to the newly created database
      const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      db.connect((err) => {
        if (err) {
          console.error("Database selection failed:", err);
          return;
        }

        // Create table if not exists
        db.query(
          `CREATE TABLE IF NOT EXISTS words (
            id INT AUTO_INCREMENT PRIMARY KEY,
            word VARCHAR(255) NOT NULL
          )`,
          (err) => {
            if (err) {
              console.error("Table creation failed:", err);
              return;
            }
            console.log("Table ready");
          }
        );
      });
    }
  );
});

module.exports = connection;
