declare const WorkerGlobalScope: any

export const glob: any =
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined'
    ? self
    : {}

export const _NODES_REGISTRY = {}

export const _registerNode = NodeClass => {
  _NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass
}