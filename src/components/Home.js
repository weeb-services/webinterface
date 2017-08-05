import React from "react";
import {Link, Route} from 'react-router-dom';
import Panel from "./Panel";
import {AppBar, Drawer, IconButton, MenuItem, RaisedButton, TextField} from "material-ui";
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationHome from 'material-ui/svg-icons/action/home'
import ImagePanel from "./Image";
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {drawerOpen: false, tokenField: ''};
        this.onAppBarOpenDrawer = this.onAppBarOpenDrawer.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.saveToken = this.saveToken.bind(this);
    }

    onAppBarOpenDrawer() {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    onTextFieldChange(event) {
        this.setState({tokenField: event.target.value});
    }

    saveToken() {
        window.localStorage.setItem('token', this.state.tokenField);
        this.setState({tokenField: ''});
    }

    render() {
        const form = () => {
            return (<div>
                <p>Save token in localStorage</p>
                <form>
                    <TextField id="token-input" value={this.state.tokenField} onChange={this.onTextFieldChange}/>
                    <RaisedButton type="button" label="Save" onClick={this.saveToken}/>
                </form>
            </div>)
        };
        return (<div>
            <AppBar title="weeb.sh api panel"
                    iconElementLeft={<IconButton onClick={this.onAppBarOpenDrawer}><NavigationMenu/></IconButton>}/>
            <Drawer docked={false} open={this.state.drawerOpen} onRequestChange={this.onAppBarOpenDrawer}>
                <AppBar title="API's"
                        iconElementLeft={<IconButton
                            onClick={this.onAppBarOpenDrawer}><NavigationClose/></IconButton>}/>
                <Link to="/"><MenuItem onClick={this.onAppBarOpenDrawer}><NavigationHome/> Home</MenuItem></Link>
                <Link to="/image"><MenuItem onClick={this.onAppBarOpenDrawer}>Image API (TOPH)</MenuItem></Link>
            </Drawer>
            <div className="content">
                <Route path="/" exact component={form}>
                </Route>
                <Route path="/panel" component={Panel}/>
                <Route path="/image" component={ImagePanel}/>
            </div>
        </div>)
    }
}
