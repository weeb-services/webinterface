import {combineReducers} from "redux";
import imageDetails from "./ImageDetails/ImageDetailsReducer";
import imageGallery from "./ImageGallery/ImageGalleryReducer";
import typeGallery from "./TypeGallery/TypeGalleryReducer";

export default combineReducers({gallery: imageGallery, typeGallery: typeGallery, details: imageDetails})
