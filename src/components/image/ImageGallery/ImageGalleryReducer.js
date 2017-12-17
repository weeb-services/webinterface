import {
    FETCH_IMAGE_CATEGORY_PAGE, FETCH_IMAGE_CATEGORY_PAGE_FAILURE,
    FETCH_IMAGE_CATEGORY_PAGE_SUCCESS
} from "./ImageGalleryActions";

const initialState = {
    types: [],
    images: [],
    page: 1,
    fetching: false,
    error: '',
    category: '',
    nsfw: false
};

export default function imageGallery(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_CATEGORY_PAGE:
            return Object.assign({}, state, {
                fetching: true,
                page: action.page,
                category: action.category,
                nsfw: action.nsfw
            });
        case FETCH_IMAGE_CATEGORY_PAGE_SUCCESS:
            return Object.assign({}, state, {fetching: false, images: action.images, total: action.total});
        case FETCH_IMAGE_CATEGORY_PAGE_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        default:
            return state;
    }
}
