<template>
  <div>
    <div id="task-edit-container">
      <div id="edit-header">
        <h4>Edit task</h4>
        <font-awesome-icons :icon="['fa', 'times-circle']" @click="closeEditTask()" />
      </div>
      <form @submit="submitTask">
        <div id="editTaskContainer">
          <input
            type="text"
            v-model="selectedTask.name"
            placeholder="Enter task name"
            :disabled="selectedTask.completed"
            :class="{ error: hasError }"
          />
          <div class="input-row">
            <input
              type="date"
              name="schedule"
              id="schedule"
              v-model="selectedTask.scheduled"
              :disabled="selectedTask.completed"
            />
            <select
              name="priotity"
              id="priority"
              v-model="selectedTask.priority"
              :disabled="selectedTask.completed"
            >
              <option value="0">Low</option>
              <option value="1">Medium</option>
              <option value="2">High</option>
            </select>
          </div>
          <textarea
            name="note"
            id="note"
            v-model="selectedTask.note"
            cols="30"
            rows="5"
            :disabled="selectedTask.completed"
          ></textarea>
          <div>
            <button type="submit" :disabled="selectedTask.completed">Save</button>
            <font-awesome-icons :icon="['fa', 'trash-alt']" @click="deleteTask" class="red" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt, faTimesCircle)

export default {
  data() {
    return {
      hasError: false
    }
  },
  components: {
    'font-awesome-icons': FontAwesomeIcon
  },
  props: {
    selectedTask: Object,
    closeEditTask: Function,
    selectedListId: Number
  },
  methods: {
    ...mapActions(['dltTask', 'updateTask']),
    closeEdit: function() {
      this.showEditTask = false
    },
    submitTask: function(event) {
      this.hasError = false
      event.preventDefault()
      if (this.selectedTask.name === '') this.hasError = true
      else {
        this.updateTask({ listId: this.selectedListId, task: this.selectedTask })
      }
    },
    deleteTask: function() {
      this.dltTask({ listId: this.selectedListId, taskId: this.selectedTask.taskId })
      this.closeEditTask()
    }
  }
}
</script>
<style scoped>
#task-edit-container {
  background: #fff;
  width: 450px;
  margin: 20px auto;
}

#edit-header {
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

#edit-header svg {
  cursor: pointer;
}

#editTaskContainer {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

#editTaskContainer input[type='text'] {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  margin-bottom: 10px;
  border: 1px solid rgb(238, 238, 238);
}
#editTaskContainer input[type='text']:disabled {
  background: #eee;
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.input-row select {
  width: 46%;
  height: 43px;
  background: white;
  border: 1px solid rgb(238, 238, 238);
  font-size: 1em;
}

.input-row select:disabled {
  background: #eee;
}
.input-row input[type='date'] {
  width: 46%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid rgb(238, 238, 238);
}

.input-row input[type='date']:disabled {
  background: #eee;
}

#editTaskContainer textarea {
  padding: 10px;
  border: 1px solid rgb(238, 238, 238);
  font-size: 1em;
  margin-bottom: 10px;
}

#editTaskContainer textarea:disabled {
  background: #eee;
}

#editTaskContainer button {
  background: #007bfe;
  padding: 10px 5px;
  width: 100px;
  color: #fff;
  border: 1px solid #007bfe;
  border-radius: 5px;
  font-size: 1em;
  margin-right: 20px;
}

#editTaskContainer button:disabled {
  background: #e2e6ea;
  padding: 10px 5px;
  width: 100px;
  color: #fff;
  border: 1px solid #e2e6ea;
  border-radius: 5px;
  font-size: 1em;
  margin-right: 20px;
}

.red {
  color: red;
  cursor: pointer;
}
.error {
  border: 1px solid red !important;
}
.error::placeholder {
  color: red;
}
</style>
