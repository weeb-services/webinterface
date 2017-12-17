import {
    FETCH_ACCOUNT_DETAILS, FETCH_ACCOUNT_DETAILS_FAILURE, FETCH_ACCOUNT_DETAILS_SUCCESS, FETCH_DISCORD_ACCOUNTS,
    FETCH_DISCORD_ACCOUNTS_FAILURE, FETCH_DISCORD_ACCOUNTS_SUCCESS, FETCH_DISCORD_DETAILS,
    FETCH_DISCORD_DETAILS_FAILURE, FETCH_DISCORD_DETAILS_SUCCESS, FETCH_IROH_ACCOUNTS, FETCH_IROH_ACCOUNTS_FAILURE,
    FETCH_IROH_ACCOUNTS_SUCCESS, SWITCH_PERMISSION_TYPE
} from "../actions/accountActions";
import axios from "axios";
import {getAuthString} from "../utils/helper";

export function requestAccountsIroh(page) {
    return {type: FETCH_IROH_ACCOUNTS, page};
}

export function fetchAccountsIrohSuccess(accounts, page) {
    return {type: FETCH_IROH_ACCOUNTS_SUCCESS, accounts, page};
}

export function fetchAccountsIrohFailure(error) {
    return {type: FETCH_IROH_ACCOUNTS_FAILURE, error};
}

export function requestAccountsDiscord() {
    return {type: FETCH_DISCORD_ACCOUNTS};
}

export function fetchAccountsDiscordSuccess(accounts) {
    return {type: FETCH_DISCORD_ACCOUNTS_SUCCESS, accounts};
}

export function fetchAccountsDiscordFailure(error) {
    return {type: FETCH_DISCORD_ACCOUNTS_FAILURE, error};
}

export function requestAccountDetails() {
    return {type: FETCH_ACCOUNT_DETAILS};
}

export function fetchAccountDetailsSuccess(account) {
    return {type: FETCH_ACCOUNT_DETAILS_SUCCESS, account};
}

export function fetchAccountDetailsFailure(error) {
    return {type: FETCH_ACCOUNT_DETAILS_FAILURE, error};
}

export function requestDiscordDetails() {
    return {type: FETCH_DISCORD_DETAILS};
}

export function fetchDiscordDetailsSuccess(account) {
    return {type: FETCH_DISCORD_DETAILS_SUCCESS, discordAccount: account};
}

export function fetchDiscordDetailsFailure(error) {
    return {type: FETCH_DISCORD_DETAILS_FAILURE, error};
}

export function switchPermissionType(type) {
    return {type: SWITCH_PERMISSION_TYPE, permissionType: type};
}

export function fetchAccountsIroh(page) {
    return (dispatch) => {
        dispatch(requestAccountsIroh(page));
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        return axios({
            url: `${global.endpoints.apiAccount}/user`,
            headers: {Authorization: `${tokenType} ${apiToken}`}
        }).then(req => {
            dispatch(fetchAccountsIrohSuccess(req.data.accounts, page));
        }).catch(e => {
            dispatch(fetchAccountsIrohFailure(e));
        });
    }
}

export function fetchAccountsDiscord() {
    return (dispatch) => {
        dispatch(requestAccountsDiscord());
        return axios({
            url: `${global.endpoints.discordData}/users`,
            headers: {Authorization: getAuthString()}
        }).then(req => {
            dispatch(fetchAccountsDiscordSuccess(req.data.users));
        }).catch(e => {
            dispatch(fetchAccountsDiscordFailure(e));
        });
    }
}

export function fetchAccountDetails(accountId) {
    return (dispatch) => {
        dispatch(requestAccountDetails(accountId));
        return axios({
            url: `${global.endpoints.apiAccount}/user/${accountId}`,
            headers: {Authorization: getAuthString()}
        }).then(req => {
            dispatch(fetchAccountDetailsSuccess(req.data.account));
        }).catch(e => {
            dispatch(fetchAccountDetailsFailure(e));
        });
    }
}

export function fetchDiscordDetails(discordId) {
    return (dispatch) => {
        dispatch(requestDiscordDetails());
        return axios({
            url: `${global.endpoints.discordData}/users/${discordId}`,
            headers: {Authorization: getAuthString()}
        }).then(req => {
            return dispatch(fetchDiscordDetailsSuccess(req.data.user));
        }).catch(e => {
            dispatch(fetchDiscordDetailsFailure(e));
        });
    }
}

export function fetchIrohAndDiscordUsers(page) {
    return (dispatch) => {
        dispatch(fetchAccountsIroh(page)).then(() => {
            return dispatch(fetchAccountsDiscord());
        });
    }
}

export function fetchIrohAndDiscordDetails(userId) {
    return (dispatch, getState) => {
        dispatch(fetchAccountDetails(userId)).then(() => {
            let user = getState().accounts.accountDetail;
            return dispatch(fetchDiscordDetails(user.discordUserId));
        });
    }
}
