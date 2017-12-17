import {FETCH_IMAGE_INFO, FETCH_IMAGE_INFO_FAILURE, FETCH_IMAGE_INFO_SUCCESS} from "./ImageDetailsActions";
import axios from "axios/index";

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
