import {configureWebapp} from "webpack-config-jaid"

export default configureWebapp({
  publishimo: {fetchGithub: true},
  title: "react-reconciler Playground",
  configOutput: true,
})