import { getCurrentScope, onScopeDispose, unref, watch } from 'vue'

// @see https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md
// @see https://github.com/vueuse/vueuse/blob/main/packages/core/useScroll/index.ts
// 向当前活跃的 effect 作用域上注册事件
export function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }

  return false
}

export function toValue(r) {
  return typeof r === 'function' ? r() : unref(r)
}

// 获取dom元素
export function unrefElement(elRef) {
  const plain = toValue(elRef)

  return plain?.$el ?? plain
}

/**
 * 绑定事件
 * @param {Ref | Element} element
 * @param {String} event 
 * @param {Function} listener 监听事件
 * @param {Object} options 事件的配置项
 * @returns {Function} stop 注销事件
 */
export const useEventListener = (element, event, listener = () => { }, options = {}) => {
  let removeEvent = null

  if (!element) return () => { }

  const cleanup = () => {
    removeEvent && removeEvent()
    removeEvent = null
  }

  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => [unrefElement(element), toValue(options)],
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
