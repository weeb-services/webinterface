import React from "react";
import Upload from './image/Upload';
import TypeGallery from "./image/TypeGallery/TypeGallery";
import {Route} from "react-router-dom";
import Gallery from "./image/Gallery";

export default class ImagePanel extends React.Component {

    render() {
        return (<div className="image-panel">
            <Upload/>
            <Route path="/image" exact component={TypeGallery}/>
            <Route path="/image/:type" component={({match}) => <Gallery type={match.params.type}/>}/>
        </div>);
    }
}
