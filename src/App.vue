<script>
import Card from './components/card';
import List from './components/list';
import TextBox from './components/textBox';
import Message from './components/message';
import { mapActions } from 'vuex'

export default {
  components: { Card, List, TextBox, Message },
  created () {
    this.init()
  },
  methods: {
     ...mapActions([
       "init"
     ])
  }
}
</script>

<template>
<div id="app">
    <div class="sidebar">
        <card></card>
        <list></list>
    </div>
    <div class="main">
        <message></message>
        <text-box></text-box>
    </div>
</div>
</template>

<style lang="less" scoped>
#app {
  margin: 20px auto;
  width: 800px;
  height: 600px;

  overflow: hidden;
  border-radius: 3px;

  .sidebar, .main {
      height: 100%;
  }
  .sidebar {
      float: left;
      width: 200px;
      color: #f4f4f4;
      background-color: #2e3238;
  }
  .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
  }
  .text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
  }
  .message {
      height: ~'calc(100% - 160px)';
  }
}
</style>
