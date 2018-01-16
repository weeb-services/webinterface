import React from 'react'
import Check from 'material-ui/svg-icons/action/done'
import Cross from 'material-ui/svg-icons/content/clear'
import { Chip, RaisedButton } from 'material-ui'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import DeleteForeverIcon from 'material-ui/svg-icons/action/delete-forever'
import { connect } from 'react-redux'
import { confirmImageDelete, imageDeleteCancel, requestImageDelete } from './ImageDetailsActionCreator'

const tagStyle = {marginRight: '5px', backgroundColor: '#393d40'}

const mapStateToProps = state => {
  return {
    error: state.image.details.error,
    fetching: state.image.details.fetching,
    confirmImageDelete: state.image.details.confirmImageDelete,
    imageDeleted: state.image.details.imageDeleted
  }
}
const mapDispatchToProps = dispatch => {
  return {
    deleteImage: (id) => {
      dispatch(requestImageDelete(id))
    },
    confirmDeleteImage: (id) => {
      dispatch(confirmImageDelete(id))
    },
    cancelDeleteImage: (id) => {
      dispatch(imageDeleteCancel(id))
    }
  }
}

class ImageDataListing extends React.Component {
  constructor (props) {
    super(props)
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this)
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this)
  }

  onDeleteButtonClick () {
    if (!this.props.confirmImageDelete) {
      this.props.deleteImage(this.props.image.id)
    } else {
      this.props.confirmDeleteImage(this.props.image.id)
    }
  }

  onCancelButtonClick () {
    this.props.cancelDeleteImage(this.props.image.id)
  }

    render() {
        let tagMap = [];
        let nsfw;
        let hidden;
        if (this.props.image.hasOwnProperty('nsfw')) {
            nsfw = this.props.image.nsfw ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.hasOwnProperty('hidden')) {
            hidden = this.props.image.hidden ? <Check color="green"/> : <Cross color="red"/>;
        }
        if (this.props.image.tags) {
            this.props.image.tags.forEach(t => {
              tagMap.push(<Chip style={tagStyle} key={t.name} labelColor="#ffffff">{t.name}</Chip>)
            });
        }
      const btnStyle = {margin: '10px'}
      const labelColor = '#ffffff'
      const deleteButtonStyle = {margin: '10px', backgroundColor: '#ff1318'}
      const deleteButtonLabel = this.props.confirmImageDelete ? 'Confirm Deletion ?' : 'Delete Image'
      let cancelButton
      if (this.props.confirmImageDelete) {
        cancelButton = <RaisedButton label="Cancel Delete" style={btnStyle} backgroundColor={'#009d00'}
                                     onClick={this.onCancelButtonClick} icon={<Cross/>} labelColor={labelColor}/>
      }
      let deleteButtonIcon = this.props.confirmImageDelete ? <DeleteForeverIcon/> : <DeleteIcon/>
        return (<div className="image-data-wrapper">
          <p style={{marginTop: 0}}>ID: {this.props.imageDeleted ? '-' : this.props.image.id}</p>
            <p>Type: {this.props.image.baseType}</p>
            <p>Nsfw: {nsfw}</p>
            <p>Hidden: {hidden}</p>
            <p>Filetype: {this.props.image.fileType}</p>
            <p>RawUrl: <a target="_blank" href={this.props.image.url}>{this.props.image.url}</a></p>
          <div className="flex tag-list"><strong>Tags:</strong> {tagMap}</div>
          <div className="flex">
            {/*<RaisedButton label="Primary" primary={true} style={btnStyle} labelColor={labelColor}/>*/}
            {/*<RaisedButton label="Primary" primary={true} style={btnStyle} labelColor={labelColor}/>*/}
            <RaisedButton disabled={this.props.fetching || this.props.imageDeleted} label={deleteButtonLabel}
                          style={deleteButtonStyle}
                          backgroundColor={deleteButtonStyle.backgroundColor} icon={deleteButtonIcon}
                          onClick={this.onDeleteButtonClick} labelColor={labelColor}/>
            {cancelButton}
          </div>
        </div>)
    }
}

const ConnectedImageDataListing = connect(mapStateToProps, mapDispatchToProps)(ImageDataListing)
export default ConnectedImageDataListing
