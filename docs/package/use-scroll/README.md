# useScroll

**示例**
@[code vue](./demo.vue)

**输出**

<div class="use-scroll-demo">
    <div> {{ x }}-{{ y }}</div>
</div>

<script setup lang='ts'>

import { useScroll } from '@package/use-scroll/index.ts'

const { x, y } = useScroll({ element: 1, delay: 4 })
</script>