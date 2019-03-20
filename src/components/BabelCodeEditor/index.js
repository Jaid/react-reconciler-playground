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
import ReactLoading from "react-loading"
import AnimateOnChange from "react-animate-on-change"
import {omit} from "lodash"

import {changeCode} from "./actions"
import "./tabs.scss"
import css from "./style.scss"

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

const loadingIcon = <ReactLoading type="bars" className={classnames(css.tabIcon, css.loadingIcon)} width="1em" height="1em"/>

class BabelCodeEditor extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    editors: PropTypes.object.isRequired,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    scope: PropTypes.object,
  }

  static defaultProps = {
    initialValue: "",
  }

  componentWillMount() {
    this.scope = {
      ...this.props.scope,
      ...omit(this.props, ["scope", "handleChange"]),
      editor: this.props.editors[this.props.id],
    }
    this.props.handleChange(this.props.id, this.props.initialValue, this.scope)
  }

  componentWillUpdate(props) {
    this.scope = {
      ...props.scope,
      ...omit(props, ["scope", "handleChange"]),
      editor: this.props.editors[this.props.id],
    }
  }

  render() {
    const editor = this.props.editors[this.props.id]
    if (!editor) {
      return `Editor is ${String(editor)}`
    }
    const hasBabelError = Boolean(editor.babelError)
    const hasRunError = Boolean(editor.runError)
    const reportIcon = <Report fontSize="small" className={classnames(css.tabIcon, css.errorTabIcon)}/>
    const transformIcon = do {
      if (editor.job === "transform") {
        loadingIcon
      } else if (hasBabelError) {
        reportIcon
      } else {
        <Description fontSize="small" className={css.tabIcon}/>
      }
    }
    const exportsIcon = do {
      if (editor.job === "run") {
        loadingIcon
      } else if (hasBabelError || hasRunError) {
        reportIcon
      } else {
        <NumberIcon amount={size(editor.exports)} fontSize="small" className={css.tabIcon}/>
      }
    }
    const exportsPanel = do {
      if (hasRunError) {
        <ReactMonacoEditor language="plaintext" options={monacoReadOnlyOptions} value={editor.runError}/>
      } else {
        <ReactInspector className={css.inspector} name="exports" data={editor.exports} {...reactInspectorProps}/>
      }
    }
    return <Tabs className={classnames(css.container, this.props.className)}>
      <TabList>
        <Tab>
          <Code fontSize="small" className={css.tabIcon}/>
          <span className={css.tabTitle}>{this.props.name || `${this.props.id}.js`}</span>
        </Tab>
        <Tab>
          <AnimateOnChange animationClassName={css.flashing} animate={() => editor.job === "transform"}>
            {transformIcon}
            <span className={css.tabTitle}>Transformed</span>
          </AnimateOnChange>
        </Tab>
        {this.props.scope && <Tab>
          <NumberIcon amount={size(this.scope)} fontSize="small" className={css.tabIcon}/>
          <span className={css.tabTitle}>Imports</span>
        </Tab>}
        <Tab>
          <AnimateOnChange animationClassName={css.flashing} animate={() => editor.job === "run"}>
            {exportsIcon}
            <span className={css.tabTitle}>Exports</span>
          </AnimateOnChange>
        </Tab>
      </TabList>
      <TabPanel>
        <ReactMonacoEditor onChange={code => this.props.handleChange(this.props.id, code, this.scope)} theme="vs-dark" options={monacoOptions} value={editor.value}/>
      </TabPanel>
      <TabPanel>
        <ReactMonacoEditor language={hasBabelError ? "plaintext" : "javascript"} options={monacoReadOnlyOptions} value={editor.babelError || editor.transformedValue}/>
      </TabPanel>
      {this.scope && <TabPanel className={css.inspectorPanel}><ReactInspector
        name="global"
        data={this.scope}
        {...reactInspectorProps}/></TabPanel>}
      <TabPanel className={classnames({[css.inspectorPanel]: !hasRunError})}>
        {exportsPanel}
      </TabPanel>
    </Tabs>
  }

}

const mapStateToProps = state => ({
  editors: state.babelCodeEditor || {},
})

const mapDispatchToProps = {
  handleChange: changeCode,
}

export default connect(mapStateToProps, mapDispatchToProps)(BabelCodeEditor)