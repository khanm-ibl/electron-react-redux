
import React from "react"
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from "react-router-dom"
import Routes from "./Routes"

const rootEl = document.getElementById('root')


ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Routes} />
    </div>
  </Router>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const Routes = require('./Routes').default
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={Routes} />
        </div>
      </Router>,
      rootEl
    )
  })
}
