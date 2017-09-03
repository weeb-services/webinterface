import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import mainReducer from './reducers/mainReducer';
import ReduxThunk from 'redux-thunk';

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(ReduxThunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Router>
                        <Route path="/" render={() => <Home endpoints={this.props.endpoints}/>}/>
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
