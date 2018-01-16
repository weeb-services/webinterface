import Dropzone from 'react-dropzone'
import React from 'react'
import { Checkbox, CircularProgress, RadioButton, RadioButtonGroup, RaisedButton, TextField } from 'material-ui'
import axios from 'axios'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadMethod: 'files',
            acceptedFiles: [],
            rejectedFiles: [],
            typeTextfield: '',
            tagTextfield: '',
            urlTextfield: '',
            hiddenCheckbox: false,
            lewdCheckbox: false,
            uploading: false,
            error: '',
            success: false,
            errorTypeTextField: ''
        };
        this.onDrop = this.onDrop.bind(this);
        this.onTypeTextFieldChange = this.onTypeTextFieldChange.bind(this);
        this.onTagTextFieldChange = this.onTagTextFieldChange.bind(this);
        this.onUrlTextFieldChange = this.onUrlTextFieldChange.bind(this);
        this.onHiddenCheckboxCheck = this.onHiddenCheckboxCheck.bind(this);
        this.onLewdCheckboxCheck = this.onLewdCheckboxCheck.bind(this);
        this.onUploadButtonClick = this.onUploadButtonClick.bind(this);
        this.onUploadRadioGroupChange = this.onUploadRadioGroupChange.bind(this);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        if (!this.state.uploading) {
            this.setState({acceptedFiles});
        }
    }

    onTypeTextFieldChange(event) {
        this.setState({typeTextfield: event.target.value, errorTypeTextField: ''});
    }

    onTagTextFieldChange(event) {
        this.setState({tagTextfield: event.target.value});
    }

    onUrlTextFieldChange(event) {
        this.setState({urlTextfield: event.target.value});
    }

    onHiddenCheckboxCheck(event, isInputChecked) {
        this.setState({hiddenCheckbox: isInputChecked});
    }

    onLewdCheckboxCheck(event, isInputChecked) {
        this.setState({lewdCheckbox: isInputChecked});
    }

    async onUploadButtonClick() {
        if (this.state.typeTextfield === '') {
            return this.setState({errorTypeTextField: 'Missing Type'})
        }
        this.setState({uploading: true});
        let tokenType = window.localStorage.getItem('tokenType') || 'Bearer';
        let apiToken = window.localStorage.getItem('token');
        try {
            if (this.state.uploadMethod === 'files') {
                for (let i = 0; i < this.state.acceptedFiles.length; i++) {
                    let formData = new FormData();
                    formData.append('file', this.state.acceptedFiles[i]);
                    formData.append('basetype', this.state.typeTextfield);
                    formData.append('hidden', this.state.hiddenCheckbox);
                    formData.append('nsfw', this.state.lewdCheckbox);
                    formData.append('tags', this.state.tagTextfield);
                    await axios({
                        url: `${global.endpoints.image}/upload`,
                        method: 'post',
                        headers: {
                            Authorization: `${tokenType} ${apiToken}`,
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData
                    });
                }
            } else {
                let formData = new FormData();
                formData.append('url', this.state.urlTextfield);
                formData.append('basetype', this.state.typeTextfield);
                formData.append('hidden', this.state.hiddenCheckbox);
                formData.append('nsfw', this.state.lewdCheckbox);
                formData.append('tags', this.state.tagTextfield);
                await axios({
                    url: `${global.endpoints.image}/upload`,
                    method: 'post',
                    headers: {Authorization: `${tokenType} ${apiToken}`},
                    data: formData
                });

            }
            this.setState({
              success: true, uploading: false, acceptedFiles: [], error: ''
            });
        } catch (e) {
            console.error(e);
            let error;
            if (e.response) {
                if (e.response.data) {
                    error = e.response.data.message;
                } else {
                    error = `Unknown error: ${e.response.status} :<`
                }
            }
            if (!error) {
                error = `Unknown Error`
            }
            this.setState({error: error, uploading: false});
        }
    }

    onUploadRadioGroupChange(event, value) {
        this.setState({uploadMethod: value});
    }

    render() {
        let acceptedFiles;
        let uploadMethod;
        let uploadSpinner;
        if (this.state.acceptedFiles.length > 0) {
            acceptedFiles = <ul>{this.state.acceptedFiles.map(f => {
                return (<li key={f.name}>{f.name} - {f.size}bytes</li>)
            })}</ul>;
        } else {
            acceptedFiles = <ul>
                <li>No images added yet :(</li>
            </ul>;
        }
        if (this.state.uploadMethod === 'files') {
            uploadMethod = <div>
                <div>
                    <p>Images to upload:</p>
                    {acceptedFiles}
                </div>
                <h3>Add files below:</h3>
                <Dropzone disabled={this.state.uploading} onDrop={this.onDrop}/>
            </div>;
        } else {
            uploadMethod = <div><TextField disabled={this.state.uploading} id="url" value={this.state.urlTextfield}
                                           onChange={this.onUrlTextFieldChange}
                                           floatingLabelText="Upload Image via direct url"
                                           floatingLabelStyle={{color: 'white'}}
                                           inputStyle={{color: 'white'}}/></div>
        }
        if (this.state.uploading) {
            uploadSpinner = <CircularProgress/>
        }
        let error;
        if (this.state.error !== '') {
            error = <p className="error">{this.state.error}</p>
        }
        let success;
        if (this.state.success) {
            success = <p>Uploaded Images successfully!</p>
        }
        let cbxStyle = {display: 'inline-flex', width: 'auto', paddingRight: '5px'};
        let iconStyle = {marginRight: '2px', fill: '#3498DB'};
        return (<div className="image-upload">
            <h3>Upload Images</h3>
            {error}
            {success}
            <TextField disabled={this.state.uploading} id="type" value={this.state.typeTextfield}
                       onChange={this.onTypeTextFieldChange}
                       floatingLabelText="Type of the images" errorText={this.state.errorTypeTextField}
                       floatingLabelStyle={{color: 'white'}} inputStyle={{color: 'white'}}/>
            <br/>
            <TextField disabled={this.state.uploading} id="tags" value={this.state.tagTextfield}
                       onChange={this.onTagTextFieldChange}
                       floatingLabelStyle={{color: 'white'}}
                       floatingLabelText="Tags of the images"
                       inputStyle={{color: 'white'}}/>
            <br/>
            <Checkbox style={cbxStyle} iconStyle={iconStyle} disabled={this.state.uploading} label="Hidden?"
                      onCheck={this.onHiddenCheckboxCheck} labelStyle={{color: 'white'}}/>
            <Checkbox style={cbxStyle} iconStyle={iconStyle} disabled={this.state.uploading} label="NSFW/LEWD?"
                      onCheck={this.onLewdCheckboxCheck} labelStyle={{color: 'white'}}/>
            <RadioButtonGroup name="uploadMethod" defaultSelected="files" onChange={this.onUploadRadioGroupChange}>
                <RadioButton value="files" label="File Upload" labelStyle={{color: 'white'}}
                             iconStyle={{fill: '#3498DB'}}/>
                <RadioButton value="url" label="Url Upload" labelStyle={{color: 'white'}}
                             iconStyle={{fill: '#3498DB'}}/>
            </RadioButtonGroup>
            {uploadMethod}
            <div className="upload-start">
                <RaisedButton style={{marginRight: '10px'}} type="button" label="Start Upload"
                              onClick={this.onUploadButtonClick}/>
                {uploadSpinner}
            </div>
        </div>);
    }
}
