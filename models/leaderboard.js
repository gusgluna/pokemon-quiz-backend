const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 4 },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  gameMode: {
    type: String,
    enum: {
      values: ["quick", "advanced"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);
