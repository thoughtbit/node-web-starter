import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import { syncTranslationWithStore } from 'react-redux-i18n'
import { browserHistory } from 'react-router'
import { syncReduxAndTitle } from 'redux-title'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import {  makeRootReducer } from './modules'

export const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    routerMiddleware(browserHistory)
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = reduxCreateStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  // Sync with Store
  syncTranslationWithStore(store)
  syncReduxAndTitle(store,
    (state) => store.getState().context.title
  )
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.context.routing
  })

  // @Property: Async Reducers
  store.asyncReducers = {}

  // @Property: Enhanced Utils
  store.enhancedUtils = {
    history
  }

  return store
}
