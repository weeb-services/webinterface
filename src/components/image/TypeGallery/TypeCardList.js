import React from 'react';
import TypeCard from "./TypeCard";

export default class TypeCardList extends React.Component {
    render() {
        let cards = this.props.types.map(t => <TypeCard key={t.name} type={t.name} previewImage={t.preview}/>);
        return (<div className="type-gallery">{cards}</div>);
    }
}
