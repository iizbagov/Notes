const URL = process.env.PUBLIC_URL || "http://localhost:5000";

export function handleNoteChanges(notes, note) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${URL}/api/v1/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          title: note.title,
          text: note.text,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        notes = notes.map((note) => {
          if (note._id === responseData._id) {
            return { ...responseData };
          } else {
            return note;
          }
        });
        dispatch({
          type: "handleNoteChanges",
          notes,
        });
      }
    } catch (err) {
      alert(err);
      dispatch({
        type: "handleNoteChanges",
        notes,
      });
    }
  };
}

export function setOpen(newValue) {
  return function (dispatch) {
    dispatch({
      type: "setOpen",
      open: newValue,
    });
  };
}

export function getNotes() {
  return async function (dipatch) {
    const response = await fetch(`${URL}/api/v1/`, {
      method: "GET",
    });
    const responseData = await response.json();
    dipatch({
      type: "getNotes",
      notes: responseData,
    });
  };
}
export function removeNote(notes, id) {
  return async function (dispatch) {
    await fetch(`${URL}/api/v1/notes/${id}`, {
      method: "DELETE",
    });
    notes.filter((note) => note._id !== id);
    dispatch({
      type: "removeNote",
      notes,
    });
  };
}

export function createNote(notes, newNote) {
  return async function (dispatch) {
    const response = await fetch(`${URL}/api/v1/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        title: newNote.title,
        text: newNote.text,
      }),
    });
    const responseData = await response.json();
    notes = [
      ...notes,
      {
        _id: responseData._id,
        title: newNote.title,
        text: newNote.text,
      },
    ];
    console.log(notes);
    dispatch({
      type: "createNote",
      notes,
    });
  };
}
