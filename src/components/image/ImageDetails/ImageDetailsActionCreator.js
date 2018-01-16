import {
  DELETE_IMAGE, DELETE_IMAGE_CANCEL, DELETE_IMAGE_CONFIRM, DELETE_IMAGE_FAILURE, DELETE_IMAGE_SUCCESS,
  FETCH_IMAGE_INFO, FETCH_IMAGE_INFO_FAILURE, FETCH_IMAGE_INFO_SUCCESS
} from './ImageDetailsActions'
import axios from 'axios/index'

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

export function requestImageDelete (id) {
  return {type: DELETE_IMAGE, id}
}

export function imageDelete (id) {
  return {type: DELETE_IMAGE_CONFIRM, id}
}

export function imageDeleteSuccess (data) {
  return {type: DELETE_IMAGE_SUCCESS, image: data.image}
}

export function imageDeleteError (error) {
  return {type: DELETE_IMAGE_FAILURE, error}
}

export function imageDeleteCancel (id) {
  return {type: DELETE_IMAGE_CANCEL, id}
}

export function confirmImageDelete (id) {
  return (dispatch) => {
    dispatch(imageDelete(id))
    let tokenType = window.localStorage.getItem('tokenType') || 'Bearer'
    let apiToken = window.localStorage.getItem('token')
    return axios({
      url: `${global.endpoints.image}/info/${id}`,
      headers: {Authorization: `${tokenType} ${apiToken}`},
      method: 'delete'
    }).then(req => {
      dispatch(imageDeleteSuccess(req.data))
    }).catch(e => {
      dispatch(imageDeleteError(e))
    })
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
