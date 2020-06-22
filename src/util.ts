export function noop () {}

export function is (obj: any, type: string): boolean {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type
}

/**
 * cherry-picked util from konvajs
 */
export function isPlainObject (obj: any): boolean {
  return !!obj && obj.constructor === Object
}

export function isElement (ele: any): ele is Element {
  return !!(ele && ele.nodeType === 1)
}

export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function createCanvasElement () {
  let canvas = document.createElement('canvas')
  // on some environments canvas.style is readonly
  try {
    (<any>canvas).style = canvas.style || {};
  } catch (e) {}
  return canvas
}

export function getRandomColor () {
  let randColor = ((Math.random() * 0xFFFFFF) >> 0).toString(16)
  while (randColor.length < 6) {
    randColor = '0' + randColor
  }
  return '#' + randColor
}

export function isBrowser (): boolean {
  return (
    typeof window !== 'undefined' &&
    // browser case
    ({}.toString.call(window) === '[object Window]' ||
      // electron case
      {}.toString.call(window) === '[object global]')
  )
}

/* cherry-picked util from konvajs end */

export function download (src: string | Blob, filename?: string) {
  const isBlob = src instanceof Blob
  // for ms browser
  if (
    isBlob &&
    window.navigator &&
    window.navigator.msSaveOrOpenBlob
  ) {
    return window.navigator.msSaveOrOpenBlob(src)
  }
  
  // for other browsers
  const link = document.createElement('a')
  const href = isBlob ? window.URL.createObjectURL(src) : <string>src

  link.href = href
  link.download = filename
  link.target = '_blank'
  link.style.display = 'none'

  // this is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
  }))

  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    isBlob && window.URL.revokeObjectURL(href)
    link.remove()
  }, 100)
}
