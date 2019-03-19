class Root {

  render() {
    return "abc"
  }

}

const noop = () => {}

const getComponentByType = type => {
  return {
    root: Root,
  }[type]
}

export const now = noop

export const prepareUpdate = () => true

export const getRootHostContext = rootContainerInstance => {
  return {depth: 0}
}

export const getChildHostContext = (parentHostContext, type, rootContainerInstance) => {
  const Component = getComponentByType(type)
  return {
    depth: parentHostContext.depth + (Component.increaseDepth || 0),
  }
}

export const shouldSetTextContent = (type, props) => {
  if (["number", "boolean", "string"].includes(typeof props.children)) {
    return true
  }
  if (isStringArray(props.children)) {
    return true
  }
  return false
}

export const createInstance = (type, props, rootContainer, hostContext, fiber) => {
  const TypeClass = getComponentByType(type)

  if (TypeClass?.constructor) {
    return new TypeClass({
      ...props,
      ...hostContext,
    })
  }

  throw new Error(`No native tldw component "${type}"`)
}

export const createTextInstance = text => {
  return text
}

export const prepareForCommit = noop

export const resetAfterCommit = noop

export const appendInitialChild = noop

export const finalizeInitialChildren = () => {
  return false
}

export const insertInContainerBefore = noop

export const unhideInstance = noop

export const useSyncScheduling = true

export const supportsMutation = true

export const appendChild = noop

export const appendChildToContainer = noop

export const getPublicInstance = instance => {
  return instance
}

export const removeChild = noop

export const removeChildFromContainer = noop

export const insertBefore = noop

export const commitUpdate = noop

export const commitMount = noop

export const commitTextUpdate = noop