require("dotenv").config();
require("./db"); // Ensures database setup runs before starting the server

const express = require("express");
const wordsRouter = require("./routes/words");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
// Health Check with Environment Variable Check and DB Connectivity Check
app.get("/health", (req, res) => {
  const missingEnvVars = [];

  // Check for missing environment variables
  const requiredEnvVars = [
    { name: "DB_HOST", example: "localhost" },
    { name: "DB_USER", example: "root" },
    { name: "DB_PASSWORD", example: "yourpassword" },
    { name: "DB_NAME", example: "yourdatabase" }
  ];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar.name]) {
      missingEnvVars.push({ name: envVar.name, example: envVar.example });
    }
  });

  // If any environment variables are missing, log and return an error
  if (missingEnvVars.length > 0) {
    console.error("Missing environment variables:", missingEnvVars);
    return res.status(500).json({
      status: "error",
      message: "Missing environment variables",
      missing: missingEnvVars
    });
  }

  // Check MySQL connection using the already created connection from db.js
  const connection = require("./db");

  connection.ping((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).json({
        status: "error",
        message: "Database connection failed",
        error: err.message
      });
    }

    // If the DB connection is successful, send a healthy status
    res.json({ status: "healthy" });
  });
});

// Word Routes
app.use("/api/words", wordsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
