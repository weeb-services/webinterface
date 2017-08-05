import React from 'react';
export default class ImageSingle extends React.Component {
    render() {
        return (<img key={this.props.id} className="image-single" src={this.props.src} alt=""/>)
    }
}
