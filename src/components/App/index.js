import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSplitterLayout from "react-splitter-layout"
import Uniscope from "uniscope"
import pify from "pify"
import Sidebar from "components/Sidebar"
import HostConfigEditor from "components/HostConfigEditor"

import "./reactSplitterLayout.scss"
import css from "./style.scss"

export default class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const minSizePercent = 10
    return <div className={classnames(css.container, this.props.className)}>
      <ReactSplitterLayout primaryIndex={1} primaryMinSize={200} secondaryInitialSize={150}>
        <Sidebar/>
        <ReactSplitterLayout percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={30}>
          <ReactSplitterLayout vertical percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
            <HostConfigEditor/>
            <div>2: rendering</div>
          </ReactSplitterLayout>
          <ReactSplitterLayout vertical percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
            <div>Output</div>
            <div>Output Info</div>
          </ReactSplitterLayout>
        </ReactSplitterLayout>
      </ReactSplitterLayout>
    </div>
  }

}