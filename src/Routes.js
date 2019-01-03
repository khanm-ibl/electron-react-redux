import React, { Component } from "react"
import { Route } from "react-router-dom"
import Login from './views/pages/Login'

class Routes extends Component {
  render() {
    return (
      <div>
        <div>
          <Route path="/" component={Login} />
        </div>
      </div>
    )
  }
}

export default Routes
