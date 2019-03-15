import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import {AppContainer} from "react-hot-loader"
import {Provider} from "react-redux"
import {ConnectedRouter} from "connected-react-router"

import {createStore, history} from "./redux/store/index.dev.js"

const store = createStore({})

const reactRoot = document.createElement("div")
document.body.append(reactRoot)

ReactDom.render(<AppContainer>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
</AppContainer>,
reactRoot)