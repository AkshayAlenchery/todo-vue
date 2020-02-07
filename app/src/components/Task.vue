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
      <div id="task-add-form">
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
      <div id="tasks" v-if="getAllTasks().length">
        <div class="task" v-for="task in sortedTasks" :key="task.taskId">
          <input type="checkbox" v-model="task.completed" @click="completeTask(task)" />
          <p
            v-bind:class="{
              completed: task.completed,
              high: task.priority * 1 === 2,
              medium: task.priority * 1 === 1
            }"
            @click="selectTask(task)"
          >
            {{ task.name }}
          </p>
        </div>
      </div>
      <p v-else class="no-task">No tasks</p>
    </div>
    <EditTask
      v-if="showEditTask"
      :selectedListId="appState.selectedListId"
      :selectedTask="selectedTaskDet"
      :closeEditTask="closeEditTask"
    />
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
      taskNameEmpty: false,
      selectedTaskDet: {}
    }
  },
  props: {
    appState: Object
  },
  computed: {
    fetchTasks: function() {
      this.fetchAllTasks(this.appState.selectedListId)
    },
    sortedTasks: function() {
      let tasks = this.getAllTasks()
      const high = []
      const medium = []
      const low = []
      tasks.forEach(task => {
        if (task.priority * 1 === 0) low.push(task)
        else if (task.priority * 1 === 1) medium.push(task)
        else if (task.priority * 1 === 2) high.push(task)
      })
      high.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
      medium.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
      low.sort((a, b) => new Date(b.scheduled) - new Date(a.scheduled))
      return [...high, ...medium, ...low]
    }
  },
  components: {
    'font-awesome-icons': FontAwesomeIcon,
    EditTask
  },
  methods: {
    ...mapActions([
      'setListId',
      'updateListName',
      'addNewTask',
      'updateTaskId',
      'updateTask',
      'fetchAllTasks'
    ]),
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
    completeTask: function(task) {
      task.completed = !task.completed
      this.updateTask({ listId: this.appState.selectedListId, task: task })
    },
    closeEditTask() {
      this.showEditTask = false
    },
    addTask: function() {
      if (this.taskName === '') this.taskNameEmpty = true
      else {
        this.taskNameEmpty = false
        this.addNewTask({ listId: this.selectedList().listId, name: this.taskName })
        this.taskName = ''
      }
    },
    selectTask: function(task) {
      this.updateTaskId(task.taskId)
      this.selectedTaskDet = task
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
.high {
  color: #dc3545;
}

.medium {
  color: #fd7e14;
}

.completed {
  color: gray;
  text-decoration: line-through;
}
.task p {
  cursor: pointer;
  font-weight: 600;
}

#task-container {
  width: 450px;
  background: #fff;
  margin: auto;
}

#task-container-header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
}

#task-container-header svg {
  cursor: pointer;
}

#task-container-header input {
  padding: 5px;
  width: 70%;
  font-size: 1em;
}

#task-add-form {
  display: flex;
  padding: 20px 20px 0 20px;
}

#task-add-form input {
  padding: 7px;
  flex: 1;
  font-size: 1em;
}

#tasks {
  padding: 10px 20px;
}

.task {
  display: flex;
  align-items: center;
  height: 50px;
}

.task p {
  margin-left: 10px;
}

.no-task {
  text-align: center;
  margin: 0;
  padding: 10px 0 20px 0;
}
</style>
