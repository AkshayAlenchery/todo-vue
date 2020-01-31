import axios from 'axios'
const baseURL = 'http://localhost:3000/api/v2.0/'

const state = {
  lists: []
}

const getters = {
  getLists: state => state.lists
}

const actions = {
  async fetchLists({ commit }) {
    const response = await axios.get(baseURL + 'list')
    commit('setLists', response.data)
  },
  async addList({ commit }, listName) {
    const response = await axios({
      method: 'POST',
      url: baseURL + 'list',
      data: {
        listName: listName
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('addNewList', response.data)
  },
  async deleteList({ commit }, listId) {
    const response = await axios({
      method: 'DELETE',
      url: baseURL + 'list/' + listId
    })
    console.log(response.data)
    commit('removeList', listId)
  }
}

const mutations = {
  setLists: (state, data) => (state.lists = data.lists),
  addNewList: (state, data) => state.lists.push(data),
  removeList: (state, data) => (state.lists = state.lists.filter(list => list.listId !== data))
}

export default {
  state,
  getters,
  actions,
  mutations
}
