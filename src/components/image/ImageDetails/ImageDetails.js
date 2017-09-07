import React from 'react';
import ImageDataListing from "./ImageDataListing";
import {fetchImageDetail} from "../../../actionCreators/imageActionCreators";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CircularProgress} from "material-ui";

const mapStateToProps = state => {
    return {image: state.image.imageDetail, fetching: state.image.fetching}
};
const mapDispatchToProps = dispatch => {
    return {
        fetchImage: (id) => {
            dispatch(fetchImageDetail(id))
        }
    };
};

class ImageDetails extends React.Component {
    componentDidMount() {
        this.props.fetchImage(this.props.id);
    }

    render() {
        let loadingSpinner;
        let dataListing;
        if (this.props.fetching) {
            loadingSpinner = <CircularProgress/>
        } else {
            dataListing = <ImageDataListing image={this.props.image}/>;
        }
        return (<div>
            <h2>Image details of image {this.props.image.id}</h2>
            {loadingSpinner}
            <div className="flex">
                <div>
                    <img className="image-detail"
                         src={this.props.image.url}/>
                </div>
                <div>
                    {dataListing}
                </div>
            </div>
        </div>)
    }
}

const ConnectedImageDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDetails));
export default ConnectedImageDetails;
