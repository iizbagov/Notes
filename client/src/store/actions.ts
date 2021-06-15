import { Themes } from "../components/types/enums";
import { NoteData, Action } from "../components/types/notesInterface";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.PUBLIC_URL
    : "http://localhost:5000";

export async function handleNoteChanges(
  dispatch: (action: Action) => void,
  notes: Array<NoteData>,
  note: NoteData
) {
  try {
    const token = window.localStorage.getItem("token");
    const response = await fetch(`${URL}/api/v1/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${token}`,
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
  const token = window.localStorage.getItem("token");
  const response = await fetch(`${URL}/api/v1/notes/`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
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
  const token = window.localStorage.getItem("token");
  await fetch(`${URL}/api/v1/notes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
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
  const token = window.localStorage.getItem("token");
  const response = await fetch(`${URL}/api/v1/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${token}`,
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

export async function getUser(dispatch: (action: Action) => void) {
  const token = window.localStorage.getItem("token");
  console.log(token);
  if (token) {
    try {
      const response = await fetch(`${URL}/api/v1/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.status, "here");
        dispatch({
          type: "CHANGE_IN_STATE",
          payload: {
            isIn: true,
          },
        });
      } else {
        dispatch({
          type: "CHANGE_IN_STATE",
          payload: {
            isIn: false,
          },
        });
      }
    } catch {
      dispatch({
        type: "CHANGE_IN_STATE",
        payload: {
          isIn: false,
        },
      });
    }
  } else {
    dispatch({
      type: "CHANGE_IN_STATE",
      payload: {
        isIn: false,
      },
    });
  }
}

export async function loginUser(
  dispatch: (action: Action) => void,
  username: string,
  password: string
) {
  const response = await fetch(`${URL}/api/v1/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const responseData = await response.json();
  const token = responseData.token;
  window.localStorage.setItem("token", token);
  dispatch({
    type: "CHANGE_IN_STATE",
    payload: {
      isIn: true,
    },
  });
}

export async function registerUser(
  dispatch: (action: Action) => void,
  username: string,
  password: string
) {
  const response = await fetch(`${URL}/api/v1/registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}
