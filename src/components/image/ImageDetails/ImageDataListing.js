import React from 'react';
import Check from 'material-ui/svg-icons/action/done';
import Cross from 'material-ui/svg-icons/content/clear';

export default class ImageDataListing extends React.Component {
    render() {
        let tagMap = [];
        let nsfw;
        let hidden;
        if (this.props.image.hasOwnProperty('nsfw')) {
            nsfw = nsfw ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.hasOwnProperty('hidden')) {
            hidden = hidden ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.tags) {
            this.props.image.tags.map(t => {
                tagMap.push(<li>{t.name}</li>)
            });
        }
        return (<div>
            <ul>
                <li>ID: {this.props.image.id}</li>
                <li>Type: {this.props.image.baseType}</li>
                <li>Nsfw: {nsfw}</li>
                <li>Hidden: {hidden}</li>
                <li>Filetype: {this.props.image.fileType}</li>
                <li>RawUrl: <a target="_blank" href={this.props.image.url}>{this.props.image.url}</a></li>
                <ul>
                    {tagMap}
                </ul>
            </ul>
        </div>)
    }
}
