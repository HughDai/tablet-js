import { Node, NodeConfig } from './node'
import { Factory } from './Factory'
import { Canvas } from './canvas'
import { GetSet } from './types'
import Util from './util'

export class Board extends Node {
  canvas: Canvas
  content: HTMLDivElement
  constructor (config: BoardConfig) {
    super()
    this._buildDOM()
    this._bindContentEvents()
  }

  _buildDom () {
    this.canvas = new Canvas({
      width: this.width(),
      height: this.height(),
      pixelRatio: this.pixelRatio()
    })

    if (!Util.isBrowser) return
    let container = this.container()
    if (!container) {
      Util.throwException('container is required')
    }

    container.innerHTML = ''

    this.content = document.createElement('div')
    this.content.style.position = 'relative'
    this.content.style.userSelect = 'none'
    this.content.className = 'tabletjs-content'
    this.content.setAttribute('role', 'presentation')

    container.appendChild(this.content)

    this._resizeDom()
  }

  _resizeDom () {
    let width = this.width()
    let height = this.height()

    if (this.content) {
      this.content.style.width = width + 'px'
      this.content.style.height = height + 'px'
    }

    this.canvas.setSize(width, height)

    this.children.forEach(child => {
      child.setSize({ width, height })
    })
  }

  addEvent () {

  }

  _bindContentEvents () {
    
  }

  add (...children) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.add(arguments[i])
      }
      return this
    }

    let child = children[0]
    let _children = this.children
    child.index = _children.length
    child.parent = this
    _children.push(child)

    return this
  }

  clear () {
    if (this.hasChildren()) {
      this._clearChildren()
      this.canvas.clear()
    }
  }

  _clearChildren () {
    let child,
      len = this.children.length
    for (let i = 0; i < len; i++) {
      child = this.children[i]
      child.parent = null
      child.index = 0
      child.remove()
    }

    this.children = []
    return this
  }

  hasChildren () {
    return this.children.length > 0
  }

  _setChildrenIndices() {
    this.children.forEach(function (child, n) {
      child.index = n
    })
  }

  draw () {

    return this
  }

  container: GetSet<HTMLDivElement, this>
}

Factory.addGetterSetter(Board, 'container')

export interface BoardConfig extends NodeConfig {
  container: HTMLDivElement | string
  pixelRatio?: number
}
