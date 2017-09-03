import React from 'react';
import {Link} from "react-router-dom";

export default class ImageSingle extends React.Component {
    render() {
        const imgStyle = {
            backgroundImage: `url(${this.props.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '200px',
            height: '200px',
            margin: '10px'
        };
        return (<Link to={`/image/details/${this.props.id}`}>
            <div key={this.props.id} className="image-single" style={imgStyle}/>
        </Link>)
    }
}
