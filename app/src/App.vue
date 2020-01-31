<template>
  <div id="app" class="mt-4">
    <h1 class="text-center">Todo App</h1>
    <Lists />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Lists from './components/List.vue'

export default {
  data() {
    return {
      state: {}
    }
  },
  components: {
    Lists
  },
  computed: mapGetters(['getState']),
  methods: {
    ...mapActions(['updateState'])
  }
}
</script>
