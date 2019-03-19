import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSplitterLayout from "react-splitter-layout"
import {connect} from "react-redux"
import Sidebar from "components/Sidebar"
import BabelCodeEditor from "components/BabelCodeEditor"
import Output from "components/Output"
import reconciler from "react-reconciler"
import lodash from "lodash"

import defaultHostConfig from "!raw-loader!./defaults/hostConfig"

import defaultReactComponent from "!raw-loader!./defaults/reactComponent"

import defaultRenderFunction from "!raw-loader!./defaults/renderFunction"

import "./reactSplitterLayout.scss"
import css from "./style.scss"

class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    hostConfig: PropTypes.object,
    TestComponent: PropTypes.func,
  }

  render() {
    const minSizePercent = 10
    const sharedScope = {
      lodash,
      React,
      console,
    }
    return <div className={classnames(css.container, this.props.className)}>
      <Sidebar/>
      <ReactSplitterLayout percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
        <ReactSplitterLayout vertical percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
          <BabelCodeEditor id="hostConfig" initialValue={defaultHostConfig} scope={sharedScope}/>
          <BabelCodeEditor id="reactComponent" name="ReactComponent.jsx" initialValue={defaultReactComponent} scope={sharedScope}/>
        </ReactSplitterLayout>
        <ReactSplitterLayout vertical percentage primaryMinSize={minSizePercent} secondaryMinSize={minSizePercent} secondaryInitialSize={50}>
          {(this.props.hostConfig && this.props.TestComponent) ? <BabelCodeEditor id="renderFunction"
            initialValue={defaultRenderFunction}
            scope={{
              ...sharedScope,
              reconciler,
              hostConfig: this.props.hostConfig,
              TestComponent: this.props.TestComponent,
            }}/> : "Waiting for exports..."}
          <Output/>
        </ReactSplitterLayout>
      </ReactSplitterLayout>
    </div>
  }

}

const mapStateToProps = state => {
  return {
    hostConfig: state.babelCodeEditor.hostConfig?.exports,
    TestComponent: state.babelCodeEditor.reactComponent?.exports?.TestComponent,
  }
}

export default connect(mapStateToProps)(App)