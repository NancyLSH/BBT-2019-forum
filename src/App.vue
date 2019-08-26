<template>
  <div id="app">
  <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name:'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
       isRouterAlive: true
    }
  },
  mounted(){
    this.$router.push('/login')
  },
   methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
