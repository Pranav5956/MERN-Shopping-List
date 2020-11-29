import mongoose from "mongoose";

// Create Item Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  addedBy: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("item", itemSchema);
