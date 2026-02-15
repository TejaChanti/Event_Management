const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  organizer: String,
  location: String,
  date: Date,
  description: String,
  capacity: Number,
  category: String
}, { timestamps: true });

eventSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Event", eventSchema);
