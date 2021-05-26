const URL = process.env.PUBLIC_URL || "http://localhost:5000";

export async function handleNoteChanges(dispatch, args) {
  let [notes, note] = args;
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
        payload: {
          hasError: false,
        },
        isSaved: true,
      });
    }
  } catch (err) {
    dispatch({
      type: "noteChangeError",
      payload: {
        hasError: true,
        async onRetry() {
          handleNoteChanges(dispatch, args);
        },
        onCancel() {
          dispatch({
            type: "noteChangeError",
            payload: {
              hasError: false,
            },
          });
        },
      },
    });
  }
}

export function setOpen(dispatch, args) {
  const [newValue] = args;
  dispatch({
    type: "setOpen",
    open: newValue,
  });
}

export async function getNotes(dispatch) {
  const response = await fetch(`${URL}/api/v1/`, {
    method: "GET",
  });
  const responseData = await response.json();
  dispatch({
    type: "getNotes",
    notes: responseData,
  });
}
export async function removeNote(dispatch, args) {
  const [notes, id] = args;
  await fetch(`${URL}/api/v1/notes/${id}`, {
    method: "DELETE",
  });
  notes.filter((note) => note._id !== id);
  dispatch({
    type: "removeNote",
    notes,
  });
}

export async function createNote(dispatch, args) {
  let [notes, newNote] = args;
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
  dispatch({
    type: "createNote",
    notes,
  });
}
