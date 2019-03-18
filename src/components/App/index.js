import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSplitterLayout from "react-splitter-layout"
import {connect} from "react-redux"
import Sidebar from "components/Sidebar"
import BabelCodeEditor from "components/BabelCodeEditor"

import "./reactSplitterLayout.scss"
import css from "./style.scss"

import defaultHostConfig from "!raw-loader!./defaultHostConfig"

class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    hostConfigCode: PropTypes.string.isRequired,
  }

  render() {
    const minSizePercent = 10
    return <div className={classnames(css.container, this.props.className)}>
      <ReactSplitterLayout primaryIndex={1} primaryMinSize={200} secondaryInitialSize={150}>
        <Sidebar/>
        <ReactSplitterLayout percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={30}>
          <ReactSplitterLayout vertical percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
            <BabelCodeEditor name="hostConfig.js" value={this.props.hostConfigCode} defaultValue={defaultHostConfig}/>
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

const mapStateToProps = state => {
  return {
    hostConfigCode: state.hostConfigCode,
  }
}

export default connect(mapStateToProps)(App)