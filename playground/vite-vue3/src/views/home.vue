<template>
  <div>
    <div class="use-scroll-demo w-300px" ref="refEl">
      <img class="content" src="https://img1.baidu.com/it/u=3637348320,3827732358&fm=253&app=138&f=JPEG?w=667&h=500" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@package'

const refEl = ref(null)

let { isScrolling, x, y, directions } = useScroll(refEl)
</script>

<style lang="scss" scoped>
.use-scroll-demo {
  height: 200px;
  overflow: auto;
  margin-top: 30px;
}

.content {
  max-width: 100%;
  height: 1000px;
}
</style>
