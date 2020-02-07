import Axios from 'axios'
const baseURL = 'http://localhost:3000/api/v2.0/'

const state = {
  selTaskId: '',
  tasks: ''
}

const actions = {
  fetchAllTasks: async function({ commit }, listId) {
    const resp = await Axios.get(baseURL + 'tasks/' + listId)
    commit('setAllTasks', resp.data)
  },
  addNewTask: async function({ commit }, task) {
    const resp = await Axios({
      method: 'POST',
      url: baseURL + 'tasks/' + task.listId,
      data: {
        name: task.name
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('setNewTask', resp.data)
  },
  updateTaskId: function({ commit }, taskId) {
    commit('setTaskId', taskId)
  },
  updateTask: async function({ commit }, task) {
    const { listId, ...taskDet } = task
    const resp = await Axios({
      method: 'PUT',
      url: baseURL + 'tasks/' + listId,
      data: taskDet,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('updateTasks', resp.data)
    commit('')
  }
}

const getters = {
  getAllTasks: state => state.tasks,
  getTask: state => id => state.tasks.find(task => task.taskId === id),
  getTaskId: state => state.selTaskId
}

const mutations = {
  setAllTasks: (state, data) => (state.tasks = data.tasks),
  setNewTask: (state, data) => state.tasks.push(data.task),
  setTaskId: (state, id) => (state.selTaskId = id),
  updateTasks: (state, data) => {
    const index = state.tasks.findIndex(task => task.taskId === data.task.taskId)
    state.tasks[index] = data.task
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
