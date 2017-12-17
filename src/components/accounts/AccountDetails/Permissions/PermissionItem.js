import React from "react";
import {Checkbox} from "material-ui";
import {connect} from "react-redux";
import {generatePermNode} from '../../../../utils/helper';

const mapStateToProps = state => {
    return {
        account: state.accounts.accountDetail
    };
};

class PermissionItem extends React.Component {
    render() {
        let cbxStyle = {display: 'inline-flex', width: 'auto', paddingRight: '5px'};
        let iconStyle = {marginRight: '2px', fill: '#3498DB'};
        let routes = [];
        for (let route of this.props.permission.routes) {
            routes.push(<li key={route}>{route}</li>)
        }
        let hasPerm = false;
        if (this.props.account && this.props.account.scopes && this.props.permission) {
            let permName = this.props.apiIdentifier === 'general' ? this.props.permission.name : generatePermNode(this.props.permission.name, this.props.apiIdentifier);
            let perm = this.props.account.scopes.find(scope => permName === scope);
            if (!perm) {
                perm = this.props.account.scopes.find(scope => this.props.apiIdentifier === scope);
            }
            hasPerm = !!perm;
        }
        return (<div className="permission full-width flex">
            <div className="perm-detail">
                <div className="perm-header">
                    <h2>{this.props.permission.name}</h2>
                    <Checkbox style={cbxStyle} iconStyle={iconStyle} label=""
                              labelStyle={{color: 'white'}} checked={hasPerm}/>
                </div>
                <p>{this.props.permission.description}</p>
                <p>Routes:</p>
                <ul>
                    {routes}
                </ul>
            </div>
        </div>)
    }
}

const ConnectedPermissionItem = connect(mapStateToProps)(PermissionItem);
export default ConnectedPermissionItem;