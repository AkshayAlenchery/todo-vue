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
  updateTask: async function({ commit }, taskDet) {
    const { listId, task } = taskDet
    const resp = await Axios({
      method: 'PUT',
      url: baseURL + 'tasks/' + listId,
      data: task,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('updateTasks', resp.data)
  },
  dltTask: function({ commit }, data) {
    const resp = Axios({
      method: 'DELETE',
      url: baseURL + 'tasks/' + data.listId,
      data: {
        taskId: data.taskId
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    commit('deleteTask', data.taskId)
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
  },
  deleteTask: (state, taskId) => (state.tasks = state.tasks.filter(task => task.taskId !== taskId))
}

export default {
  state,
  actions,
  getters,
  mutations
}
