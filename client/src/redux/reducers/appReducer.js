import {CONSTANTS} from "../constants/constants";

const INITIAL_STATE = {
    loader: false
}

export default function appReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSTANTS.SHOW_LOADER:
            return {...state, loader: true}
        case CONSTANTS.HIDE_LOADER:
            return {...state, loader: false}
        default:
            return state
    }
}


export const showLoader = () => ({type: CONSTANTS.SHOW_LOADER})
export const hideLoader = () => ({type: CONSTANTS.HIDE_LOADER})