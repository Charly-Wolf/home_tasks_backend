import express from 'express'
import { Task } from '../models/Task'

const router = express.Router()

router.get('/', async (_, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

router.post('/', async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text })
    await newTask.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { done: req.body.done },
      { new: true }
    )
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Tarea eliminada' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' })
  }
})

export default router
