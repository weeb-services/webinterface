import {
    FETCH_IMAGE_CATEGORY_PAGE,
    FETCH_IMAGE_CATEGORY_PAGE_FAILURE,
    FETCH_IMAGE_CATEGORY_PAGE_SUCCESS,
    FETCH_IMAGE_INFO,
    FETCH_IMAGE_INFO_FAILURE,
    FETCH_IMAGE_INFO_SUCCESS
} from "../actions/imageActions";

const initialState = {
    types: [],
    images: [],
    page: 1,
    fetching: false,
    error: '',
    category: '',
    imageDetail: {}
};

export default function image(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_CATEGORY_PAGE:
            return Object.assign({}, state, {fetching: true, page: action.page, category: action.category});
        case FETCH_IMAGE_CATEGORY_PAGE_SUCCESS:
            return Object.assign({}, state, {fetching: false, images: action.images, total: action.total});
        case FETCH_IMAGE_CATEGORY_PAGE_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
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
