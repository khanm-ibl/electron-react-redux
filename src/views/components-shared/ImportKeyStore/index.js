import React, { PureComponent } from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { UPLOAD_KEYSTORE_MESSAGE } from '../../../constants/message-titles'
import './style.scss'

class ImportKeystore extends PureComponent {
  render() {
    const {
      handleReadKeyStoreFile,
      handleFileError,
      errorMessage
    } = this.props
    return (
      <div className='containerUploadKeyStore'>
        <div className='viewTitle'>
          <span className='titleUploadKeyStore'>Create Wallet</span>
        </div>
        <div className='formViewUploadKeyStore'>
          <Ionicon icon='ios-paper' fontSize='60px' color='#1875F0' paddingTop='55px' />
          <p>{UPLOAD_KEYSTORE_MESSAGE}</p>
          <div className='uploadFileKeyStore'>
            <input
              type='file'
              accept='plain/text'
              multiple
              onChange={handleReadKeyStoreFile}
              onClick={handleFileError}
              onDrop={handleReadKeyStoreFile}
            />
            <p>
              upload file <span>or just drap and drop</span>
            </p>
          </div>
          {errorMessage !== '' &&
            <div className='errWrap'>
              {/* <MessageError class='error' title={errorMessage} /> */}
            </div>
          }
        </div>
      </div>
    )
  }
}

ImportKeystore.propTypes = {
  handleReadKeyStoreFile: PropTypes.func,
  handleFileError: PropTypes.func,
  errorMessage: PropTypes.string
}

export default ImportKeystore
