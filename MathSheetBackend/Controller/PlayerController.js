// PlayerController.js

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "imanmuqri1",
  port: process.env.DB_PORT,
});
// Function to create a new player
const createPlayer = async (req, res) => {
  const { name, score } = req.body;
  const query = "INSERT INTO players (name, score) VALUES ($1, $2) RETURNING *";
  const values = [name, score];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(400).json({ error: "Failed to create player" });
  }
};

// Function to get all players
const getPlayers = async (req, res) => {
  const query = "SELECT * FROM players ORDER BY score DESC";

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve players" });
  }
};

module.exports = {
  createPlayer,
  getPlayers,
};
