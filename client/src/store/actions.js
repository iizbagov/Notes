const URL = process.env.PUBLIC_URL || "http://localhost:5000";

export async function handleNoteChanges(dispatch, notes, note) {
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
        type: "HANDLE-NOTE-CHANGES",
        notes,
        error: {
          hasError: false,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "NOTE-CHANGE-ERROR",
      error: {
        hasError: true,
        async onRetry() {
          handleNoteChanges(dispatch, notes, note);
        },
        onCancel() {
          dispatch({
            type: "NOTE-CHANGE-ERROR",
            error: {
              hasError: false,
            },
          });
        },
      },
    });
  }
}

export function setOpen(dispatch, newValue) {
  dispatch({
    type: "SET-OPEN",
    open: newValue,
  });
}

export async function getNotes(dispatch) {
  const response = await fetch(`${URL}/api/v1/`, {
    method: "GET",
  });
  const responseData = await response.json();
  dispatch({
    type: "GET-NOTES",
    notes: responseData,
  });
}
export async function removeNote(dispatch, notes, id) {
  await fetch(`${URL}/api/v1/notes/${id}`, {
    method: "DELETE",
  });
  notes.filter((note) => note._id === id);
  dispatch({
    type: "REMOVE-NOTE",
    notes,
  });
}

export async function createNote(dispatch, notes, newNote) {
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
    type: "CREATE-NOTE",
    notes,
  });
}
