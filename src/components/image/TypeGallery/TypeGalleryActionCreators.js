import axios from "axios";
import {FETCH_IMAGE_TYPES, FETCH_IMAGE_TYPES_FAILURE, FETCH_IMAGE_TYPES_SUCCESS} from "./TypeGalleryActions";

export function fetchTypeGallery() {
    return (dispatch) => {
        dispatch(requestTypeGallery());
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        return axios({
            url: `${global.endpoints.image}/types`,
            headers: {Authorization: `${tokenType} ${apiToken}`},
            params: {
                preview: true
            }
        }).then(req => {
            dispatch(fetchTypeGallerySuccess(req.data.types, req.data.preview));
        }).catch(e => {
            dispatch(fetchTypeGalleryFailure(e))
        })
    }
}

export function requestTypeGallery() {
    return {type: FETCH_IMAGE_TYPES}
}

export function fetchTypeGallerySuccess(types, previews) {
    return {type: FETCH_IMAGE_TYPES_SUCCESS, types, previews};
}

export function fetchTypeGalleryFailure(error) {
    return {type: FETCH_IMAGE_TYPES_FAILURE, error};
}
