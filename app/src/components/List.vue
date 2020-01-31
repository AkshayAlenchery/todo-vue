<template>
  <div class="container mt-4">
    <div id="lists" class="col-sm-5 m-auto">
      <b-card>
        <form @submit="onSubmit" class="mb-3">
          <b-form-input
            id="list-name"
            v-model="list.listName"
            type="text"
            required
            placeholder="Add a new list"
          ></b-form-input>
        </form>
        <div v-for="list in getLists" :key="list.listId" class="row p-2">
          <div class="col-sm-10 list-name">{{ list.name }}</div>
          <div class="col-sm-2 text-center trash">
            <b-icon icon="trash-fill" class="text-danger" @click="deleteList(list.listId)"></b-icon>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      list: {
        listName: ''
      }
    }
  },
  computed: mapGetters(['getLists']),
  methods: {
    ...mapActions(['fetchLists', 'addList', 'deleteList']),
    onSubmit: function(event) {
      event.preventDefault()
      this.addList(this.list.listName)
      this.list.listName = ''
    }
  },
  created() {
    this.fetchLists()
  }
}
</script>

<style scoped>
.list-name {
  cursor: pointer;
}

.trash {
  cursor: pointer;
}
.row:hover {
  background: #eee;
}
</style>
