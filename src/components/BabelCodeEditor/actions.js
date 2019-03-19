import * as babel from "@babel/standalone"
import Sval from "sval"

babel.registerPresets({
  "@babel/preset-env": require("@babel/preset-env"),
  "@babel/preset-react": require("@babel/preset-react"),
})

babel.registerPlugins({
  "@babel/plugin-proposal-class-properties": require("@babel/plugin-proposal-class-properties"),
  "@babel/plugin-proposal-do-expressions": require("@babel/plugin-proposal-do-expressions"),
  "@babel/plugin-proposal-optional-chaining": require("@babel/plugin-proposal-optional-chaining"),
  "@babel/plugin-proposal-pipeline-operator": require("@babel/plugin-proposal-pipeline-operator"),
  "@babel/plugin-transform-runtime": require("@babel/plugin-transform-runtime"),
})

const transform = code => {
  return babel.transform(code, {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-optional-chaining",
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          proposal: "smart",
        },
      ],
    ],
    presets: [
      [
        "@babel/preset-react",
        {
          development: true,
        },
      ],
      [
        "@babel/preset-env", {
          targets: {
            browsers: "last 3 firefox versions, last 3 chrome versions, > 2%, not dead",
          },
        },
      ],
    ],
  })
}

export const changeCode = (id, code, scope) => dispatch => {
  dispatch({
    id,
    code,
    type: "@@babelCodeEditor/persistCode",
  })
  try {
    const babelResult = transform(code)
    dispatch({
      id,
      code: babelResult.code,
      type: "@@babelCodeEditor/transformedCode",
    })
    const sandbox = new Sval({
      sandbox: true,
      ecmaVer: 8,
    })
    try {
      if (scope) {
        sandbox.import(scope)
      }
      sandbox.run(babelResult.code)
      dispatch({
        id,
        sandbox,
        type: "@@babelCodeEditor/run",
      })
    } catch (error) {
      dispatch({
        id,
        message: error.stack || error.message || error,
        type: "@@babelCodeEditor/runError",
      })
    }
  } catch (error) {
    if (error.code === "BABEL_PARSE_ERROR") {
      dispatch({
        id,
        message: error.message,
        type: "@@babelCodeEditor/babelError",
      })
    }
  }
}