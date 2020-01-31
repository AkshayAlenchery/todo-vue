const state = {
  app: {
    showList: 1,
    showTasks: 0,
    editTask: 0
  }
}

const getters = {
  getState: () => state.app
}

const actions = {
  updateState: ({ commit }, data) => {
    commit('setState', data)
  }
}
const mutations = {
  setState: (state, data) => (state.data.component = data.state)
}

export default {
  state,
  getters,
  actions,
  mutations
}
