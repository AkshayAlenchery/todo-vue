<template>
  <div>
    <div id="task-edit-container">
      <form @submit="submitTask">
        <input type="text" v-model="name" />
        <div>
          <input type="date" name="schedule" id="schedule" v-model="scheduled" />
          <select name="priotity" id="priority" v-model="priority">
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <textarea name="note" id="note" v-model="note" cols="30" rows="10"></textarea>
        <input type="submit" value="Save" />
        <font-awesome-icons :icon="['fa', 'trash-alt']" @click="deleteTask" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt)

export default {
  components: {
    'font-awesome-icons': FontAwesomeIcon
  },
  data() {
    return this.getTask()(this.getTaskId())
  },
  methods: {
    ...mapGetters(['getTask', 'getTaskId', 'getSelListId']),
    ...mapActions(['updateTask']),
    submitTask: function(event) {
      event.preventDefault()
      const task = {
        listId: this.getSelListId(),
        taskId: this.taskId,
        name: this.name,
        priority: this.priority,
        scheduled: this.scheduled,
        completed: this.completed,
        note: this.note
      }
      this.updateTask(task)
    },
    deleteTask: function() {}
  }
}
</script>
