import React, { Component } from 'react'
import { readFile } from '../../../utils/file-handler'
import { ImportKeystore, InputPassword } from '../../components-shared'
import connect from './store'

const errMessages = require('../../../constants/error-messages')

class SelectedFunction extends Component {
  

  render () {
    return (
      <div>
        <h6>Selected Function</h6>
      </div>
    )
  }
}

export default connect(SelectedFunction)
