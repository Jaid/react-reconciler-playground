import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactMonacoEditor from "react-monaco-editor"
import ReactInspector, {chromeDark} from "react-inspector"
import {connect} from "react-redux"
import {Tabs, TabList, Tab, TabPanel} from "react-tabs"
import {Code, Description, Report, PlayCircleOutline} from "@material-ui/icons"
import NumberIcon from "components/NumberIcon"
import {size} from "lodash"

import {changeCode} from "./actions"
import "./tabs.scss"
import css from "./style.scss"

class BabelCodeEditor extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    scope: PropTypes.object,
  }

  static defaultProps = {
    initialValue: "",
  }

  componentWillMount() {
    this.props.handleChange(this.props.id, this.props.initialValue, this.props.scope)
  }

  render() {
    const monacoOptions = {
      automaticLayout: true,
      fontLigatures: true,
      fontFamily: "FiraCode",
      wordWrap: "on",
      minimap: {
        renderCharacters: false,
      },
    }
    const monacoReadOnlyOptions = {
      ...monacoOptions,
      readOnly: true,
      renderWhitespace: "boundary",
    }
    const reactInspectorProps = {
      theme: {
        ...chromeDark,
        BASE_BACKGROUND_COLOR: "transparent",
        BASE_FONT_FAMILY: "Fira Code, monospace",
        TREENODE_FONT_FAMILY: "Fira Code, monospace",
      },
    }
    const hasBabelError = Boolean(this.props.editorState.babelError)
    const hasRunError = Boolean(this.props.editorState.runError)
    const ReportIcon = <Report fontSize="small" className={classnames(css.tabIcon, css.errorTabIcon)}/>
    const ResultPanel = do {
      if (hasRunError) {
        <ReactMonacoEditor language="plaintext" options={monacoReadOnlyOptions} value={this.props.editorState.runError}/>
      } else {
        <ReactInspector name="exports" data={this.props.editorState.exports} {...reactInspectorProps}/>
      }
    }
    return <Tabs className={classnames(css.container, this.props.className)}>
      <TabList>
        <Tab>
          <Code fontSize="small" className={css.tabIcon}/>
          <span className={css.tabTitle}>{this.props.name || `${this.props.id}.js`}</span>
        </Tab>
        <Tab>
          {hasBabelError ? ReportIcon : <Description fontSize="small" className={css.tabIcon}/>}
          <span className={css.tabTitle}>Transformed</span>
        </Tab>
        {this.props.scope && <Tab>
          <NumberIcon amount={size(this.props.scope)} fontSize="small" className={css.tabIcon}/>
          <span className={css.tabTitle}>Imports</span>
        </Tab>}
        <Tab>
          {(hasBabelError || hasRunError) ? ReportIcon : <NumberIcon amount={size(this.props.editorState.exports)} fontSize="small" className={css.tabIcon}/>}
          <span className={css.tabTitle}>Exports</span>
        </Tab>
      </TabList>
      <TabPanel>
        <ReactMonacoEditor onChange={code => this.props.handleChange(this.props.id, code, this.props.scope)} theme="vs-dark" options={monacoOptions} value={this.props.editorState.value}/>
      </TabPanel>
      <TabPanel>
        <ReactMonacoEditor language={hasBabelError ? "plaintext" : "javascript"} options={monacoReadOnlyOptions} value={this.props.editorState.babelError || this.props.editorState.transformedValue}/>
      </TabPanel>
      {this.props.scope && <TabPanel><ReactInspector name="global" data={this.props.scope} {...reactInspectorProps}/></TabPanel>}
      <TabPanel>{ResultPanel}</TabPanel>
    </Tabs>
  }

}

const mapStateToProps = (state, props) => ({
  editorState: state.babelCodeEditor[props.id] || {},
})

const mapDispatchToProps = {
  handleChange: changeCode,
}

export default connect(mapStateToProps, mapDispatchToProps)(BabelCodeEditor)