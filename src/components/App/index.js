import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

export default class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(this.props.className)}>
      Apparfaaa
    </div>
  }

}