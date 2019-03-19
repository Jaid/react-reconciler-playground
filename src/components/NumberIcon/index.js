import React from "react"
import PropTypes from "prop-types"
import {FilterNone, Filter1, Filter2, Filter3, Filter4, Filter5, Filter6, Filter7, Filter8, Filter9, Filter9Plus} from "@material-ui/icons"
import clamp from "clamp"
import {omit} from "lodash"

export default class NumberIcon extends React.Component {

  static propTypes = {
    amount: PropTypes.number,
  }

  static defaultProps = {
    amount: 0,
  }

  render() {
    const Component = {
      0: FilterNone,
      1: Filter1,
      2: Filter2,
      3: Filter3,
      4: Filter4,
      5: Filter5,
      6: Filter6,
      7: Filter7,
      8: Filter8,
      9: Filter9,
      10: Filter9Plus,
    }[clamp(this.props.amount, 0, 10)]

    return <Component {...omit(this.props, "amount")}/>
  }

}