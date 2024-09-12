const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const playerRoutes = require("./Routes/PlayerRoutes.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Handle pool connection events
pool.on("error", (err, client) => {
  console.error("Error connecting to PostgreSQL:", err);
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

// Create table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    score DOUBLE PRECISION NOT NULL
  );
`;

// Attempt to connect to the database to trigger connection events
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client from the pool", err.stack);
  }
  client.query(createTableQuery, (err, res) => {
    release();
    if (err) {
      return console.error("Error creating table", err);
    }
    console.log("Table 'players' created successfully");
  });
});

app.use(express.json());
app.use(cors());

// Handle requests to the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the MathSheetBe API"); // Replace with your desired response
});

// Routes
app.use("/api", playerRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
