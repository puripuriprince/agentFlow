import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import agentRoutes from './routes/agentRoutes'

// Load environment variables
config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/agents', agentRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
