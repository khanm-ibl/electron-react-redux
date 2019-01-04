import { get } from '../utils/request'
import Config from '../configs'
import EthereumCore from '../utils/ethereum-core'

// Constants
export const WALLET_ACCOUNT_UPDATE_WALLET_INFO = 'WALLET_ACCOUNT_UPDATE_WALLET_INFO'

// Handlers
const handlers = {}

/**
 * Check roles
 * @param {Object} keyStore 
 * @param {String} password 
 */
handlers.checkRole = (keyStore, password) => {
  setTimeout ( async() => {
    try {
      const Ethereum = new EthereumCore()

      Ethereum.fromV3(keyStore, password)
      const privateKey = Ethereum.getPrivateKeyString()
      const address = Ethereum.getAddressString(privateKey)
      const requestParams = {
        'game': Config.ext.game,
        'module': 'user',
        'action': 'checkRoles',
        'roles': 'manager',
        'userAddress': address
      }
      const res = await get(Config.serverConfigs.gameUrl.login, requestParams)
      console.log('check role result', res)
      return res
    } catch (err) {
    }
  }, 100)
}

// Initial State
const initialState = {
  walletInfo: null
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_ACCOUNT_UPDATE_WALLET_INFO:
    return {
      ...state,
      walletInfo: action.walletInfo
    }
    default:
      return state
  }
}

// Action creators
const actionCreators = {}

actionCreators.updateWalletInfo = walletInfo => ({type: WALLET_ACCOUNT_UPDATE_WALLET_INFO, walletInfo})

// Discpatchers
const dispatchers = {}

dispatchers.updateWalletInfo = walletInfo => {
  return actionCreators.updateWalletInfo(walletInfo)
}

export { actionCreators, reducer, dispatchers, handlers }
