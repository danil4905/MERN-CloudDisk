import { CONSTANTS } from "../constants/constants";

const INITIAL_STATE = {
  files: [],
  currentDir: null,
};

export default function fileReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSTANTS.SET_FILES:
      return { ...state, files: action.payload };
    case CONSTANTS.SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    default:
      return state;
  }
}

export const setFiles = (files) => ({
  type: CONSTANTS.SET_FILES,
  payload: files,
});
export const setCurrentDir = (dir) => ({
  type: CONSTANTS.SET_CURRENT_DIR,
  payload: dir,
});
