import { Themes } from "../components/types/enums";
import { InitialState, Action } from "../components/types/notesInterface";

const HANDLE_NOTE_CHANGES = "HANDLE_NOTE_CHANGES";
const NOTE_CHANGE_ERROR = "NOTE_CHANGE_ERROR";
const REMOVE_NOTE = "REMOVE_NOTE";
const GET_NOTES = "GET_NOTES";
const CREATE_NOTE = "CREATE_NOTE";
const CHANGE_THEME = "CHANGE_THEME";
const CHANGE_IN_STATE = "CHANGE_IN_STATE";

export const initialState: InitialState = {
  notes: [],
  error: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
  theme: window.localStorage.getItem("theme") || Themes.light,
  isIn: true,
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case HANDLE_NOTE_CHANGES:
      if ("notes" in action.payload && "error" in action.payload) {
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
      if ("error" in action.payload) {
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
      if ("notes" in action.payload) {
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
      if ("notes" in action.payload) {
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
      if ("notes" in action.payload) {
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
      if ("theme" in action.payload) {
        return {
          ...state,
          theme: action.payload.theme,
        };
      } else {
        return {
          ...state,
        };
      }
    case CHANGE_IN_STATE:
      if ("isIn" in action.payload) {
        return {
          ...state,
          isIn: action.payload.isIn,
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
}
