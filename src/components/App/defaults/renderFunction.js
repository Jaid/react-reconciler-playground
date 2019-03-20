const hostConfig = editors.hostConfig.exports
const TestComponent = editors.reactComponent.exports.TestComponent

const renderer = reconciler(hostConfig)
const element = <TestComponent/>
const root = hostConfig.createInstance("root")
const rootContainer = renderer.createContainer(root)
renderer.updateContainer(element, rootContainer)
const rendered = root.render()
export default rendered