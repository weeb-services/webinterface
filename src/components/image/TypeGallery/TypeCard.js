import React from 'react';
import {Card, CardMedia, CardTitle} from "material-ui";
import {Link} from "react-router-dom";

const cardStyle = {margin: '10px', maxWidth: '250px', minWidth: '200px'};

export default class TypeCard extends React.Component {
    render() {
        return (<Link to={`/image/${this.props.type}`} style={cardStyle}><Card key={this.props.type} style={cardStyle}>
            <CardMedia overlay={<CardTitle title={this.props.type}/>}>
                <img src={`${this.props.previewImage}`} alt={`preview image of ${this.props.type}`}/>
            </CardMedia>
        </Card></Link>)
    }
}
