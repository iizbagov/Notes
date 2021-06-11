const { json } = require("body-parser");
const Note = require("../models/Note");
const User = require("../models/User");

//addNote
function postNotes(req, res) {
  const note = new Note({
    title: req.body.title,
    text: req.body.text,
  });

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

function deleteNotes(req, res) {
  Note.findOneAndDelete({ _id: req.params.id }).then((data) => res.json(data));
}

function updateNotes(req, res) {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      text: req.body.text,
    },
    { useFindAndModify: true }
  ).then((value) => {
    console.log(`value`, value);
    Note.findById(req.params.id).then((note) => {
      console.log("log", note);
      res.json(note);
    });
  });
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
