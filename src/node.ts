import * as Util from './util'

const CHILDREN = 'children'
const SET = 'set'

export abstract class Node<Config extends NodeConfig = NodeConfig> {
  [index: string]: any
  index = 0
  attrs: any = {}
  className!: string
  children: any []

  constructor (config?: Config) {
    this.setAttrs(config)
  }

  static create (data: string | object) {
    if (Util.is(data, 'string')) {
      data = JSON.parse(<string>data)
    }
    return this._createNode(<object>data)
  }

  static _createNode (obj: any) {
    let className = Node.prototype.getClassName.call(obj)
    let children = obj.children,
      node,
      len,
      n
    
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
}


export interface NodeConfig {
  [index: string]: any
  id?: string
  name?: string
  width?: number
  height?: number
}
