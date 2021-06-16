const express = require("express");
const router = express.Router();
const {
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/todosController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/api/v1/notes/", authMiddleware, getNotes);
router.post("/api/v1/notes/", authMiddleware, postNotes);
router.put("/api/v1/notes/:id", authMiddleware, updateNotes);
router.delete("/api/v1/notes/:id", authMiddleware, deleteNotes);

module.exports = router;
