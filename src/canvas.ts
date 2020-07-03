import Util from './Util'
import { glob } from './global'

interface ICanvasConfig {
  width?: number
  height?: number
  pixelRatio?: number
}

export class Canvas {
  pixelRatio = 1
  _canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width = 0
  height = 0

  constructor (config: ICanvasConfig) {
    let conf = config || {}

    this.pixelRatio = conf.pixelRatio || glob.devicePixelRatio
    
    this._canvas = Util.createCanvasElement()
    this.context = this._canvas.getContext('2d')
    this.setSize(conf.width, conf.height)
    // set inline styles
    this._canvas.style.padding = '0'
    this._canvas.style.margin = '0'
    this._canvas.style.border = '0'
    this._canvas.style.background = 'transparent'
    this._canvas.style.position = 'absolute'
    this._canvas.style.top = '0'
    this._canvas.style.left = '0'
  }

  getContext () {
    return this.context
  }

  getPixelRatio() {
    return this.pixelRatio
  }

  getWidth() {
    return this.width
  }
  getHeight() {
    return this.height
  }

  setSize(width, height) {
    this.setWidth(width || 0)
    this.setHeight(height || 0)
  }

  setWidth(width) {
    // take into account pixel ratio
    this.width = this._canvas.width = width * this.pixelRatio
    this._canvas.style.width = width + 'px'

    let pixelRatio = this.pixelRatio,
      _context = this.getContext()
    _context.scale(pixelRatio, pixelRatio)
  }

  setHeight(height) {
    // take into account pixel ratio
    this.height = this._canvas.height = height * this.pixelRatio
    this._canvas.style.height = height + 'px'
    let pixelRatio = this.pixelRatio,
      _context = this.getContext()
    _context.scale(pixelRatio, pixelRatio)
  }

  clear () {
    let width = this.width / this.pixelRatio
    let height = this.height / this.pixelRatio
    this.context.clearRect(0, 0, width, height)
  }
}
