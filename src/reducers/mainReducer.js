import imageReducer from '../components/image/imageReducer';
import sidebarReducer from './sidebarReducer';
import accountReducer from '../components/accounts/accountReducer';
import {combineReducers} from 'redux';

export default combineReducers({image: imageReducer, sidebar: sidebarReducer, accounts: accountReducer});
