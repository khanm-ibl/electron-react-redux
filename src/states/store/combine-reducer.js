import { combineReducers } from 'redux'

import { reducer as walletAccount } from '../wallet-account';

const rootReducer = combineReducers({
  walletAccount
})

export default rootReducer  