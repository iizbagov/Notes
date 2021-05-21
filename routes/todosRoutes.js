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
router.put("/notes/api/v1/:id", updateNotes);
router.delete("/notes/api/v1/:id", deleteNotes);

module.exports = router;
