import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
});