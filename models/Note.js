const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    // createdAt
    // updatedAt
    // date: {
    // type: Date,
    // default: Date.now,
    // },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Notes", NoteSchema);
