const express = require('express')
const TodoService = require('../services/TodoService')

const router = express.Router()

router.post('/create', async (req, res) => {
    const todoService  = new TodoService(req.app.locals.db)
    const result = await todoService.saveTodo(req.body)
    res.status(result.status).send(result.body)
})

router.get('', async (req, res) => {
    const todoService = new TodoService(req.app.locals.db)
    const result = await todoService.retrieveAllTodos()
    res.status(result.status).send(result.body)
})

router.delete('/remove/:todoId', async (req, res) => {
    const todoService = new TodoService(req.app.locals.db)
    const result = await todoService.removeOneTodo(req.params.todoId)
    res.status(result.status).send(result.body)
})

module.exports = { todosRouter: router }