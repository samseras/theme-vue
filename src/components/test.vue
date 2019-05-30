<template>
  <div class="test">
    测试
  </div>
</template>

<script>
export default {
  name: 'test'
}
</script>

<style scoped lang="scss">
  .test{
    @include bg_color($background-color-theme1);
    @include font_color($background-color-theme)
  }
</style>
