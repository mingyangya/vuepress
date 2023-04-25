<template>
  <div class="use-scroll-demo" ref="refEl">
    <div class="content"> isScrolling - {{ isScrolling }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue-demi'
import { useScroll } from '@package/use-scroll';
const refEl = ref(null)

let { isScrolling } = useScroll(refEl, {
  onScroll: () => {
    console.log(111)
  }
})
</script>

<style lang="scss" scoped>
.use-scroll-demo {
  height: 500px;
  overflow: auto;
}

.content {
  height: 1000px;
}

</style>
