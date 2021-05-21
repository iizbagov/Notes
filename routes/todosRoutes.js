const express = require("express");
const router = express.Router();
const {
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/todosController");

router.get("/api/v1/", getNotes);
router.post("/api/v1/notes/", postNotes);
router.put("/api/v1/notes/:id/", updateNotes);
router.delete("/api/v1/notes/:id/", deleteNotes);

module.exports = router;
