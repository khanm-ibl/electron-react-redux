// @flow
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './combine-reducer'
import reduxPersist from './redux-persist'
// import storage from 'redux-persist/es/storage'

const history = createHashHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)


function configureStore (initialState = {}, rehydrationComplete = () => { }) {
  const store = createStore(rootReducer, initialState, enhancer)
  reduxPersist(store, rehydrationComplete)
  return store
}

const store = configureStore()

export default { configureStore, history, store }
