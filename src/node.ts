import Util from './util'
import { Factory } from './factory'
import { _NODES_REGISTRY } from './global'
import { GetSet } from './types'
import Collection from './collection'

const CHILDREN = 'children'
const SET = 'set'
const emptyChildren: Collection<any> = new Collection()

type globalCompositeOperationType =
  | ''
  | 'source-over'
  | 'source-in'
  | 'source-out'
  | 'source-atop'
  | 'destination-over'
  | 'destination-in'
  | 'destination-out'
  | 'destination-atop'
  | 'lighter'
  | 'copy'
  | 'xor'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

export abstract class Node<Config extends NodeConfig = NodeConfig> {
  [index: string]: any
  index = 0
  parent: Node | null = null
  attrs: any = {}
  className!: string // className can not be undefined or null
  children = emptyChildren

  constructor (config?: Config) {
    this.setAttrs(config)
  }

  id: GetSet<string, this>
  name: GetSet<string, this>
  width: GetSet<number, this>
  height: GetSet<number, this>
  x: GetSet<number, this>
  y: GetSet<number, this>
  globalCompositeOperation: GetSet<globalCompositeOperationType, this>

  toObject() {
    var obj = {} as any,
      attrs = this.getAttrs(),
      key,
      val,
      getter,
      defaultValue,
      nonPlainObject

    obj.attrs = {}

    for (key in attrs) {
      val = attrs[key]
      // if value is object and object is not plain
      // like class instance, we should skip it and to not include
      nonPlainObject =
        Util.is(val, 'object') && !Util.isPlainObject(val) && !Util.is(val, 'function')
      if (nonPlainObject) {
        continue
      }
      getter = typeof this[key] === 'function' && this[key]
      // remove attr value so that we can extract the default value from the getter
      delete attrs[key]
      defaultValue = getter ? getter.call(this) : null
      // restore attr value
      attrs[key] = val
      if (defaultValue !== val) {
        obj.attrs[key] = val
      }
    }

    obj.className = this.getClassName()
    return Util._prepareToStringify(obj)
  }

  toJSON() {
    return JSON.stringify(this.toObject())
  }

  /**
   * create node with JSON string or an Object
   * @param data {String|Object} json string or object
   * @param container optional container dom element used only if you're
   *  creating a board node
   */
  static create (data, container?) {
    if (Util.is(data, 'string')) {
      data = JSON.parse(<string>data)
    }
    return this._createNode(<object>data, container)
  }

  static _createNode (obj, container?) {
    let className = Node.prototype.getClassName.call(obj)
    let children = obj.children,
      node,
      len,
      n

    // if container was passed in, add it to attrs
    if (container) {
      obj.attrs.container = container
    }

    if (!_NODES_REGISTRY[className]) {
      Util.warn('Can not find a node with class name "' + className + '".')
      node = null
      return node
    }

    const Class = _NODES_REGISTRY[className]
    node = new Class(obj.attrs)
    if (children) {
      len = children.length
      for (n = 0; n < len; n++) {
        node.add(Node._createNode(children[n]))
      }
    }

    return node
  }

  getClassName () {
    return this.className
  }

  setAttrs (config: any) {
    if (!config) return this
    let key, method
    for (key in config) {
      if (key === CHILDREN) continue
      method = SET + Util.capitalize(key)
      if (Util.is(this[method], 'function')) {
        this[method].call(this, config[key])
      } else {
        this._setAttr(key, config[key])
      }
    }
  }

  _setAttr (key: string, val: any) {
    let oldVal = this.attrs[key]
    if (oldVal === val && !Util.is(val, 'object')) {
      return
    }
    if (val === undefined || val === null) {
      delete this.attrs[key]
    } else {
      this.attrs[key] = val
    }
  }

  getAttrs () {
    return this.attrs || {}
  }

  remove () {
    var parent = this.parent

    if (parent && parent.children) {
      parent.children.splice(this.index, 1)
      parent._setChildrenIndices()
      this.parent = null
    }
  }
}

Factory.addGetterSetter(Node, 'width', 0)
Factory.addGetterSetter(Node, 'height', 0)
Factory.addGetterSetter(Node, 'id', '')
Factory.addGetterSetter(Node, 'name', '')
Factory.addGetterSetter(Node, 'x', 0)
Factory.addGetterSetter(Node, 'y', 0)

export interface NodeConfig {
  [index: string]: any
  id?: string
  name?: string
  width?: number
  height?: number
}
