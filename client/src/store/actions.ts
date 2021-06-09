import { Themes } from "../components/types/enums";
import { NoteData, Action } from "../components/types/notesInterface";

const URL = process.env.PUBLIC_URL || "http://localhost:5000";

export async function handleNoteChanges(
  dispatch: (action: Action) => void,
  notes: Array<NoteData>,
  note: NoteData
) {
  try {
    const response = await fetch(`${URL}/api/v1/notes/${note._id}`, {
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
        type: "HANDLE_NOTE_CHANGES",
        payload: {
          notes,
          error: {
            hasError: false,
            onRetry: () => {},
            onCancel: () => {},
          },
        },
      });
    }
  } catch (err) {
    dispatch({
      type: "NOTE_CHANGE_ERROR",

      payload: {
        notes,
        error: {
          hasError: true,
          async onRetry() {
            handleNoteChanges(dispatch, notes, note);
          },
          onCancel() {
            dispatch({
              type: "NOTE_CHANGE_ERROR",
              payload: {
                notes,
                error: {
                  hasError: false,
                  onRetry: () => {},
                  onCancel: () => {},
                },
              },
            });
          },
        },
      },
    });
  }
}

export async function getNotes(dispatch: (action: Action) => void) {
  const response = await fetch(`${URL}/api/v1/`, {
    method: "GET",
  });
  const responseData = await response.json();
  dispatch({
    type: "GET_NOTES",
    payload: { notes: responseData },
  });
}
export async function removeNote(
  dispatch: (action: Action) => void,
  notes: Array<NoteData>,
  id: string
) {
  await fetch(`${URL}/api/v1/notes/${id}`, {
    method: "DELETE",
  });
  notes.filter((note) => note._id === id);
  dispatch({
    type: "REMOVE_NOTE",
    payload: { notes },
  });
}

export async function createNote(
  dispatch: (action: Action) => void,
  notes: Array<NoteData>,
  newNote: NoteData
) {
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
    type: "CREATE_NOTE",
    payload: { notes },
  });
}

export function themeToggler(
  dispatch: (action: Action) => void,
  theme: Themes.light | Themes.dark
) {
  dispatch({
    type: "CHANGE_THEME",
    payload: { theme },
  });
}
