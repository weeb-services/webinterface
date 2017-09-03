import imageReducer from './imageReducer';
import sidebarReducer from './sidebarReducer';
import {combineReducers} from 'redux';

export default combineReducers({image: imageReducer, sidebar: sidebarReducer});
