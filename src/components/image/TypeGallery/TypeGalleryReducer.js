import {FETCH_IMAGE_TYPES, FETCH_IMAGE_TYPES_FAILURE, FETCH_IMAGE_TYPES_SUCCESS} from "./TypeGalleryActions";

const initialState = {
    types: [],
    previews: [],
    fetching: false,
    error: ''
};

export default function typeGallery(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_TYPES:
            return Object.assign({}, state, {fetching: true});
        case FETCH_IMAGE_TYPES_SUCCESS:
            return Object.assign({}, state, {types: action.types, previews: action.previews, fetching: false});
        case FETCH_IMAGE_TYPES_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        default:
            return state;
    }
}
