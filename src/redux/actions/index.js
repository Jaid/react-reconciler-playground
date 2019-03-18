import * as babel from "@babel/standalone"

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
      "@babel/plugin-transform-runtime",
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
            browsers: "last 2 versions, > 5%",
          },
        },
      ],
    ],
  })
}

export const persistCode = () => {
  return {
    type: "@@main/persistCode",
  }
}

export const finishHostConfig = () => ({
  type: "finishHostConfig",
})

export const processHostConfig = code => dispatch => {
  dispatch(persistCode(code))
  const transformedCode = transform(code)
  console.log(transformedCode)
  dispatch(finishHostConfig())
}