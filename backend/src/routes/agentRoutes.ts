import { Router } from 'express'
import * as agentController from '../controllers/agentController'

const router = Router()

router.post('/', agentController.createAgent)
router.get('/', agentController.getAgents)
router.get('/:id', agentController.getAgentById)

export default router
