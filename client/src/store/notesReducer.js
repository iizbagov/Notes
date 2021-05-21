export const initialState = {
  notes: [],
  open: false,
  payload: {
    hasError: false,
    onRetry: () => {},
    onCancel: () => {},
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "setOpen":
      return {
        ...state,
        open: action.open,
      };
    case "handleNoteChanges":
      return {
        ...state,
        notes: [...action.notes],
      };
    case "noteChangeError":
      return {
        ...state,
        payload: {
          ...action.payload,
        },
      };
    case "removeNote":
      return {
        ...state,
        notes: [...action.notes],
      };
    case "getNotes":
      return {
        ...state,
        notes: [...action.notes],
      };
    case "createNote":
      return {
        ...state,
        notes: [...action.notes],
      };
    default:
      return state;
  }
}
