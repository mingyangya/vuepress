<template>
  <div class="use-scroll-demo">
    <div> {{ x }}-{{ y }}</div>
  </div>
</template>

<script setup>
import useScroll from './index.js'

const { x, y } = useScroll({ element: 1, delay: 4 })
</script>
