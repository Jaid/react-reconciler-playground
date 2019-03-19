import immer from "immer"

export default (state, action) => {
  if (!state) {
    return {}
  }
  if (action.type === "@@babelCodeEditor/persistCode") {
    return immer(state, draft => {
      if (draft[action.id]) {
        draft[action.id].value = action.code
      } else {
        draft[action.id] = {value: action.code}
      }
    })
  }
  if (action.type === "@@babelCodeEditor/transformedCode") {
    return immer(state, draft => {
      draft[action.id].transformedValue = action.code
      delete draft[action.id].babelError
    })
  }
  if (action.type === "@@babelCodeEditor/babelError") {
    return immer(state, draft => {
      draft[action.id].babelError = action.message
      delete draft[action.id].transformedValue
      delete draft[action.id].exports
    })
  }
  if (action.type === "@@babelCodeEditor/run") {
    return immer(state, draft => {
      draft[action.id].exports = action.sandbox.exports
      delete draft[action.id].runError
    })
  }
  if (action.type === "@@babelCodeEditor/runError") {
    return immer(state, draft => {
      draft[action.id].runError = action.message
      delete draft[action.id].exports
    })
  }
  return state
}