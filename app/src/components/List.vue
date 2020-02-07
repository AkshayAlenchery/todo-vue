<template>
  <div id="list-container">
    <input
      type="text"
      name="list-input"
      v-model="listName"
      placeholder="Search | Add a new list"
      v-on:keyup.enter="addList"
      v-bind:class="{ error: hasError }"
    />
    <div id="lists">
      <div class="list" v-for="list in searchLists" :key="list.listId">
        <h3 @click="showTasks(list.listId)">{{ list.name }}</h3>
        <font-awesome-icon :icon="['fa', 'trash-alt']" @click="deleteList(list.listId)" />
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { mapActions, mapGetters } from 'vuex'

library.add(faTrashAlt)

export default {
  name: 'List',
  data() {
    return {
      listName: '',
      hasError: false
    }
  },
  props: {
    appState: Object
  },
  computed: {
    searchLists: function() {
      this.hasError = false
      const lists = this.getAllLists()
      return lists.filter(list => list.name.match(this.listName))
    }
  },
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  methods: {
    ...mapActions(['fetchAllLists', 'addNewList', 'deleteList', 'fetchAllTasks', 'setListId']),
    ...mapGetters(['getAllLists']),
    addList: function(event) {
      if (this.listName === '') this.hasError = true
      else {
        this.addNewList(this.listName)
        this.listName = ''
      }
    },
    showTasks: function(listId) {
      this.setListId(listId)
      this.fetchAllTasks(listId)
      this.appState.showTasks = true
      this.appState.showLists = false
    }
  },
  created() {
    this.fetchAllLists()
  }
}
</script>

<style scoped>
#list-container {
  width: 300px;
}
.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list h3:first-child,
.list svg:last-child {
  cursor: pointer;
}
.error {
  border: 1px solid red;
}
.error::placeholder {
  color: red;
}
</style>
