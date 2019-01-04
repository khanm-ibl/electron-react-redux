
import React from "react"
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from "react-router-dom"
import Routes from "./Routes"
import { Provider } from 'react-redux'
import ConfigureStore from './states/configs'

const rootEl = document.getElementById('root')


ReactDOM.render(
  <Provider store={ConfigureStore.store}>
    <Router>
      <div>
        <Route path="/" component={Routes} />
      </div>
    </Router>
  </Provider>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const Routes = require('./Routes').default
    ReactDOM.render(
      <Provider store={ConfigureStore.store}>
        <Router>
          <div>
            <Route path="/" component={Routes} />
          </div>
        </Router>
      </Provider>,
      rootEl
    )
  })
}
