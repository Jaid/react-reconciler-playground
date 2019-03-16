import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSplitterLayout from "react-splitter-layout"

import paneCss from "./paneStyle.scss"
import css from "./style.scss"

export default class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <ReactSplitterLayout>
        <div>Pane 3</div>
        <div>Pane 2</div>
      </ReactSplitterLayout>
    </div>
  }

}