import { Node, NodeConfig } from 'node'

export class Board extends Node {
  width?: number
  height?: number
  container?: HTMLDivElement | string
  content: HTMLDivElement
  constructor (config: BoardConfig) {
    super()
  }

  addEvent () {

  }

  _buildDom () {

  }

  _bindContentEvents () {

  }

  add (node: Node) {

  }

  clear () {

  }
}

export interface BoardConfig extends NodeConfig {
  container?: HTMLDivElement | string
}
