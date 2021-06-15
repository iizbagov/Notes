const express = require("express");
const router = express.Router();
const {
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/todosController");
const notesMiddleware = require("../middleware/notesMiddleware");

router.get("/api/v1/notes/", notesMiddleware, getNotes);
router.post("/api/v1/notes/", notesMiddleware, postNotes);
router.put("/api/v1/notes/:id", notesMiddleware, updateNotes);
router.delete("/api/v1/notes/:id", notesMiddleware, deleteNotes);

module.exports = router;
