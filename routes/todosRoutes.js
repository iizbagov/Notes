const express = require("express");
const router = express.Router();
const {
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/todosController");

router.get("/", getNotes);
router.post("/notes", postNotes);
router.put("/notes/:id", updateNotes);
router.delete("/notes/:id", deleteNotes);

module.exports = router;
