import Vue from 'vue'
import Vuex from 'vuex'
import list from './modules/List'
import task from './modules/Task'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    list,
    task
  }
})
