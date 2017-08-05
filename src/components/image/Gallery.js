import React from 'react';
import axios from 'axios';
import ImageList from "./ImageList";
import {CircularProgress} from "material-ui";
import PageSelector from "./PageSelector";

export default class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, images: [], loading: false, total: 0, initialLoad: true};
        this.onPageChangeClick = this.onPageChangeClick.bind(this);
    }

    async componentDidMount() {
        if (this.state.initialLoad) {
            await this.loadImages(this.state.page);
            this.setState({initialLoad: false})
        }
    }

    async onPageChangeClick(page) {
        this.setState({page});
        await this.loadImages(page)
    }


    async loadImages(page) {
        try {
            this.setState({loading: true});
            let imageListRequest = await this.loadImageRequest(page);
            this.setState({images: imageListRequest.data.images, loading: false, total: imageListRequest.data.total})
        } catch (e) {
            console.error(e);
        }
    }

    async loadImageRequest(page) {
        return axios({
            url: `${global.endpoints.image}/list`,
            headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`},
            params: {
                page: page
            }
        });
    }

    render() {
        let spinner;
        if (this.state.loading) {
            spinner = <CircularProgress/>
        }
        return (<div className="gallery">
            <div className="gallery-header">
                <h3>Image Gallery</h3>
                <div className="gallery-page">
                    <PageSelector page={this.state.page} maxPage={Math.ceil(this.state.total / 25)}
                                  changePage={this.onPageChangeClick}/>
                    <h3>
                        Images {(this.state.page - 1) * 25 + 1}-{this.state.page * 25 > this.state.total ? this.state.total : this.state.page * 25}</h3>
                    <h3>Total Images: {this.state.total}</h3>
                </div>
            </div>
            <div>
                {spinner}
                <ImageList images={this.state.images}/>
            </div>
        </div>)
    }
}
