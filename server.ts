import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks', taskRoutes)

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL

if (!MONGO_URL) {
  throw new Error('❌ MONGO_URL no está definida')
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('✅ Conectado a MongoDB')
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
    )
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err))
