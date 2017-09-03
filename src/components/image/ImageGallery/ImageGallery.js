import React from 'react';
import ImageList from "./ImageList";
import {CircularProgress} from "material-ui";
import PageSelector from "./PageSelector";
import {fetchImageCategoryPageIfNeeded, switchPage} from "../../../actionCreators/imageActionCreators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        page: state.image.page,
        images: state.image.images,
        fetching: state.image.fetching,
        total: state.image.total
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onPageChangeClick: (page, type) => {
            dispatch(switchPage(page));
            dispatch(fetchImageCategoryPageIfNeeded(type, page));
        },
        fetchImageCategoryPageIfNeeded: (page = 1, type) => {
            dispatch(fetchImageCategoryPageIfNeeded(type, page));
        }
    }
};

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, images: [], loading: false, total: 0, initialLoad: true};
        this.onPageChangeClick = this.onPageChangeClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchImageCategoryPageIfNeeded(this.props.page, this.props.type);
    }

    onPageChangeClick(page) {
        this.props.onPageChangeClick(page, this.props.type);
    }

    render() {
        let spinner;
        if (this.props.fetching) {
            spinner = <CircularProgress/>
        }
        return (<div className="gallery">
            <div className="gallery-header">
                <h3>Image Gallery for type {this.props.type}</h3>
                <div className="gallery-page">
                    <PageSelector page={this.props.page} maxPage={Math.ceil(this.props.total / 25)}
                                  changePage={this.onPageChangeClick}/>
                    <h3>
                        Images {(this.props.page - 1) * 25 + 1}-{this.props.page * 25 > this.props.total ? this.props.total : this.props.page * 25}</h3>
                    <h3>Total Images: {this.props.total}</h3>
                </div>
            </div>
            <div>
                {spinner}
                <ImageList images={this.props.images}/>
            </div>
        </div>)
    }
}

const ConnectedImageGallery = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageGallery));
export default ConnectedImageGallery;
