import { Node } from './node'

/**
 * cherry-picked from konvajs
 * Collection constructor. Collection extends Array
 */
export default class Collection<Child extends Node> {
  [index: number]: Child

  // @ts-ignore
  length: number
  // @ts-ignore
  each: (f: (child: Child, index: number) => void) => void
  // @ts-ignore
  toArray: () => Array<Child>
  // @ts-ignore
  push: (item: Child) => void
  // @ts-ignore
  unshift: (item: Child) => void
  // @ts-ignore
  splice: (start: number, length: number, replace?: any) => void

  /**
   * convert array into a collection
   * @method
   * @param {Array} arr
   */
  static toCollection<ChildNode extends Node = Node> (arr: Array<ChildNode>) {
    var collection = new Collection<ChildNode>(),
      len = arr.length,
      n

    for (n = 0; n < len; n++) {
      collection.push(arr[n])
    }
    return collection
  }

  static _mapMethod (methodName: any) {
    Collection.prototype[methodName] = function () {
      var len = this.length,
        i

      var args = [].slice.call(arguments)
      for (i = 0; i < len; i++) {
        this[i][methodName].apply(this[i], args)
      }

      return this
    }
  }

  static mapMethods = function(constructor: Function) {
    var prot = constructor.prototype
    for (var methodName in prot) {
      Collection._mapMethod(methodName)
    }
  }
}

Collection.prototype = [] as any
/**
 * iterate through node array and run a function for each node.
 *  The node and index is passed into the function
 * @param {Function} func
 */
Collection.prototype.each = function(func) {
  for (var n = 0; n < this.length; n++) {
    func(this[n], n)
  }
}
/**
 * convert collection into an array
 */
Collection.prototype.toArray = function() {
  var arr = [],
    len = this.length,
    n

  for (n = 0; n < len; n++) {
    arr.push(this[n])
  }
  return arr
}
