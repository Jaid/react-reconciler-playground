import React from "react"
import ReactDom from "react-dom"
import App from "components/App"

const reactNode = document.createElement("div")
document.body.append(reactNode)
ReactDom.render(<App/>, reactNode)