import React from "react";
import Upload from './Upload/Upload';
import TypeGallery from "./TypeGallery/TypeGallery";
import {Route} from "react-router-dom";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageDetails from "./ImageDetails/ImageDetails";
import './Image.css'

export default class ImagePanel extends React.Component {

    render() {
        return (<div className="image-wrapper">
            <h2 className="image-header">Image Gallery</h2>
            <div className="flex image-content-wrapper">
                <Upload/>
                <Route path="/image" exact component={TypeGallery}/>
                <Route path="/image/details/:id" exact component={({match}) => <ImageDetails id={match.params.id}/>}/>
                <Route path="/image/:type" exact component={({match}) => <ImageGallery type={match.params.type}/>}/>
            </div>
        </div>);
    }
}
