import React from "react";
import Upload from './image/Upload';
import Gallery from "./image/Gallery";

export default class ImagePanel extends React.Component {

    render() {
        return (<div className="image-panel">
            <Upload/>
            <Gallery/>
        </div>);
    }
}
