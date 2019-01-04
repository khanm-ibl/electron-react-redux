import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from './combine-reducer'
import reduxPersist from './redux-persist'

const history = createHashHistory()

const configureStore = (initialState = {}, rehydrationComplete = () => { }) => {
  // Redux Configuration
  const middleware = []
  const enhancers = []

  // Thunk Middleware
  middleware.push(thunk)

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: false
  })
  middleware.push(logger)

  // Router Middleware
  const router = routerMiddleware(history)
  middleware.push(router)

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions
  }
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators
    })
    : compose
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)

  // config redux-pesist
  // const reducers = persistCombineReducers(persistConfig, rootReducer)

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(rootReducer)
    })
  }
  // const persistor = persistStore (store)
  reduxPersist(store, rehydrationComplete)
  // return { persistor, store }
  return store
}

const store = configureStore()

export default { configureStore, history, store }
