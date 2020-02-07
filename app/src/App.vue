<template>
  <div id="app">
    <h1 id="logo">Todo App</h1>
    <List v-if="appState.showLists" :appState="appState" />
    <Task v-if="appState.showTasks" :appState="appState" />
  </div>
</template>

<script>
import List from './components/List.vue'
import Task from './components/Task.vue'

export default {
  name: 'TodoApp',
  data() {
    return {
      appState: {
        showLists: true,
        showTasks: false,
        selectedListId: 0
      }
    }
  },
  components: {
    List,
    Task
  }
}
</script>
<style>
body {
  background: #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
#logo {
  text-align: center;
}
</style>
