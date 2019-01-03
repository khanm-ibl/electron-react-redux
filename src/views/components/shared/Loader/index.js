import React, { Component } from 'react'
import './style.scss'

class Loader extends Component {
  render() {
    return (
      <div className='app_loader_container'>
        <div className='app_loader'>
          <div className='app_loading_spinning_bubbles'>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
            <div className='app_bubble_container'>
              <div className='app_bubble' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loader
