import Vuex from 'vuex'
import Vue from 'vue'
import listState from './modules/list'
import appState from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    listState,
    appState
  }
})
