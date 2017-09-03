import {TOGGLE_SIDEBAR} from "../actions/sidebarActions";

const initialState = {
    drawerOpen: false
};

export default function sidebar(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return Object.assign({}, state, {drawerOpen: !state.drawerOpen});
        default:
            return state;
    }
}
