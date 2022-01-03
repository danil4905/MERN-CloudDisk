import {CONSTANTS} from "../constants/constants";

const INITIAL_STATE = {
    isVisible: false,
    files: [],
};

export default function uploadReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONSTANTS.SHOW_UPLOADER:
            return {
                ...state,
                isVisible: true,
            };
        case CONSTANTS.HIDE_UPLOADER:
            return {
                ...state,
                isVisible: false,
            };
        case CONSTANTS.ADD_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload],
            };
        case CONSTANTS.REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.filter((file) => file.id !== action.payload)],
            };
        case CONSTANTS.CHANGE_UPLOAD_FILE:
            return {
                ...state,
                files: [
                    ...state.files.map((file) =>
                        file.id === action.payload.id
                            ? {...file, progress: action.payload.progress}
                            : {...file}
                    ),
                ],
            };
        default:
            return state;
    }
}

export const showUploader = () => ({type: CONSTANTS.SHOW_UPLOADER});
export const hideUploader = () => ({type: CONSTANTS.HIDE_UPLOADER});
export const addUploadFile = (file) => ({
    type: CONSTANTS.ADD_UPLOAD_FILE,
    payload: file,
});
export const removeUploadFile = (fileId) => ({
    type: CONSTANTS.REMOVE_UPLOAD_FILE,
    payload: fileId,
});
export const changeUploadFile = (payload) => ({
    type: CONSTANTS.CHANGE_UPLOAD_FILE,
    payload: payload,
});
