<template>
  <div>
    isScrolling - {{ isScrolling }} 
    isScrolling2 -- {{isScrolling2}}
    <div class="use-scroll-demo w-300px" ref="refEl">
      <img class="content" src="https://img1.baidu.com/it/u=3637348320,3827732358&fm=253&app=138&f=JPEG?w=667&h=500" />
    </div>

    <div class="use-scroll-demo w-300px mt-3" ref="refEl2">
      <img class="content" src="https://img1.baidu.com/it/u=3637348320,3827732358&fm=253&app=138&f=JPEG?w=667&h=500" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll as useScroll2 } from '@package'
// import { useScroll } from '@vueuse/core/index.mjs'
import { useScroll } from '@vueuse/core'

const refEl = ref(null)
const refEl2 = ref(null)

let { isScrolling } = useScroll(refEl)

let { isScrolling : isScrolling2 } = useScroll2(refEl2)
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
