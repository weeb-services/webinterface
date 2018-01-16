import React from 'react'
import ImageDataListing from './ImageDataListing'
import { fetchImageDetail } from './ImageDetailsActionCreator'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress, RaisedButton } from 'material-ui'
import './ImageDetails.css'

const mapStateToProps = state => {
  return {
    image: state.image.details.imageDetail,
    fetching: state.image.details.fetching,
    deleted: state.image.details.imageDeleted,
    error: state.image.details.error
  }
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
      let imageUrl
        if (this.props.fetching) {
            loadingSpinner = <CircularProgress/>
        } else {
            dataListing = <ImageDataListing image={this.props.image}/>;
        }
      if (this.props.deleted) {
        imageUrl = 'https://cdn.weeb.sh/assets/404.jpg'
        dataListing = <Link to={`/image/${this.props.image.baseType}`}><RaisedButton
          label={`Go back to the gallery of ${this.props.image.baseType}`} primary={true}
          style={{margin: '10px'}}/></Link>
      } else {
        imageUrl = this.props.image.url
      }
        return (<div className="image-detail-wrapper">
          <p>{this.props.error.toString()}</p>
          <h2>Image details of {this.props.deleted ? 'deleted' : ''} image {this.props.image.id}</h2>
            <div className="flex">
                <div>
                    <img className="image-detail"
                         src={imageUrl} alt={`details of ${this.props.image.id}`}/>
                </div>
                {dataListing}
            </div>
          {loadingSpinner}
        </div>)
    }
}

const ConnectedImageDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(ImageDetails));
export default ConnectedImageDetails;
