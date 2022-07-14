const router = require('express').Router()
const Todo = require('../../models/Todo')

router.get('/', async (req, res) => {
    try {
        const todoList = await Todo.find()
        if (!todoList) throw new Error('No Todo List Found')
        res.status(200).json(todoList)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body)
    try {
        const todo = await newTodo.save()
        if (!todo) throw new Error('Something went wrong when saving')
        res.status(200).json(todo)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const removed = await Todo.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong when deleting')
        res.status(200).json(removed)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router