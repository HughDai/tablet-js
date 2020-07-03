export default class UndoRedo {
  stack: any []
  index: 0
  historyIndex: 0
  limit: Number

  constructor (limit: Number) {
    this.limit = limit || 10
  }

  undo () {
    let backward = this.index - 1
    
  }

  redo () {

  }

  isStart () {

  }

  isLatest () {

  }

  truncate () {

  }

  get (index = this.index) {
    return this.stack[index]
  }

  reset () {
    this.stack = []
    this.index = 0
    this.historyIndex = 0
  }
}
