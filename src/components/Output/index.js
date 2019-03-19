import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect} from "react-redux"
import ReactInspector from "react-inspector"

import css from "./style.scss"

class Output extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    result: PropTypes.any,
  }

  render() {
    return <ReactInspector data={this.props.result}/>
  }

}

const mapStateToProps = state => ({
  result: state.babelCodeEditor.renderFunction?.exports?.default,
})

export default connect(mapStateToProps)(Output)