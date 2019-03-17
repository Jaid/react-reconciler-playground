import path from "path"

import {configureWebapp} from "webpack-config-jaid"

export default configureWebapp({
  publishimo: {fetchGithub: true},
  title: "react-reconciler Playground",
  configOutput: true,
  includeMonacoEditor: true,
  extra: {
    resolve: {
      alias: {
        theme$: path.resolve(__dirname, "src", "theme.scss"),
      },
    },
  },
})