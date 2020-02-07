import Axios from 'axios'
const baseURL = 'http://localhost:3000/api/v2.0/'

const state = {
  lists: [],
  selListId: ''
}

const getters = {
  getAllLists: state => state.lists,
  getSelListId: state => state.selListId,
  getList: state => listId => state.lists.find(list => list.listId === listId)
}

const actions = {
  fetchAllLists: async function({ commit }) {
    const resp = await Axios.get(baseURL + 'list/')
    commit('setLists', resp.data)
  },
  addNewList: async function({ commit }, listName) {
    const resp = await Axios({
      method: 'POST',
      url: baseURL + 'list',
      data: {
        listName: listName
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('setNewList', resp.data)
  },
  deleteList: async function({ commit }, listId) {
    const resp = await Axios({
      method: 'DELETE',
      url: baseURL + 'list/' + listId
    })
    commit('removeFromList', listId)
  },
  setListId: function({ commit }, listId) {
    commit('updateSelListId', listId)
  },
  updateListName: async function({ commit }, list) {
    const resp = await Axios({
      method: 'PUT',
      url: baseURL + 'list/' + list.listId,
      data: {
        name: list.name
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('updateListName', resp.data)
  }
}

const mutations = {
  setLists: (state, data) => (state.lists = data.lists),
  setNewList: (state, data) => state.lists.push(data),
  removeFromList: (state, data) => (state.lists = state.lists.filter(list => list.listId !== data)),
  updateSelListId: (state, data) => (state.selListId = data),
  updateListName: (state, data) => {
    console.log(data)
    const index = state.lists.findIndex(list => list.listId === data.listId)
    state.lists[index] = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
