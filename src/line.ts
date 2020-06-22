import { Node, NodeConfig } from './node'

export class Line extends Node {
  className = 'Line'
}

export interface LineConfig extends NodeConfig {
  points?: number [],
  widths?: number []
}
