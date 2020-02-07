<template>
  <div id="list-container">
    <div id="list-add-form">
      <input
        type="text"
        name="list-input"
        v-model="listName"
        placeholder="Search | Add a new list"
        v-on:keyup.enter="addList"
        v-bind:class="{ error: hasError }"
      />
    </div>
    <div id="lists" v-if="searchLists.length">
      <div class="list" v-for="list in searchLists" :key="list.listId">
        <h4 @click="showTasks(list.listId)">{{ list.name }}</h4>
        <font-awesome-icon
          :icon="['fa', 'trash-alt']"
          @click="deleteList(list.listId)"
          class="red"
        />
      </div>
    </div>
    <p v-else class="no-list">No lists</p>
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
      this.appState.selectedListId = listId
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
  width: 350px;
  background: #fff;
  padding: 20px;
  margin: auto;
}

#list-add-form {
  display: flex;
  margin-bottom: 10px;
}

#list-add-form input {
  flex: 1;
  padding: 10px;
  font-size: 1em;
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}

.list h4 {
  font-size: 1.1em;
}

.list h4:first-child,
.list svg:last-child {
  cursor: pointer;
}
.error {
  border: 1px solid red;
}
.error::placeholder {
  color: red;
}
.red {
  color: red;
}
.no-list {
  margin: 20px 0 0 0;
  text-align: center;
}
</style>
