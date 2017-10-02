import {
    CYCLE_NSFW,
    FETCH_IMAGE_CATEGORY_PAGE,
    FETCH_IMAGE_CATEGORY_PAGE_FAILURE,
    FETCH_IMAGE_CATEGORY_PAGE_SUCCESS,
    FETCH_IMAGE_INFO,
    FETCH_IMAGE_INFO_FAILURE,
    FETCH_IMAGE_INFO_SUCCESS,
    SWITCH_PAGE
} from "../actions/imageActions";
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
                nsfw
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

export function fetchImageDetail(id) {
    return (dispatch) => {
        dispatch(requestImageDetail(id));
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        return axios({
            url: `${global.endpoints.image}/info/${id}`,
            headers: {Authorization: `${tokenType} ${apiToken}`}
        }).then(req => {
            dispatch(fetchImageDetailSuccess(req.data))
        }).catch(e => {
            dispatch(fetchImageDetailError(e));
        });
    }
}

export function requestImageDetail(id) {
    return {type: FETCH_IMAGE_INFO, id};
}

export function fetchImageDetailSuccess(image) {
    return {type: FETCH_IMAGE_INFO_SUCCESS, image};
}

export function fetchImageDetailError(error) {
    return {type: FETCH_IMAGE_INFO_FAILURE, error};
}
