import React from 'react'
import TypeCard from './TypeCard'

export default class TypeCardList extends React.Component {
    mapPreviewToType(types, previews) {
      types = types.sort()
        return types.map(type => {
            let typeObject = {name: type};
            typeObject.preview = previews.find(preview => preview.baseType === type).url;
            return typeObject;
        });
    }

    render() {
        let types = this.mapPreviewToType(this.props.types, this.props.previews);
        let cards = types.map(t => <TypeCard key={t.name} type={t.name} previewImage={t.preview}/>);
        return (<div className="type-gallery">{cards}</div>);
    }
}
