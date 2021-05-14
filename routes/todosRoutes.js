const express = require("express");
const router = express.Router();
const {
  getTodos,
  postNotes,
  getNotes,
  deleteNotes,
  updateNotes,
} = require("../controllers/todosController");

router.get("/", getTodos);
router.get("/notes", getNotes);
router.post("/notes:id", postNotes);
router.delete("/notes:id", deleteNotes);
router.put("/notes:id", updateNotes);

module.exports = router;
