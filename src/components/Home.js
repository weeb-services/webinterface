import React from "react";
import {Link, Route, withRouter} from 'react-router-dom';
import Panel from "./Panel";
import {AppBar, Checkbox, Drawer, IconButton, MenuItem, RaisedButton, TextField} from "material-ui";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationHome from 'material-ui/svg-icons/action/home'
import ImageIcon from 'material-ui/svg-icons/image/image';
import FaceIcon from 'material-ui/svg-icons/action/face';
import ImagePanel from "./image/Image";
import AccountPanel from "./accounts/Account";
import {toggleSidebar} from "../actionCreators/sidebarActionCreators";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {drawerOpen: state.sidebar.drawerOpen}
};
const mapDispatchToProps = dispatch => {
    return {onAppBarOpenDrawer: () => dispatch(toggleSidebar())}
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tokenField: '', wolkeToken: false};
        global.endpoints = this.props.endpoints;
        this.onAppBarOpenDrawer = this.onAppBarOpenDrawer.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        this.saveToken = this.saveToken.bind(this);
    }

    onAppBarOpenDrawer() {
        this.props.onAppBarOpenDrawer();
    }

    onTextFieldChange(event) {
        this.setState({tokenField: event.target.value});
    }

    onCheckBoxChange() {
        this.setState({wolkeToken: !this.state.wolkeToken});
    }

    saveToken() {
        window.localStorage.setItem('token', this.state.tokenField);
        window.localStorage.setItem('tokenType', this.state.wolkeToken ? 'Wolke' : 'Bearer');
        this.setState({tokenField: '', wolkeToken: false});
    }

    render() {
        let cbxStyle = {display: 'inline-flex', width: 'auto', paddingRight: '5px'};
        let iconStyle = {marginRight: '2px'};
        const form = () => {
            return (<div>
                <p>Save token in localStorage</p>
                <form>
                    <div className="flex">
                        <TextField id="token-input" value={this.state.tokenField} onChange={this.onTextFieldChange}/>
                        <Checkbox label="Wolketoken" checked={this.state.wolkeToken} onCheck={this.onCheckBoxChange}
                                  labelStyle={{color: 'white'}} style={cbxStyle} iconStyle={iconStyle} />
                    </div>
                    <RaisedButton type="button" label="Save" onClick={this.saveToken}/>
                </form>
            </div>)
        };
        return (<div>
            <AppBar title="weeb.sh api panel"
                    style={{backgroundColor: '#393d40'}}
                    iconElementLeft={<IconButton onClick={this.onAppBarOpenDrawer}><NavigationMenu/></IconButton>}/>
            <Drawer docked={false} open={this.props.drawerOpen} onRequestChange={this.onAppBarOpenDrawer}
                    containerStyle={{backgroundColor: '#393d40'}}>
                <AppBar title="API's"
                        style={{backgroundColor: '#393d40'}}
                        iconElementLeft={<IconButton
                            onClick={this.onAppBarOpenDrawer}><NavigationClose/></IconButton>}/>
                <Link to="/">
                    <MenuItem style={{color: 'white'}} onClick={this.onAppBarOpenDrawer}><NavigationHome/>
                        Home
                    </MenuItem>
                </Link>
                <Link to="/image">
                    <MenuItem style={{color: 'white'}} onClick={this.onAppBarOpenDrawer}><ImageIcon/>
                        Image API
                        (TOPH)
                    </MenuItem>
                </Link>
                <Link to="/account">
                    <MenuItem style={{color: 'white'}} onClick={this.onAppBarOpenDrawer}><FaceIcon/>
                        Account API
                        (IROH)
                    </MenuItem>
                </Link>
            </Drawer>
            <div className="content dark-af">
                <Route path="/" exact component={form}/>
                <Route path="/panel" component={Panel}/>
                <Route path="/image" component={ImagePanel}/>
                <Route path="/account" component={AccountPanel}/>
            </div>
        </div>)
    }
}

const ConnectedHome = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
export default ConnectedHome
