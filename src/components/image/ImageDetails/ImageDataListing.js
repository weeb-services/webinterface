import React from 'react';
import Check from 'material-ui/svg-icons/action/done';
import Cross from 'material-ui/svg-icons/content/clear';
import {Chip} from "material-ui";

const tagStyle = {marginRight:'5px', backgroundColor:'#393d40'};
export default class ImageDataListing extends React.Component {
    render() {
        let tagMap = [];
        let nsfw;
        let hidden;
        if (this.props.image.hasOwnProperty('nsfw')) {
            nsfw = this.props.image.nsfw ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.hasOwnProperty('hidden')) {
            hidden = this.props.image.hidden ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.tags) {
            this.props.image.tags.forEach(t => {
                tagMap.push(<Chip style={tagStyle} labelColor="#ffffff">{t.name}</Chip>)
            });
        }
        return (<div className="image-data-wrapper">
            <p style={{marginTop: 0}}>ID: {this.props.image.id}</p>
            <p>Type: {this.props.image.baseType}</p>
            <p>Nsfw: {nsfw}</p>
            <p>Hidden: {hidden}</p>
            <p>Filetype: {this.props.image.fileType}</p>
            <p>RawUrl: <a target="_blank" href={this.props.image.url}>{this.props.image.url}</a></p>
            <div className="flex">{tagMap}</div>
        </div>)
    }
}
