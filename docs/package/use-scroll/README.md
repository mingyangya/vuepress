# useScroll

**示例**
@[code{8-} vue](./README.md)

**输出**

<div class="use-scroll-demo flex">
  <div class="w-1/2 left-content"  ref="refEl">
    <div class="content"></div>
    <button @click="scrollTo(30,50)">scrollTo(30, 50)</button>
  </div>
  <div class="w-1/2 ml-4">
    <div>x坐标位置：{{ x }}</div>
    <div>y坐标位置：{{ y }}</div>
     <div>是否正在滚动：{{ isScrolling }}</div>
    <div>是否到达边界：{{ arrived }}</div>
    <div v-if='isScrolling'>滚动方向：{{ getDirection(directions) }}</div>
  </div>
</div>

<script setup>
import { ref, computed } from 'vue'
import { useScroll } from '@package/use-scroll';
const refEl = ref(null)

let {
  isScrolling,
  directions,
  arrivedState,
  x,
  y,
  scrollTo
} = useScroll(refEl, {
  onScroll: () => {
    console.log('scroll...')
  },
  onStop: () => {
    console.log('scroll stop')
  }
})

const arrived = computed(() => {
  const keys = Object.keys(arrivedState.value)

  const findItem = keys.find(item => arrivedState.value[item])

  return findItem

})

const getDirection = (directions) => {
  const keys = Object.keys(directions)

  const findItem = keys.find(item => directions[item])

  // console.log(findItem)

  return findItem
}
</script>

<style lang="scss" scoped>
.use-scroll-demo {
  position: relative;
  height: 500px;
  
}

.left-content {
  position: relative;
  overflow: auto;
  margin-right: 30px;
}

.content {
  width: 500px;
  height: 800px;
  background: #999;
}

button {
  position: absolute;
  top: 80%;
  left: 60%;
  width: 130px;
  height: 30px;
}

</style>