import { Themes } from "../components/types/enums";
import { InitialState, Action } from "../components/types/notesInterface";

const HANDLE_NOTE_CHANGES = "HANDLE_NOTE_CHANGES";
const NOTE_CHANGE_ERROR = "NOTE_CHANGE_ERROR";
const REMOVE_NOTE = "REMOVE_NOTE";
const GET_NOTES = "GET_NOTES";
const CREATE_NOTE = "CREATE_NOTE";
const CHANGE_THEME = "CHANGE_THEME";
const AUTH_FALSE = "AUTH_FALSE";
const AUTH_TRUE = "AUTH_TRUE";

export const initialState: InitialState = {
  notes: [],
  error: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
  theme: window.localStorage.getItem("theme") || Themes.light,
  isAuthenticated: true,
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case HANDLE_NOTE_CHANGES:
      if (
        "payload" in action &&
        "notes" in action.payload &&
        "error" in action.payload
      ) {
        return {
          ...state,
          notes: action.payload.notes,
          error: { ...action.payload.error },
        };
      } else {
        return {
          ...state,
        };
      }
    case NOTE_CHANGE_ERROR:
      if ("payload" in action && "error" in action.payload) {
        return {
          ...state,
          error: {
            ...action.payload.error,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_NOTE:
      if ("payload" in action && "notes" in action.payload) {
        return {
          ...state,
          notes: action.payload.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case GET_NOTES:
      if ("payload" in action && "notes" in action.payload) {
        return {
          ...state,
          notes: action.payload.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case CREATE_NOTE:
      if ("payload" in action && "notes" in action.payload) {
        return {
          ...state,
          notes: action.payload.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case CHANGE_THEME:
      if ("payload" in action && "theme" in action.payload) {
        return {
          ...state,
          theme: action.payload.theme,
        };
      } else {
        return {
          ...state,
        };
      }
    case AUTH_TRUE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTH_FALSE:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
