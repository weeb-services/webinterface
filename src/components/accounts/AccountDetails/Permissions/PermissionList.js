import React from "react";
import {List, ListItem} from "material-ui";
import PermissionItem from "./PermissionItem";
import * as tophPerms from '../../perms.json';
import * as generalPerms from '../../../../structures/generalPerms.json';
import {connect} from "react-redux";
import {switchPermissionType} from "../../../../actionCreators/accountActionCreators";
import './PermissionList.css';

const mapStateToProps = state => {
    return {
        permissionType: state.accounts.permissionType
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updatePermissionType: (type) => {
            dispatch(switchPermissionType(type))
        }
    }
};

class PermissionList extends React.Component {
    render() {
        const listItemStyle = {color: '#ffffff'};
        const selectedListItemStyle = Object.assign({backgroundColor: '#2e3438'}, listItemStyle);
        let perms;
        switch (this.props.permissionType) {
            case tophPerms.apiIdentifier:
                perms = tophPerms;
                break;
            case generalPerms.apiIdentifier:
                perms = generalPerms;
                break;
            default:
                perms = generalPerms;
                break;
        }
        let permList = [];
        for (let permission of perms.permNodes) {
            permList.push(<PermissionItem key={permission.name} permission={permission}
                                          apiIdentifier={perms.apiIdentifier}/>)
        }
        return (<div className="flex half lighter-dark-af">
            <List>
                <ListItem style={this.props.permissionType === 'general' ? selectedListItemStyle : listItemStyle}
                          onClick={() => {
                              this.props.updatePermissionType('general')
                          }}>General</ListItem>
                <ListItem
                    style={this.props.permissionType === 'toph-development' ? selectedListItemStyle : listItemStyle}
                    onClick={() => {
                        this.props.updatePermissionType('toph-development')
                    }}>toph-development</ListItem>
                <ListItem style={listItemStyle}>Permissions</ListItem>
                <ListItem style={listItemStyle}>Permissions</ListItem>
                <ListItem style={listItemStyle}>Permissions</ListItem>
                <ListItem style={listItemStyle}>Permissions</ListItem>
                <ListItem style={listItemStyle}>Permissions</ListItem>
            </List>
            <div className="perm-list full-width middle-dark-af">
                {permList}
            </div>
        </div>)
    }
}

const ConnectedPermissionList = connect(mapStateToProps, mapDispatchToProps)(PermissionList);
export default ConnectedPermissionList;
