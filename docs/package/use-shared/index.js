import { getCurrentScope, onScopeDispose, unref } from 'vue'

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

export function resolveUnref(r) {
  return typeof r === 'function' ? r() : unref(r)
}

// 获取dom元素
export function unrefElement(elRef) {
  const plain = resolveUnref(elRef)

  return plain?.$el ?? plain
}

// 空函数
export const noop = () => {}