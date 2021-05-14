const Note = require("../models/Note");

function getTodos(req, res) {
  console.log(`req`, req);
  res.send("Hello");
}

//addNote
function postNotes(req, res) {
  const note = new Note({
    title: req.body.title,
    text: req.body.text,
  });

  // Note.find()

  note
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
}

//getNotes()
//delete
// app.delete('/notes/:id', () => {})
function deleteNotes(req, res) {
  Note.deleteOne({ ...req.query.id }).then((data) =>
    res.json(data).catch((err) => res.json({ message: err }))
  );
}
//update
//put notes/:id
// {}

function updateNotes(req, res) {
  const newNote = Note.updateOne(
    { ...req.query.id },
    { newTitle: { ...req.body.title }, newText: { ...req.body.text } }
  );
  newNote.then((data) =>
    res.json(data).catch((err) => res.json({ message: err }))
  );
}

function getNotes(req, res) {
  Note.find().then((data) => {
    console.log(123, data);
  });
}

module.exports = {
  getTodos,
  postNotes,
  deleteNotes,
  updateNotes,
  getNotes,
};
