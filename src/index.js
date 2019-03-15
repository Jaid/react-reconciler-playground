import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import {Provider} from "react-redux"
import {ConnectedRouter} from "connected-react-router"

import {createStore, history} from "./redux/store"

const store = createStore({})

const reactRoot = document.createElement("div")
document.body.append(reactRoot)

ReactDom.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <App/>
  </ConnectedRouter>
</Provider>,
reactRoot)