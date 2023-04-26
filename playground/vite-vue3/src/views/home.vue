<template>
  <div>
    isScrolling - {{ isScrolling }}
    <div class="use-scroll-demo w-300px" ref="refEl">
      <img class="content" src="https://img1.baidu.com/it/u=3637348320,3827732358&fm=253&app=138&f=JPEG?w=667&h=500" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useScroll } from '@package'
import { useScroll } from '@vueuse/core/index.cjs'

const refEl = ref(null)

console.log('useScroll', useScroll)

let { isScrolling } = useScroll(refEl)
</script>

<style lang="scss" scoped>
.use-scroll-demo {
  height: 500px;
  overflow: auto;
}

.content {
  max-width: 100%;
  height: 1000px;
}

</style>
