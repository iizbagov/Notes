import { Themes } from "../components/types/enums";
import { InitialState, Action } from "../components/types/notesInterface";

const HANDLE_NOTE_CHANGES = "HANDLE_NOTE_CHANGES";
const NOTE_CHANGE_ERROR = "NOTE_CHANGE_ERROR";
const REMOVE_NOTE = "REMOVE_NOTE";
const GET_NOTES = "GET_NOTES";
const CREATE_NOTE = "CREATE_NOTE";
const CHANGE_THEME = "CHANGE_THEME";

export const initialState: InitialState = {
  notes: [],
  error: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
  theme: Themes.dark,
};

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case HANDLE_NOTE_CHANGES:
      if ("notes" in action && "payload" in action) {
        return {
          ...state,
          notes: action.notes,
          error: { ...action.payload },
        };
        /* falls through */
      } else {
        return {
          ...state,
        };
      }
    case NOTE_CHANGE_ERROR:
      if ("payload" in action) {
        return {
          ...state,
          error: {
            ...action.payload,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_NOTE:
      if ("notes" in action) {
        return {
          ...state,
          notes: action.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case GET_NOTES:
      if ("notes" in action) {
        return {
          ...state,
          notes: action.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case CREATE_NOTE:
      if ("notes" in action) {
        return {
          ...state,
          notes: action.notes,
        };
      } else {
        return {
          ...state,
        };
      }
    case CHANGE_THEME:
      if ("theme" in action) {
        return {
          ...state,
          theme: action.theme,
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
