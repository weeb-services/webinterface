import imageReducer from './imageReducer';
import sidebarReducer from './sidebarReducer';
import accountReducer from './accountReducer';
import {combineReducers} from 'redux';

export default combineReducers({image: imageReducer, sidebar: sidebarReducer, accounts: accountReducer});
