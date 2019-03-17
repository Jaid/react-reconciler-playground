import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactMonacoEditor from "react-monaco-editor"

import defaultValue from "!raw-loader!./defaultValue"

import css from "./style.scss"

export default class HostConfigEditor extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const monacoOptions = {
      automaticLayout: true,
      fontLigatures: true,
      fontFamily: "FiraCode",
    }
    return <ReactMonacoEditor className={classnames(css.container, this.props.className)} theme="vs-dark" options={monacoOptions} defaultValue={defaultValue}/>
  }

}