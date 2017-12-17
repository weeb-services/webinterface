import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchIrohAndDiscordDetails} from "../../../actionCreators/accountActionCreators";
import {CircularProgress, List, ListItem, RaisedButton} from "material-ui";
import BlockIcon from 'material-ui/svg-icons/content/block';
import DoneIcon from 'material-ui/svg-icons/action/done';
import './AccountDetails.css';
import PermissionList from "./Permissions/PermissionList";

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
        const imgStyle = {
            backgroundImage: `url(${this.props.discordAccount.avatar ? this.props.discordAccount.avatar : 'https://cdn.weeb.sh/404.png'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '200px'
        };
        return (<div className="flex flex-grow full-width">
            <div className="flex flex-grow half">
                {spinner}
                <div className="flex flex-grow half middle-dark-af details-wrapper">
                    <div className="flex profile">
                        <div style={imgStyle}/>
                        <div className="image-data-wrapper">
                            <p>ID: {this.props.account.id}</p>
                            <p>Name: {this.props.account.name}</p>
                            <p>Discord ID: {this.props.account.discordUserId}</p>
                            <p>Active: {activeIcon}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <RaisedButton label="Primary" primary={true} style={btnStyle}/>
                        <RaisedButton label="Primary" primary={true} style={btnStyle}/>
                        <RaisedButton label="Primary" primary={true} style={btnStyle}/>
                    </div>
                </div>
                <div className="flex flex-grow one-third middle-dark-af details-wrapper">
                    <List className="full-width">
                        <ListItem style={{color: '#ffffff'}} innerDivStyle={{textAlign: 'right'}}>Permissions</ListItem>
                        <ListItem style={{color: '#ffffff'}} innerDivStyle={{textAlign: 'right'}}>Tokens</ListItem>
                    </List>
                </div>
            </div>
            <PermissionList/>
        </div>)
    }
}

const ConnectedAccountDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetails));
export default ConnectedAccountDetails;
