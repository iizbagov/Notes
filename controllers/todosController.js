const { json } = require("body-parser");
const Note = require("../models/Note");
const User = require("../models/User");

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
  ).then((value) => {
    console.log(`value`, value);
    Note.findById(req.params.id).then((note) => {
      console.log("log", note);
      res.json(note);
    });
  });

  function hash(text) {
    return crypto.createHash("sha1").update(text).digest("base64");
  }

  // addUser
  function addUser(req, res) {
    const user = new User({
      username: req.body.username,
      password: hash(req.body.password),
    });
  }
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
