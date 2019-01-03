import { get } from '../utils/request'
import Config from '../configs'
import EthereumCore from '../utils/ethereum-core'

// Constants
export const AUTH_SIGNIN = 'USER/AUTH_SIGNIN'
export const AUTH_SIGNOUT = 'USER/AUTH_SIGNOUT'
export const AUTH_SERVERERROR = 'USER/AUTH_SERVERERROR'
export const USER_UPDATE_INFO = 'USER_UPDATE_INFO'

// Handlers
const handlers = {}

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
  user: null,
  authenticated: false,
  error: null
}

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

// Action creators
const actionCreators = {}

actionCreators.signIn = user => ({ type: AUTH_SIGNIN, user })
actionCreators.signOut = () => ({ type: AUTH_SIGNOUT })
actionCreators.updateUserInfo = user => ({ type: USER_UPDATE_INFO, user })

// Discpatchers
const dispatchers = {}

dispatchers.signIn = user => {
  localstorage.willSetAccessUser(user)
  return actionCreators.signIn(user)
}

dispatchers.signOut = () => {
  localstorage.willRemoveAccessUser()
  return actionCreators.signOut()
}

dispatchers.updateUserInfo = user => actionCreators.updateUserInfo(user)

export { actionCreators, reducer, dispatchers, handlers }
