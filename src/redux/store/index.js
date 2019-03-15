import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {createHashHistory} from "history"
import {routerMiddleware} from "connected-react-router"

import createReducer from "../reducers"

const history = createHashHistory()
const rootReducer = createReducer(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

const createAdvancedStore = initialState => createStore(rootReducer, initialState, enhancer)

export {
  history,
  createAdvancedStore as createStore
}