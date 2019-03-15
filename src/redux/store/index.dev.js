import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import {createHashHistory} from "history"
import {routerMiddleware, routerActions} from "connected-react-router"
import {createLogger} from "redux-logger"

import * as actions from "../actions"
import createReducer from "../reducers"

const history = createHashHistory()
const rootReducer = createReducer(history)

const createAdvancedStore = initialState => {
  const logger = createLogger({
    level: "info",
    collapsed: true,
  })
  const enhancers = []
  const middleware = [
    thunk,
    logger,
    routerMiddleware(history),
  ]
  let composeEnhancers
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators: {
        ...actions,
        ...routerActions,
      },
    })
  } else {
    composeEnhancers = compose
  }
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)
  const store = createStore(rootReducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept("../reducers", () => store.replaceReducer(require("../reducers").default))
  }
  return store
}

export {
  history,
  createAdvancedStore as createStore
}