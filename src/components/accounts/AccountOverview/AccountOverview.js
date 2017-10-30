import React from 'react';
import {fetchIrohAndDiscordUsers} from "../../../actionCreators/accountActionCreators";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import AccountList from "./AccountList";
import {CircularProgress} from "material-ui";

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        fetching: state.accounts.fetching,
        page: state.accounts.page,
        discordAccounts: state.accounts.discordAccounts,
        error: state.accounts.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAccounts: (page) => {
            dispatch(fetchIrohAndDiscordUsers(page));
        }
    }
};

class AccountOverview extends React.Component {
    componentDidMount() {
        this.props.fetchAccounts(1)
    }

    render() {
        let spinner;
        let errorMessage;
        if (this.props.fetching) {
            spinner = <CircularProgress/>
        }
        if (this.props.error) {
            errorMessage = <div><p>Oh nu :( an error occured!</p><p>{this.props.error}</p></div>
        }
        let combinedAccounts = this.props.accounts;
        combinedAccounts.map(ca => {
            let discordAccount;
            if (this.props.discordAccounts && this.props.discordAccounts.length > 0) {
                discordAccount = this.props.discordAccounts.find(da => da.id === ca.discordUserId);
            }
            ca.discord = {};
            if (discordAccount) {
                Object.assign(ca.discord, discordAccount);
            } else {
                Object.assign(ca.discord, {avatar: 'https://cdn.weeb.sh/404.png', fulluser: 'User not in Guild'})
            }
            return ca;
        });
        return (<div>
            <h2>Account List</h2>
            {spinner}
            {errorMessage}
            <AccountList accounts={combinedAccounts}/>
        </div>)
    }
}

const ConnectedAccountOverview = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOverview));
export default ConnectedAccountOverview;