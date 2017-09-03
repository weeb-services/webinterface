import React from 'react';
import ImageSingle from './ImageSingle';

export default class ImageList extends React.Component {
    render() {
        let nodes = this.props.images.map(i => {
            return <ImageSingle key={i.id} id={i.id} src={i.url} />
        });
        return (
            <div className="image-list">{nodes}</div>
        );
    }
}
