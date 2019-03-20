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
        draft[action.id] = {
          value: action.code,
          job: "transform",
        }
      }
    })
  }
  if (action.type === "@@babelCodeEditor/transformedCode") {
    return immer(state, draft => {
      const editor = draft[action.id]
      editor.transformedValue = action.code
      editor.job = "run"
      delete editor.babelError
    })
  }
  if (action.type === "@@babelCodeEditor/babelError") {
    return immer(state, draft => {
      const editor = draft[action.id]
      editor.babelError = action.message
      delete editor.job
      delete editor.transformedValue
      delete editor.exports
    })
  }
  if (action.type === "@@babelCodeEditor/run") {
    return immer(state, draft => {
      const editor = draft[action.id]
      editor.exports = action.sandbox.exports
      delete editor.job
      delete editor.runError
    })
  }
  if (action.type === "@@babelCodeEditor/runError") {
    return immer(state, draft => {
      const editor = draft[action.id]
      editor.runError = action.message
      delete editor.job
      delete editor.exports
    })
  }
  return state
}