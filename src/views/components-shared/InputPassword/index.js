import React, { Component } from 'react'
import { INPUT_PASSWORD_MESSAGE } from '../../../constants/message-titles'
import Ionicon from 'react-ionicons'
import { openBrowser } from '../../../utils/electron-utils'
import './style.scss'
import PropTypes from 'prop-types'

class InputPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPrivacyAccept: false,
      passwordIsEmpty: true
    }
    this.openPrivacy = this.openPrivacy.bind(this)
    this.openProceduce = this.openProceduce.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  openPrivacy () {
    const { urlPrivacy } = this.props
    openBrowser(urlPrivacy)
  }

  openProceduce () {
    const { urlProcedure } = this.props
    openBrowser(urlProcedure)
  }

  componentWillReceiveProps (nextProps) {
    const { errorMessage } = this.props
    if (nextProps.errorMessage !== errorMessage) {
      const elements = document.getElementById('password')
      if (elements) { elements.focus() }
    }
  }

  componentDidMount () {
    const elements = document.getElementById('password')
    if (elements) { elements.focus() }
  }

  async handleSubmit (e) {
    e.preventDefault()
    if (!this.refs.password) return
    this.props.handleSubmit(this.refs.password.value)
  }

  render () {
    const { handleBackToImport, currentInternetStatus, errorMessage } = this.props
    const { isPrivacyAccept, passwordIsEmpty } = this.state
    const btnStatus = !passwordIsEmpty && isPrivacyAccept && currentInternetStatus !== 'OFFLINE'
    return (
      <div className='containerPasswdKeyStore'>
        <div className='viewTitle'>
          <span className='titlePasswdKeyStore'>Create Wallet</span>
        </div>
        <div className='formViewPasswdKeyStore'>
          <form onSubmit={this.handleSubmit}>
            <Ionicon icon='ios-unlock' fontSize='60px' color='#1875F0' paddingTop='55px' />
            <p>{INPUT_PASSWORD_MESSAGE}</p>
            <input
              id='password'
              className='inputViewPasswdKeyStore'
              type='password'
              placeholder='Inpur your password'
              ref='password'
              onChange={(e) => this.setState({passwordIsEmpty: !e.target.value})} />
            {errorMessage &&
            <div className='errWrap'>
              {/* <MessageError class='error' title={errorMessage} /> */}
            </div>
            }
            <div className='clr' />
            <div className='checkbox_wrap'>
              <input
                type='checkbox'
                checked={isPrivacyAccept}
                onChange={() => this.setState({isPrivacyAccept: !isPrivacyAccept})}
              />
              <span>
                <span onClick={() => this.setState({isPrivacyAccept: !isPrivacyAccept})}> By clicking here, you agree to</span>
                <a onClick={this.openProceduce}> Quanta Service Procedure </a>
                and
                <a onClick={this.openPrivacy}> Privacy Policy </a>
              </span>
            </div>
            <button
              type='submit'
              className={!btnStatus ? 'btnBackPasswdKeyStore' : 'btn'}
              disabled={!btnStatus ? 'disabled' : ''}
            >
            Submit
            </button>
            <div className='backBtn' onClick={handleBackToImport}>
            Back
            </div>
          </form>
        </div>
      </div>
    )
  }
}

InputPassword.propTypes = {
  errorMessage: PropTypes.string,
  handleBackToImport: PropTypes.func,
  handleSubmit: PropTypes.func,
  urlPrivacy: PropTypes.string,
  urlProcedure: PropTypes.string
}

export default InputPassword
