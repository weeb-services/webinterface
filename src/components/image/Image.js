import React from "react";
import Upload from './Upload/Upload';
import TypeGallery from "./TypeGallery/TypeGallery";
import {Route} from "react-router-dom";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageDetails from "./ImageDetails/ImageDetails";

export default class ImagePanel extends React.Component {

    render() {
        return (<div className="flex">
            <Upload/>
            <Route path="/image" exact component={TypeGallery}/>
            <Route path="/image/details/:id" exact component={({match}) => <ImageDetails id={match.params.id}/>}/>
            <Route path="/image/:type" exact component={({match}) => <ImageGallery type={match.params.type}/>}/>
        </div>);
    }
}
