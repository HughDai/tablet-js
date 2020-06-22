export const _NODES_REGISTRY = {}

export const _registerNode = NodeClass => {
  _NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass
  // Konva[NodeClass.prototype.getClassName()] = NodeClass
};