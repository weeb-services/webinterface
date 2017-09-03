import {
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

function shouldFetchImageCategoryPage(state, page, category) {
    return state.page !== page || state.category !== category;
}

export function fetchImageCategoryPageIfNeeded(category, page) {
    return (dispatch, getState) => {
        if (shouldFetchImageCategoryPage(getState(), page, category)) {
            return dispatch(fetchImageCategoryPage(category, page))
        } else {
            return Promise.resolve();
        }
    }
}

export function fetchImageCategoryPage(category, page) {
    return (dispatch) => {
        dispatch(requestImageCategoryPage(category, page));
        return axios({
            url: `${global.endpoints.image}/list`,
            headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`},
            params: {
                page: page,
                type: category,
                nsfw: false
            }
        }).then(req => {
            dispatch(fetchImageCategoryPageSuccess(category, page, req.data.images, req.data.total))
        }).catch(e => {
            dispatch(fetchImageCategoryPageFailure(e));
        });
    };
}

export function requestImageCategoryPage(category, page) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE, category, page};
}

export function fetchImageCategoryPageSuccess(category, page, images, total) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE_SUCCESS, category, page, images, total};
}

export function fetchImageCategoryPageFailure(error) {
    return {type: FETCH_IMAGE_CATEGORY_PAGE_FAILURE, error};
}

export function fetchImageDetail(id) {
    return (dispatch) => {
        dispatch(requestImageDetail(id));
        return axios({
            url: `${global.endpoints.image}/info/${id}`,
            headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`}
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
