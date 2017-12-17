import {FETCH_IMAGE_INFO, FETCH_IMAGE_INFO_FAILURE, FETCH_IMAGE_INFO_SUCCESS} from "./ImageDetailsActions";

const initialState = {
    fetching: false,
    error: '',
    imageDetail: {}
};
export default function imageDetails(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_INFO:
            return Object.assign({}, state, {fetching: true, imageDetail: initialState.imageDetail});
        case FETCH_IMAGE_INFO_SUCCESS:
            return Object.assign({}, state, {fetching: false, imageDetail: action.image});
        case FETCH_IMAGE_INFO_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        default:
            return state;
    }
}
