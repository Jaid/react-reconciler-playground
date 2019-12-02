import path from "path"

import {configureWebapp} from "webpack-config-jaid"

export default configureWebapp({
  title: "react-reconciler Playground",
  configOutput: true,
  includeMonacoEditor: ["javascript", "plaintext"],
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})