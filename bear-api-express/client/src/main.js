import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, getInitialState } from './store'
import App from './app'

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore(getInitialState())

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)
  const state = store.getState()

  ReactDOM.render(
    <App store={store} routes={routes} />,
    MOUNT_NODE
  )
}

if(true /* 如果用户存在 */ ){
  render()
}
