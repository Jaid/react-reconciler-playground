import React from "react"
import ReactDom from "react-dom"
import App from "components/App"

console.log(2)
const reactNode = document.createElement("div")
reactNode.id = "react"
document.body.append(reactNode)
ReactDom.render(<App/>, reactNode)