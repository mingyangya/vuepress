# useScroll

**示例**
@[code{8-} vue](./README.md)

**输出**

isScrolling - {{ isScrolling }}
<div class="use-scroll-demo w-300px" ref="refEl">
    <img class="content" src="https://img1.baidu.com/it/u=3637348320,3827732358&fm=253&app=138&f=JPEG?w=667&h=500"/>
</div>

<script setup>
import { ref } from 'vue-demi'
import { useScroll } from '@package/use-scroll'

const refEl = ref(null)

let { isScrolling } = useScroll(refEl, {
  onScroll: () => {
    console.log('scroll event')
  }
})
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
