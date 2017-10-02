import React from "react";
import AccountCard from "./AccountCard";

export default class AccountList extends React.Component {
    render() {
        let cards = this.props.accounts.map(a => <AccountCard key={a.id} account={a}/>);
        return (<div className="type-gallery">{cards}</div>);
    }
}