import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import uploadReducer from './uploadReducer';
import appReducer from "./appReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer,
  app: appReducer
});