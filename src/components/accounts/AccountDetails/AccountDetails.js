import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchIrohAndDiscordDetails} from "../../../actionCreators/accountActionCreators";
import {CircularProgress, RaisedButton} from "material-ui";
import BlockIcon from 'material-ui/svg-icons/content/block';
import DoneIcon from 'material-ui/svg-icons/action/done';

const mapStateToProps = state => {
    return {
        account: state.accounts.accountDetail,
        fetching: state.accounts.fetching,
        discordAccount: state.accounts.discordAccount
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: (id) => {
            dispatch(fetchIrohAndDiscordDetails(id))
        }
    }
};

class AccountDetails extends React.Component {
    componentDidMount() {
        this.props.fetchAccount(this.props.id);
    }

    render() {
        let spinner;
        let activeIcon;
        if (this.props.fetching) {
            spinner = <CircularProgress/>
        }
        if (this.props.account) {
            switch (this.props.account.active) {
                case false:
                    activeIcon = <BlockIcon color="red"/>;
                    break;
                case true:
                    activeIcon = <DoneIcon color="green"/>;
                    break;
                default:
                    activeIcon = <BlockIcon color="red"/>;
                    break;
            }
        }
        const btnStyle = {margin: '10px'};
        return (<div>
            {spinner}
            <div className="flex">
                <div>
                    <img src={this.props.discordAccount.avatar} className="image-single"/>
                </div>
                <div className="image-data-wrapper">
                    <p>ID: {this.props.account.id}</p>
                    <p>Name: {this.props.account.name}</p>
                    <p>Discord ID: {this.props.account.discordUserId}</p>
                </div>
            </div>
            <div>
                <RaisedButton label="Primary" primary={true} style={btnStyle}/>
                <RaisedButton label="Primary" primary={true} style={btnStyle}/>
                <RaisedButton label="Primary" primary={true} style={btnStyle}/>
            </div>
        </div>)
    }
}

const ConnectedAccountDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetails));
export default ConnectedAccountDetails;