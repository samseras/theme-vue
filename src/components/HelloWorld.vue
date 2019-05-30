<template>
  <div class="header">
    <div class="ha">xax</div>
    <el-select v-model="value" placeholder="请选择" @change="select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <Test></Test>
  </div>
</template>

<script>
import Test from './test'
export default {
  data () {
    return {
      options: [{
        value: 'theme1',
        label: '1'
      }, {
        value: 'theme2',
        label: '2'
      }, {
        value: 'theme3',
        label: '3'
      }],
      value: 'theme1'
    }
  },
  methods: {
    select () {
      window.document.documentElement.setAttribute('data-theme', this.value)
    }
  },
  components: {
    Test
  }
}
</script>
<style lang="scss" scoped>
  /*@import "./../assets/minin";*/
  .ha{
    @include bg_color($background-color-theme)
  }
</style>
