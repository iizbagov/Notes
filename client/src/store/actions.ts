import { Themes } from "../components/types/enums";
import { NoteData, Action } from "../components/types/notesInterface";
import ApiService from "../api";

export async function handleNoteChanges(
  dispatch: (action: Action) => void,
  notes: Array<NoteData>,
  note: NoteData
) {
  try {
    const response = await ApiService.put(`notes/${note._id}`, {
      title: note.title,
      text: note.text,
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
          onRetry() {
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
  const response = await ApiService.get(`notes/`);
  if (response.status === 403) {
    dispatch({
      type: "AUTH_FALSE",
    });
  }
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
  await ApiService.delete(`notes/${id}`);
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
  const postData = await ApiService.post(`notes/`, {
    _id: newNote._id,
    title: newNote.title,
    text: newNote.text,
  });
  const responseData = postData.responseData;
  console.log(responseData);
  notes = [
    ...notes,
    {
      _id: responseData._id,
      title: newNote.title,
      text: newNote.text,
    },
  ];
  if (postData.response.status === 403) {
    dispatch({
      type: "AUTH_FALSE",
    });
  }
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
    const response = await ApiService.get(`users/`);
    if (response.status === 200) {
      dispatch({
        type: "AUTH_TRUE",
      });
    } else {
      dispatch({
        type: "AUTH_FALSE",
      });
    }
  } else {
    dispatch({
      type: "AUTH_FALSE",
    });
  }
}

export async function loginUser(
  dispatch: (action: Action) => void,
  username: string,
  password: string
) {
  await ApiService.post(``, {
    username: username,
    password: password,
  });

  dispatch({
    type: "AUTH_TRUE",
  });
}

export async function registerUser(username: string, password: string) {
  await ApiService.post(`registration/`, {
    username: username,
    password: password,
  });
}
