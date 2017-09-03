import React from 'react';
import {Card, CardMedia, CardTitle} from "material-ui";
import {Link} from "react-router-dom";

const cardStyle = {margin: '10px', maxWidth: '250px', minWidth: '200px'};
export default class TypeCard extends React.Component {
    render() {
        const imgStyle = {
            backgroundImage: `url(${this.props.previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '200px'
        };
        return (<Link to={`/image/${this.props.type}`} style={cardStyle}><Card key={this.props.type} style={cardStyle}>
            <CardMedia overlay={<CardTitle title={this.props.type}/>}>
                <div style={imgStyle}/>
            </CardMedia>
        </Card></Link>)
    }
}
