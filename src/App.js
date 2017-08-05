import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <Route path="/" component={Home}/>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
