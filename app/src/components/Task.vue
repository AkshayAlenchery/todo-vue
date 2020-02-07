<template>
  <div>
    <div id="task-container">
      <div id="task-container-header">
        <font-awesome-icons :icon="['fa', 'chevron-circle-left']" @click="goBack" />
        <h4 v-if="!editListName">{{ selectedList().name }}</h4>
        <input
          type="text"
          name="list-name"
          v-if="editListName"
          id="list-name"
          v-model="eListName"
          v-on:keyup.enter="updateList()"
          v-bind:class="{ error: listNameEmpty }"
          placeholder="Enter a list name"
        />
        <font-awesome-icons :icon="['fa', 'edit']" @click="toggleEdit" />
      </div>
      <div>
        <input
          type="text"
          name="task-input"
          id="task-input"
          v-model="taskName"
          v-on:keyup.enter="addTask()"
          v-bind:class="{ error: taskNameEmpty }"
          placeholder="Add a new task"
        />
      </div>
      <div id="tasks">
        <div class="task" v-for="task in getAllTasks()" :key="task.taskId">
          <input type="checkbox" v-model="task.completed" />
          <p v-bind:class="{ completed: task.completed }" @click="selectTask(task.taskId)">
            {{ task.name }}
          </p>
        </div>
      </div>
    </div>
    <EditTask v-if="showEditTask" />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import EditTask from './EditTask.vue'

import { mapGetters, mapActions } from 'vuex'

library.add(faTrashAlt, faChevronCircleLeft, faEdit)

export default {
  name: 'Task',
  data() {
    return {
      showEditTask: false,
      editListName: false,
      eListName: this.selectedList().name,
      taskName: '',
      listNameEmpty: false,
      taskNameEmpty: false
    }
  },
  props: {
    appState: Object
  },
  components: {
    'font-awesome-icons': FontAwesomeIcon,
    EditTask
  },
  methods: {
    ...mapActions(['setListId', 'updateListName', 'addNewTask', 'updateTaskId']),
    ...mapGetters(['getListDetails', 'getSelListId', 'getList', 'getAllTasks']),
    selectedList: function() {
      const listId = this.getSelListId()
      return this.getList()(listId)
    },
    goBack: function() {
      this.appState.showTasks = false
      this.appState.showLists = true
    },
    toggleEdit: function() {
      this.editListName = true
    },
    updateList: async function() {
      if (this.eListName === '') this.listNameEmpty = true
      else {
        this.listNameEmpty = false
        await this.updateListName({ listId: this.selectedList().listId, name: this.eListName })
        this.editListName = false
      }
    },
    addTask: function() {
      if (this.taskName === '') this.taskNameEmpty = true
      else {
        this.taskNameEmpty = false
        this.addNewTask({ listId: this.selectedList().listId, name: this.taskName })
        this.taskName = ''
      }
    },
    selectTask: function(taskId) {
      this.updateTaskId(taskId)
      this.showEditTask = true
    }
  }
}
</script>
<style scoped>
.error {
  border: 1px solid red;
}
.error::placeholder {
  color: red;
}
.completed {
  text-decoration: line-through;
}
.task p {
  cursor: pointer;
}
</style>
