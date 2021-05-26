const SET_OPEN = "SET-OPEN";
const HANDLE_NOTE_CHANGES = "HANDLE-NOTE-CHANGES";
const NOTE_CHANGE_ERROR = "NOTE-CHANGE-ERROR";
const REMOVE_NOTE = "REMOVE-NOTE";
const GET_NOTES = "GET-NOTES";
const CREATE_NOTE = "CREATE-NOTE";
const SAVE = "SAVE";

export const initialState = {
  notes: [],
  error: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN:
      return {
        ...state,
        open: action.open,
      };
    case HANDLE_NOTE_CHANGES:
      return {
        ...state,
        notes: [...action.notes],
        error: { ...action.error },
        isSaved: action.isSaved,
      };
    case NOTE_CHANGE_ERROR:
      return {
        ...state,
        error: {
          ...action.error,
        },
      };
    case REMOVE_NOTE:
      return {
        ...state,
        notes: [...action.notes],
      };
    case GET_NOTES:
      return {
        ...state,
        notes: [...action.notes],
      };
    case CREATE_NOTE:
      return {
        ...state,
        notes: [...action.notes],
      };
    case SAVE:
      return {
        ...state,
        isSaved: action.isSaved,
      };
    default:
      return state;
  }
}
