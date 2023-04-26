import { watch, watchEffect } from "vue-demi"

/**
 * 绑定事件
 * https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 */

export const useEventListener = (el, event = '', listener = null, options = {}) => {

  let  cleanups = []
  /**
   * 注册事件
   * @param {ref} el
   * @param {string} event 事件名称
   * @param {function} listener 事件
   * @param {object} options 
   */
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options)

    return () => el.removeEventListener(event, listener, options)
  }

  console.log(el, 'element', typeof el, unref(el))
  watch(el, (newEl) => {
    console.log(newEl, 'watch')
    newEl && cleanups.push(register(newEl, event, listener, options))
  }, {immediate: true, flush: 'post' })


  const stop = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  return stop
}
