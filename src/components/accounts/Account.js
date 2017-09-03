import React from 'react';
import {Route} from "react-router-dom";
import AccountOverview from './AccountOverview/AccountOverview';

export default class AccountPanel extends React.Component {
    render() {
        return (<div className="flex">
            <Route path="/account" component={AccountOverview}/>
        </div>)
    }
}
