<template>
  <div>
    <div @click="data.count++">
      {{ data.count }} {{ double }}
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { useData, useComputed } from 'vue-hooks'

export default {
  hooks() {
    const data = useData({
      count: 0
    })

    const double = useComputed(() => data.count * 2)

    return {
      data,
      double
    }
  }

}
</script>

<style scoped lang="stylus">

</style>
