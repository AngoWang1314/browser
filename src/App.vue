<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    background-image: url('assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  html, body, #app {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
