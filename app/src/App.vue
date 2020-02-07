<template>
  <div id="app">
    <h2>Todo App</h2>
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
        showTasks: false
      }
    }
  },
  components: {
    List,
    Task
  }
}
</script>
