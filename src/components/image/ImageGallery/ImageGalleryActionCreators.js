import {
    CYCLE_NSFW, FETCH_IMAGE_CATEGORY_PAGE, FETCH_IMAGE_CATEGORY_PAGE_FAILURE, FETCH_IMAGE_CATEGORY_PAGE_SUCCESS,
    SWITCH_PAGE
} from "./ImageGalleryActions";
import axios from "axios";

export function switchPage(page) {
    return {type: SWITCH_PAGE, page};
}

export function cycleNsfw(nsfw) {
    return {type: CYCLE_NSFW, nsfw};

}

function shouldFetchImageCategoryPage(state, page, category, nsfw) {
    return state.page !== page || state.category !== category || state.nsfw !== nsfw;
}

export function fetchImageCategoryPageIfNeeded(category, page, nsfw) {
    return (dispatch, getState) => {
        if (shouldFetchImageCategoryPage(getState(), page, category, nsfw)) {
            return dispatch(fetchImageCategoryPage(category, page, nsfw))
        } else {
            return Promise.resolve();
        }
    }
}

export function fetchImageCategoryPage(category, page, nsfw) {
    return (dispatch) => {
        dispatch(requestImageCategoryPage(category, page, nsfw));
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        return axios({
            url: `${global.endpoints.image}/list`,
            headers: {Authorization: `${tokenType} ${apiToken}`},
            params: {
                page: page,
                type: category,
                nsfw,
                hidden: false
            }
        }).then(req => {
            dispatch(fetchImageCategoryPageSuccess(category, page, nsfw, req.data.images, req.data.total))
        }).catch(e => {
            dispatch(fetchImageCategoryPageFailure(e));
        });
    };
}

export function requestImageCategoryPage(category, page, nsfw) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE, category, page, nsfw};
}

export function fetchImageCategoryPageSuccess(category, page, nsfw, images, total) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE_SUCCESS, category, page, nsfw, images, total};
}

export function fetchImageCategoryPageFailure(error) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE_FAILURE, error};
}


