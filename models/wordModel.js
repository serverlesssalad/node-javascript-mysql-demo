const pool = require("../db");

const getAllWords = async () => {
  const [rows] = await pool.promise().query("SELECT * FROM words");
  return rows;
};

const getWordById = async (id) => {
  const [rows] = await pool.promise().query("SELECT * FROM words WHERE id = ?", [id]);
  return rows[0];
};

const insertWord = async (word) => {
  const [result] = await pool.promise().query("INSERT INTO words (word) VALUES (?)", [word]);
  return { id: result.insertId, word };
};

const updateWord = async (id, word) => {
  await pool.promise().query("UPDATE words SET word = ? WHERE id = ?", [word, id]);
  return getWordById(id);
};

const deleteWord = async (id) => {
  const [result] = await pool.promise().query("DELETE FROM words WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllWords,
  getWordById,
  insertWord,
  updateWord,
  deleteWord
};
