<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      obj: {
        name: 'zhangsan',
        sex: '男',
        age: 12,
        hubit: '玩游戏'
      }
    }
  },
  created () {
    console.log(this.getJson(this.obj))
  },
  methods: {
    getJson (data) {
      let str = '?'
      for (let k in data) {
        str = `${str}${k}=${data[k]}&`
      }
      str = str.substring(0, str.length - 1)
      return str
    }
  }
}
</script>

<style>
  /*@import "assets/minin.scss";*/
#app {

}
</style>
