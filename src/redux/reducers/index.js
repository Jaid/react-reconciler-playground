import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"
import babelCodeEditor from "components/BabelCodeEditor/reducer"

import main from "./mainReducer"

export default history => combineReducers({
  router: connectRouter(history),
  main,
  babelCodeEditor,
})