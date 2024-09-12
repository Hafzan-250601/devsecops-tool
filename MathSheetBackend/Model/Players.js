const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },
  registered_on: {
    type: Date,
    default: Date.now(),
  },
});

var Playersdata = mongoose.model("Playersdata", PlayerSchema);
module.exports = Playersdata;
