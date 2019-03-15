import React from "react"
import ReactDom from "react-dom"
import HotApp from "components/HotApp"
import {Provider} from "react-redux"
import {ConnectedRouter} from "connected-react-router"

import {createStore, history} from "./redux/store/index.dev.js"

const store = createStore({})

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <ConnectedRouter history={history}>
    <HotApp/>
  </ConnectedRouter>
</Provider>, rootNode)