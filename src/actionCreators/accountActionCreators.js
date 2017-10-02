import {
    FETCH_DISCORD_ACCOUNTS, FETCH_DISCORD_ACCOUNTS_FAILURE, FETCH_DISCORD_ACCOUNTS_SUCCESS, FETCH_IROH_ACCOUNTS,
    FETCH_IROH_ACCOUNTS_FAILURE,
    FETCH_IROH_ACCOUNTS_SUCCESS
} from "../actions/accountActions";
import axios from "axios";

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
            if (e) {
                dispatch(fetchAccountsIrohFailure(e));
            }
        });
    }
}

export function fetchAccountsDiscord() {
    return (dispatch) => {
        dispatch(requestAccountsDiscord());
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        return axios({
            url: `${global.endpoints.discordData}/users`,
            headers: {Authorization: `${tokenType} ${apiToken}`}
        }).then(req => {
            dispatch(fetchAccountsDiscordSuccess(req.data.users));
        }).catch(e => {
            if (e) {
                dispatch(fetchAccountsDiscordFailure(e));
            }
        });
    }
}