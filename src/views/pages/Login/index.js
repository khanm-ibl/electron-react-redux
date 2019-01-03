import React, { Component } from 'react'
// import Loader from '../../components/shared/Loader'
import { readFile } from '../../../utils/file-handler'
import ImportKeystore from '../../components/ImportKeyStore'
import InputPassword from '../../components/InputPassword'

const errMessages = require('../../../constants/error-messages')

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keyStore: null,
      fileUploaded: false
    }
    this.handleFileError = this.handleFileError.bind(this)
    this.handleBackToImport = this.handleBackToImport.bind(this)
    this.handleReadKeyStoreFile = this.handleReadKeyStoreFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
  }

  handleFileError () {
    this.setState({ errorMessage: null })
  }

  handleBackToImport () {
    this.setState({ fileUploaded: false, errorMessage: null, keyStore: null })
  }

  handleReadKeyStoreFile (e) {
    const file = e.target.files[0] || e.dataTransfer.files[0]
    const reader = new window.FileReader()

    reader.onload = (upload) => {
      const result = readFile(file, reader, upload)
      if (result !== '') {
        this.setState({ keyStore: result, fileUploaded: true })
      } else {
        this.setState({ errorMessage: errMessages.FILE_INVALID, keyStore: null })
      }
    }
    reader.readAsText(file, 'TF-8')
    e.target.value = ''
  }

  handleSubmit (password) {
  }

  render () {
    const { fileUploaded, errorMessage } = this.state
    return (
      <div>
        <div className='container' data-tid='container'>
          {!fileUploaded ? (
            <ImportKeystore
              handleReadKeyStoreFile={this.handleReadKeyStoreFile}
              handleFileError={this.handleFileError}
              errorMessage={errorMessage}
            />
          ) : (
            <InputPassword
              handleSubmit={this.handleSubmit}
              errorMessage={errorMessage}
              handleBackToImport={this.handleBackToImport}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Login
