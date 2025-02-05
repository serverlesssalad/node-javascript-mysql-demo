require("dotenv").config();
require("./db"); // Ensures database setup runs before starting the server

const express = require("express");
const wordsRouter = require("./routes/words");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// Word Routes
app.use("/api/words", wordsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
