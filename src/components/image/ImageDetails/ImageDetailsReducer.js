import {
  DELETE_IMAGE, DELETE_IMAGE_CANCEL, DELETE_IMAGE_CONFIRM, DELETE_IMAGE_FAILURE, DELETE_IMAGE_SUCCESS,
  FETCH_IMAGE_INFO, FETCH_IMAGE_INFO_FAILURE, FETCH_IMAGE_INFO_SUCCESS
} from './ImageDetailsActions'

const initialState = {
    fetching: false,
    error: '',
  imageDetail: {},
  confirmImageDelete: false,
  imageDeleted: false
};
export default function imageDetails(state = initialState, action) {
    switch (action.type) {
        case FETCH_IMAGE_INFO:
          return Object.assign({}, state, {
            fetching: true,
            imageDetail: initialState.imageDetail,
            imageDeleted: false
          })
        case FETCH_IMAGE_INFO_SUCCESS:
          return Object.assign({}, state, {fetching: false, imageDetail: action.image, error: ''})
        case FETCH_IMAGE_INFO_FAILURE:
          return Object.assign({}, state, {fetching: false, error: action.error})
      case DELETE_IMAGE:
        return Object.assign({}, state, {confirmImageDelete: true})
      case DELETE_IMAGE_CONFIRM:
        return Object.assign({}, state, {fetching: true})
      case DELETE_IMAGE_CANCEL:
        return Object.assign({}, state, {confirmImageDelete: false})
      case DELETE_IMAGE_SUCCESS:
        return Object.assign({}, state, {
          fetching: false,
          error: '',
          confirmImageDelete: false,
          imageDetail: action.image,
          imageDeleted: true
        })
      case DELETE_IMAGE_FAILURE:
        return Object.assign({}, state, {fetching: false, error: action.error});
        default:
            return state;
    }
}
