const {
  get,
  hmset,
  incr,
  rpush,
  lrange,
  hgetall,
  hdel,
  lrem,
  hset,
  hexists
} = require('../models/todo.models')

/**
 * Create a new list
 * @param req
 * @param res
 * @return {list}
 */
const createList = async (req, res) => {
  const { listName } = req.body
  try {
    const listId = await get('listIdCntr')
    await hmset(listId, 'name', listName, 'todos', '[]')
    await rpush('listIds', listId)
    await incr('listIdCntr')
    res.status(200).json({ listId: listId, listName: listName, todos: [] })
  } catch (err) {
    res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
  }
}

/**
 * Load all lists
 * @param req
 * @param res
 * @return { all lists }
 */
const loadAllList = async (req, res) => {
  try {
    const listIds = await lrange('listIds', 0, -1)
    if (!listIds.length) return res.status(200).json({ listCount: 0, lists: [] })
    const allLists = []
    for (const listId of listIds) {
      const list = await hgetall(listId)
      list.listId = listId
      allLists.push(list)
    }
    res.status(200).json({ listCount: listIds.length, lists: allLists })
  } catch (err) {
    res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
  }
}

/**
 * Delete a list
 * @param req
 * @param res
 * @param listId
 * @return { Object }
 */
const deleteList = async (req, res) => {
  try {
    const { listId } = req.params
    let delList = await lrem('listIds', 0, listId)
    if (!delList) {
      return res.status(404).json({ error: 'The list you are looking for doesnot exist' })
    }
    delList = await hdel(listId, 'name')
    delList = await hdel(listId, 'todos')
    res.status(200).json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
  }
}

/**
 * Update a list using list id
 * @param req
 * @param res
 * @param listId
 * @return { list }
 */
const updateList = async (req, res) => {
  try {
    const { listId } = req.params
    const { name } = req.body
    let list = await hexists(listId, 'name')
    if (!list) {
      return res.status(404).json({ error: 'The list you are looking for doesnot exist' })
    }
    list = await hset(listId, 'name', name)
    list = await hgetall(listId)
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json({ error: 'There was an error while connecting. Please try again later' })
  }
}
module.exports = { createList, loadAllList, deleteList, updateList }
