import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
})

export const Task = mongoose.model('Task', TaskSchema)
