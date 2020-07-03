/**
 * cherry-picked factory from konvajs
 */
import Util from './util'

let GET = 'get',
  SET = 'set'

export const Factory = {
  addGetterSetter(constructor, attr, def?, validator?, after?) {
    Factory.addGetter(constructor, attr, def)
    Factory.addSetter(constructor, attr, validator, after)
    Factory.addOverloadedGetterSetter(constructor, attr)
  },
  addGetter(constructor, attr, def?) {
    var method = GET + Util.capitalize(attr)

    constructor.prototype[method] =
      constructor.prototype[method] ||
      function () {
        var val = this.attrs[attr]
        return val === undefined ? def : val
      }
  },

  addSetter(constructor, attr, validator?, after?) {
    var method = SET + Util.capitalize(attr)

    if (!constructor.prototype[method]) {
      Factory.overWriteSetter(constructor, attr, validator, after)
    }
  },
  overWriteSetter(constructor, attr, validator?, after?) {
    var method = SET + Util.capitalize(attr)
    constructor.prototype[method] = function (val) {
      if (validator && val !== undefined && val !== null) {
        val = validator.call(this, val, attr)
      }

      this._setAttr(attr, val)

      if (after) {
        after.call(this)
      }

      return this
    }
  },
  addOverloadedGetterSetter(constructor, attr) {
    var capitalizedAttr = Util.capitalize(attr),
      setter = SET + capitalizedAttr,
      getter = GET + capitalizedAttr

    constructor.prototype[attr] = function () {
      // setting
      if (arguments.length) {
        this[setter](arguments[0])
        return this
      }
      // getting
      return this[getter]()
    }
  }
}
