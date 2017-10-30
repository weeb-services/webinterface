import React from "react";
import {Card, CardMedia, CardTitle} from "material-ui";
import {Link} from "react-router-dom";

const cardStyle = {margin: '10px', maxWidth: '250px', minWidth: '200px'};
export default class AccountCard extends React.Component {
    render() {

        let imgStyle = {
            backgroundImage: `url(${this.props.account.discord.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '200px'
        };
        return (<Link to={`/account/${this.props.account.id}`}><Card key={this.props.account.id} style={cardStyle}>
            <CardMedia overlay={<CardTitle title={this.props.account.name}
                                           subtitle={this.props.account.discord.fulluser}/>}>
                <div style={imgStyle}/>
            </CardMedia>
        </Card></Link>);
    }
}