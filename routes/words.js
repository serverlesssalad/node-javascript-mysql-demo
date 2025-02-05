const express = require("express");
const router = express.Router();
const {
  getAllWords,
  getWordById,
  insertWord,
  updateWord,
  deleteWord
} = require("../models/wordModel");

// Get all words
router.get("/", async (req, res) => {
  try {
    const words = await getAllWords();
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a word by ID
router.get("/:id", async (req, res) => {
  try {
    const word = await getWordById(req.params.id);
    if (!word) return res.status(404).json({ error: "Word not found" });
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new word
router.post("/", async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) return res.status(400).json({ error: "Word is required" });

    const newWord = await insertWord(word);
    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing word
router.put("/:id", async (req, res) => {
  try {
    const { word } = req.body;
    if (!word) return res.status(400).json({ error: "Word is required" });

    const updatedWord = await updateWord(req.params.id, word);
    if (!updatedWord) return res.status(404).json({ error: "Word not found" });

    res.json(updatedWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a word
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteWord(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Word not found" });

    res.json({ message: "Word deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
