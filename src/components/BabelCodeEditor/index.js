import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactMonacoEditor from "react-monaco-editor"
import {connect} from "react-redux"
import {processHostConfig} from "actions"
import {Tabs, TabList, Tab, TabPanel} from "react-tabs"
import {Edit, CheckBox} from "@material-ui/icons"

import "./tabs.scss"
import css from "./style.scss"

class BabelCodeEditor extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    codeEditorClass: PropTypes.string,
    name: PropTypes.string,
  }

  static defaultProps = {
    value: "",
    defaultValue: "",
    name: "code.js",
  }

  render() {
    const monacoOptions = {
      automaticLayout: true,
      fontLigatures: true,
      fontFamily: "FiraCode",
    }
    return <Tabs className={classnames(css.container, this.props.className)}>
      <TabList>
        <Tab>
          <Edit fontSize="small" className={css.tabIcon}/>
          <span className={css.tabTitle}>{this.props.name}</span>
        </Tab>
        <Tab>Output</Tab>
      </TabList>
      <TabPanel className={classnames(css.codeEditor, this.props.codeEditorClass)}>
        <ReactMonacoEditor onChange={this.props.handleChange} theme="vs-dark" options={monacoOptions} defaultValue={this.props.defaultValue} value={this.props.value}/>
      </TabPanel>
      <TabPanel>2</TabPanel>
    </Tabs>
  }

}

const mapDispatchToProps = {
  handleChange: processHostConfig,
}

export default connect(null, mapDispatchToProps)(BabelCodeEditor)