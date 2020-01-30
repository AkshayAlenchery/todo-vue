const express = require('express')
const Router = express.Router()
const listController = require('../controllers/list.controller')
/**
 * Create a new list
 */
Router.post('/', listController.createList)

/**
 * Load all lists
 */
Router.get('/', listController.loadAllList)

/**
 * Delete a list
 */
Router.delete('/:listId', listController.deleteList)

/**
 * Update a list
 */
Router.put('/:listId', listController.updateList)

module.exports = Router
