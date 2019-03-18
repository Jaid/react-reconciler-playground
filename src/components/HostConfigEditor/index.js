import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactMonacoEditor from "react-monaco-editor"
import {connect} from "react-redux"
import {processHostConfig} from "actions"


import css from "./style.scss"

class HostConfigEditor extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
  }

  render() {
    const monacoOptions = {
      automaticLayout: true,
      fontLigatures: true,
      fontFamily: "FiraCode",
    }
    return <ReactMonacoEditor onChange={this.props.handleChange} className={classnames(css.container, this.props.className)} theme="vs-dark" options={monacoOptions} defaultValue={defaultValue}/>
  }

}

const mapDispatchToProps = {
  handleChange: processHostConfig,
}

export default connect(null, mapDispatchToProps)(HostConfigEditor)