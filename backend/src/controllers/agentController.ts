import { Request, Response } from 'express'
import * as llmService from '../services/llmService'

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { description } = req.body

    if (!description) {
      return res.status(400).json({ error: 'Description is required' })
    }

    // Generate agent tools using LLM with enhanced prompt
    const enhancedPrompt = llmService.enhancePrompt(description)
    const tools = await llmService.generateAgentTools(enhancedPrompt)

    // Validate generated code
    const validTools = tools.filter(tool => llmService.validateGeneratedCode(tool.code))

    if (validTools.length === 0) {
      return res.status(422).json({ 
        error: 'Failed to generate valid tools. Please try again with a different description.' 
      })
    }

    // Create initial agent record
    const agent = {
      id: `agent_${Date.now()}`,
      description,
      status: 'creating',
      tools: validTools,
      createdAt: new Date()
    }

    // TODO: Save agent to database
    
    return res.status(201).json(agent)
  } catch (error) {
    console.error('Error creating agent:', error)
    return res.status(500).json({ 
      error: 'Failed to create agent',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getAgents = async (req: Request, res: Response) => {
  try {
    // TODO: Implement fetching agents from database
    return res.json({ agents: [] })
  } catch (error) {
    console.error('Error fetching agents:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const getAgentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    // TODO: Implement fetching agent by ID from database
    return res.json({ message: 'Not implemented yet' })
  } catch (error) {
    console.error('Error fetching agent:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
