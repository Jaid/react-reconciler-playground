import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import css from "./style.scss"

export default class SideBar extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      SideBar
    </div>
  }

}