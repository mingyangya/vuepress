import { watch } from 'vue'
import { tryOnScopeDispose, resolveUnref, unrefElement, noop } from '@package/use-shared'
/**
 * 绑定事件
 * @param {Ref | Element} element
 * @param {String} event 
 * @param {Function} listener 监听事件
 * @param {Object} options 事件的配置项
 * @returns {Function} stop 注销事件
 */
export const useEventListener = (element, event, listener = noop, options = {}) => {
  let removeEvent = null

  if (!element) return noop

  const cleanup = () => {
    removeEvent && removeEvent()
    removeEvent = null
  }

  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => [unrefElement(element), resolveUnref(options)],
    ([el, opts]) => {
      cleanup()
      if (!el)
        return

      removeEvent = register(el, event, listener, opts)
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}
