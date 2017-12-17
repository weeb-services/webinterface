import {
    FETCH_ACCOUNT_DETAILS, FETCH_ACCOUNT_DETAILS_FAILURE, FETCH_ACCOUNT_DETAILS_SUCCESS, FETCH_DISCORD_ACCOUNTS,
    FETCH_DISCORD_ACCOUNTS_FAILURE, FETCH_DISCORD_ACCOUNTS_SUCCESS, FETCH_DISCORD_DETAILS,
    FETCH_DISCORD_DETAILS_FAILURE, FETCH_DISCORD_DETAILS_SUCCESS, FETCH_IROH_ACCOUNTS, FETCH_IROH_ACCOUNTS_FAILURE,
    FETCH_IROH_ACCOUNTS_SUCCESS, SWITCH_PERMISSION_TYPE
} from "../../actions/accountActions";

const initialState = {
    accounts: [],
    discordAccounts: [],
    fetching: false,
    error: '',
    page: 1,
    accountDetail: {},
    discordAccount: {},
    permissionType: 'general'
};
export default function account(state = initialState, action) {
    switch (action.type) {
        case FETCH_DISCORD_ACCOUNTS:
            return Object.assign({}, state, {fetching: true, error: initialState.error});
        case FETCH_DISCORD_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {fetching: false, discordAccounts: action.accounts});
        case FETCH_DISCORD_ACCOUNTS_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        case FETCH_IROH_ACCOUNTS:
            return Object.assign({}, state, {fetching: true, page: action.page, error: initialState.error});
        case FETCH_IROH_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                accounts: action.accounts,
                total: action.total
            });
        case FETCH_IROH_ACCOUNTS_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        case FETCH_ACCOUNT_DETAILS:
            return Object.assign({}, state, {fetching: true, error: initialState.error});
        case FETCH_ACCOUNT_DETAILS_SUCCESS:
            return Object.assign({}, state, {fetching: false, accountDetail: action.account});
        case FETCH_ACCOUNT_DETAILS_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        case FETCH_DISCORD_DETAILS:
            return Object.assign({}, state, {
                fetching: true,
                discordAccount: initialState.discordAccount,
                error: initialState.error
            });
        case FETCH_DISCORD_DETAILS_SUCCESS:
            return Object.assign({}, state, {fetching: false, discordAccount: action.discordAccount});
        case FETCH_DISCORD_DETAILS_FAILURE:
            return Object.assign({}, state, {fetching: false, error: action.error});
        case SWITCH_PERMISSION_TYPE:
            return Object.assign({}, state, {permissionType: action.permissionType});
        default:
            return state;
    }
}
