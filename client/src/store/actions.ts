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

export async function getUser(dispatch: (action: Action) => void) {
  const token = window.localStorage.getItem("token");
  if (token) {
    fetch(`${URL}/api/v1/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "CHANGE_TOKEN",
      payload: {
        token: token!,
      },
    });
  } else {
    dispatch({
      type: "CHANGE_TOKEN",
      payload: {
        token: "",
      },
    });
  }
}

export async function loginUser(
  dispatch: (action: Action) => void,
  username: string,
  password: string
) {
  const response = fetch(`${URL}/api/v1/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const responseData = await (await response).json();
  const token = responseData.token;
  window.localStorage.setItem("token", token);
  dispatch({
    type: "CHANGE_TOKEN",
    payload: {
      token,
    },
  });
}

export async function registerUser(username: string, password: string) {
  const response = fetch(`${URL}/api/v1/registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const responseData = await (await response).json();
  console.log(responseData);
}
