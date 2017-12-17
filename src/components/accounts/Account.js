import React from 'react';
import {Route} from "react-router-dom";
import AccountOverview from './AccountOverview/AccountOverview';
import AccountDetails from "./AccountDetails/AccountDetails";

export default class AccountPanel extends React.Component {
    render() {
        return (<div className="flex flex-grow flex-column">
            <Route path="/account" exact component={AccountOverview}/>
            <Route path="/account/:id" exact component={({match}) => <AccountDetails id={match.params.id}/>}/>
        </div>)
    }
}
