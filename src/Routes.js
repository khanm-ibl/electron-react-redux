import React, { Component } from "react"
import { Route } from "react-router-dom"
import ImportAccount from './views/components/ImportAccount'

class Routes extends Component {
  render() {
    return (
      <div>
        <div>
          <Route path="/" component={ImportAccount} />
        </div>
      </div>
    )
  }
}

export default Routes
