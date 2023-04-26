import { computed, reactive, ref, isRef } from 'vue-demi'

import { useEventListener } from '@package/use-event-listener'
import { useDebounce } from '@package/use-debounce'

/**
 * 判断元素是否滚动到底
 * scrollTop是一个非整数，而scrollHeight和clientHeight是四舍五入的，因此确定滚动区域是否滚动到底的唯一方法是查看滚动量是否足够接近某个阈值（1）
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */

// 阈值
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * 滚动
 * @param {ref}         element 绑定scroll事件的dom
 * @param {object}      options 
 * @param {number}      options.throttle 滚动事件的节流时间，默认为0ms
 * @param {number}      options.idle 检测滚动事件结束的时间，默认为200ms
 * @param {offset}      options.offset 边界的坐标值，单位px offset?: { top?: number, right: number, bottom?: number, left?: number}
 * @param {function}    options.onScroll 滚动事件
 * @param {function}    options.onStop 滚动停止事件
 * @param {function}    options.behavior 滚动行为，默认auto

 * @returns 
 */
export const useScroll = (element, options) => {
  const { behavior = 'auto', onScroll, onStop, throttle = 0, idel = 200 } = options
  // element = isRef(element) ? element : ref(element)

  let x = ref(0)
  let y = ref(0)
  let isScrolling = ref(false)
  
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false,
  })

  // 滚动结束
  const onScrollEnd = (event) => {
    if (!isScrolling.value) return
    
    isScrolling.value = false

    onStop && onStop(event)
  }

  const onScrollEndDebounced = useDebounce(onScrollEnd, throttle + idel)

  const onScrollHandler = (event) => {
    let { scrollLeft, scrollTop } = event.target
    
    x.value = scrollLeft
    y.value = scrollTop

    isScrolling.value = true
    onScroll && onScroll(event)
    onScrollEndDebounced()

    console.log('scroll')
  }

  function scrollTo (x, y) {

  }

  const init = () => {
    console.log(element)
    useEventListener(element, 'scroll', onScrollHandler, options)
  }

  init()

  return {
    isScrolling,
  }
}
