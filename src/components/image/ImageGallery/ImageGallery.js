import React from 'react';
import ImageList from "./ImageList";
import {CircularProgress} from "material-ui";
import PageSelector from "./PageSelector";
import {cycleNsfw, fetchImageCategoryPageIfNeeded, switchPage} from "../../../actionCreators/imageActionCreators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const mapStateToProps = state => {
    return {
        page: state.image.page,
        images: state.image.images,
        fetching: state.image.fetching,
        total: state.image.total,
        category: state.image.category,
        nsfw: state.image.nsfw
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onPageChangeClick: (page, type, nsfw = 'false') => {
            dispatch(switchPage(page));
            dispatch(fetchImageCategoryPageIfNeeded(type, page, nsfw));
        },
        fetchImageCategoryPageIfNeeded: (page = 1, type, nsfw = 'false') => {
            dispatch(fetchImageCategoryPageIfNeeded(type, page, nsfw));
        },
        cycleNsfw: (page, type, nsfw) => {
            dispatch(cycleNsfw(nsfw));
            dispatch(fetchImageCategoryPageIfNeeded(type, page, nsfw));
        }
    }
};

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.onPageChangeClick = this.onPageChangeClick.bind(this);
        this.onNsfwCycleClick = this.onNsfwCycleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchImageCategoryPageIfNeeded(this.props.type === this.props.category ? this.props.page : 1, this.props.type, this.props.type === this.props.category ? this.props.nsfw : 'false');
    }

    onPageChangeClick(page) {
        this.props.onPageChangeClick(page, this.props.type, this.props.nsfw);
    }

    onNsfwCycleClick(nsfw) {
        let nextNsfw;
        switch (nsfw) {
            case 'false':
                nextNsfw = 'true';
                break;
            case 'true':
                nextNsfw = 'only';
                break;
            case 'only':
                nextNsfw = 'false';
                break;
            default:
                nextNsfw = 'false';
                break;
        }
        this.props.cycleNsfw(this.props.page, this.props.category, nextNsfw);
    }

    render() {
        let spinner;
        if (this.props.fetching) {
            spinner = <CircularProgress/>
        }
        return (<div className="gallery">
            <div className="gallery-header">
                <h3>Type: {this.props.type}</h3>
                <div className="gallery-page">
                    <PageSelector changePage={this.onPageChangeClick} cycleNsfw={this.onNsfwCycleClick} nsfw={this.props.nsfw}/>
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
