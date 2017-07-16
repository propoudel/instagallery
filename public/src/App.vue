<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a.navbar-brand{
  font-size: 20px;
  text-transform: uppercase;
}
.navbar-default .navbar-nav > li > a{
  display: inline-block;
  padding: 10px 5px;
}
.panel-primary{
  border: 0;
}


</style>
