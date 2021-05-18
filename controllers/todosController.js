const { json } = require("body-parser");
const Note = require("../models/Note");

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
  Note.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data));
}
//update
//put notes/:id
// {}

function updateNotes(req, res) {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      text: req.body.text,
    },
    { useFindAndModify: true }
  ).then((data) => res.json(data));
}

function getNotes(req, res) {
  Note.find().then((data) => {
    console.log(data);
    res.json(data);
  });
}

module.exports = {
  postNotes,
  deleteNotes,
  updateNotes,
  getNotes,
};
