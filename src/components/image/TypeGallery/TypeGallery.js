import React from 'react';
import {CircularProgress} from "material-ui";
import TypeCardList from "./TypeCardList";
import {fetchTypeGallery} from "./TypeGalleryActionCreators";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        types: state.image.typeGallery.types,
        previews: state.image.typeGallery.previews,
        fetching: state.image.typeGallery.fetching,
        error: state.image.typeGallery.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchTypes: () => {
            dispatch(fetchTypeGallery())
        }
    }
};

class TypeGallery extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.fetchTypes();
    }

    render() {
        let errorMessage;
        let spinner;
        if (this.props.error) {
            errorMessage = <p>Oh nu :( an error occured!</p>
        }
        if (this.props.fetching) {
            spinner = <CircularProgress/>
        }
        return (<div className="type-gallery dark-af">
            {errorMessage}
            {spinner}
            <TypeCardList types={this.props.types} previews={this.props.previews}/>
        </div>);
    }
}

const ConnectedTypeGallery = connect(mapStateToProps, mapDispatchToProps)(TypeGallery);
export default ConnectedTypeGallery;
