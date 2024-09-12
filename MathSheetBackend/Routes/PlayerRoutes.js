const express = require("express");
const {
  createPlayer,
  getPlayers,
} = require("../Controller/PlayerController.js");

const router = express.Router();

router.post("/players", createPlayer);
router.get("/players", getPlayers);

module.exports = router;
