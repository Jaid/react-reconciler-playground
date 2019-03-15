import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

class App extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(this.props.className)}>
      App
    </div>
  }

}

export default process.env.NODE_ENV === "development" ? require("react-hot-loader").hot(module)(App) : App