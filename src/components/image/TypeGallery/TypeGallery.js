import React from 'react';
import axios from 'axios';
import {CircularProgress} from "material-ui";
import TypeCardList from "./TypeCardList";

export default class TypeGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {initialized: false, loading: false, types: [], error: '', nsfw: 'false'}
    }

    async loadTypes() {
        this.setState({loading: true});
        try {
            let req = await this.loadTypeRequest();
            if (!req.data.types || req.data.types.length === 0) {
                this.setState({loading: false, error: 'No types found, upload images to fill this gallery'});
                return;
            }
            let types = [];
            req.data.types.sort();
            for (let type of req.data.types) {
                let typeReq = await this.fetchTypePreview(type);
                if (!typeReq.data.url) {
                    typeReq.data.url = '';
                }
                types.push({name: type, preview: typeReq.data.url});
            }
            window.localStorage.setItem('types', JSON.stringify(types));
            window.localStorage.setItem('types-age', Date.now());
            this.setState({types});
        } catch (e) {
            this.setState({error: e});
        }
        this.setState({loading: false});
    }

    loadTypeRequest() {
        return axios({
            url: `${global.endpoints.image}/types`,
            params: {nsfw: this.state.nsfw},
            headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`}
        });
    }

    async fetchTypePreview(type) {
        return axios({
            url: `${global.endpoints.image}/random`,
            params: {type, nsfw: this.state.nsfw},
            headers: {Authorization: `Bearer ${window.localStorage.getItem('token')}`}
        });
    }

    async componentDidMount() {
        let types = window.localStorage.getItem('types');
        let typesAge = window.localStorage.getItem('types-age');
        if (types && typesAge > Date.now() - (3600 * 1000)) {
            types = JSON.parse(types);
            this.setState({types})
        } else {
            await this.loadTypes();
        }

    }

    render() {
        let errorMessage;
        let spinner;
        if (this.state.error) {
            errorMessage = <p>Oh nu :( an error occured!</p>
        }
        if (this.state.loading) {
            spinner = <CircularProgress/>
        }
        return (<div className="type-gallery">
            {errorMessage}
            {spinner}
            <TypeCardList types={this.state.types}/>
        </div>);
    }
}
