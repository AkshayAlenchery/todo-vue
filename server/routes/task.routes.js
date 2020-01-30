const express = require('express')
const Router = express.Router()
const taskController = require('../controllers/task.controller')

/**
 * Load all tasks of a list
 */
Router.get('/:listId', taskController.getAllTasks)

/**
 * Create a new task
 */
Router.post('/:listId', taskController.createNewTask)

/**
 * Update a task
 */
Router.put('/:listId', taskController.updateTask)

/**
 * Update a task
 */
Router.delete('/:listId', taskController.deleteTask)

module.exports = Router
