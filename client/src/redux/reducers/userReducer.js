import { CONSTANTS } from "../constants/constants";

const INITIAL_STATE = {
  currentUser: {},
  isAuth: false,
};

// Reducer
export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONSTANTS.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case CONSTANTS.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    default:
      return state;
  }
}

// Action Creators
export const setUser = (user) => ({ type: CONSTANTS.SET_USER, payload: user });
export const logOut = () => ({ type: CONSTANTS.LOGOUT });
