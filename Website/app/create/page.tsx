"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Brain, Loader2, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreationStatus {
  step: 'idle' | 'generating' | 'training' | 'deploying' | 'complete' | 'error'
  message: string
}

export default function CreatePage() {
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<CreationStatus>({ 
    step: 'idle',
    message: ''
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a description of your agent.",
        variant: "destructive",
      })
      return
    }

    try {
      // Step 1: Generate Tools
      setStatus({ 
        step: 'generating',
        message: 'Generating agent tools and code...'
      })
      
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) throw new Error("Failed to create agent")
      
      const data = await response.json()

      // Step 2: Training
      setStatus({
        step: 'training',
        message: 'Training agent with provided data...'
      })

      // Step 3: Deployment
      setStatus({
        step: 'deploying',
        message: 'Deploying agent to sandbox...'
      })

      // Complete
      setStatus({
        step: 'complete',
        message: 'Agent successfully created!'
      })

      toast({
        title: "Success",
        description: "Your agent has been created and is ready to use.",
      })
      
      // TODO: Redirect to agent detail page
      
    } catch (error) {
      setStatus({
        step: 'error',
        message: 'Failed to create agent. Please try again.'
      })
      
      toast({
        title: "Error",
        description: "Failed to create agent. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderStatusIcon = () => {
    switch (status.step) {
      case 'generating':
      case 'training':
      case 'deploying':
        return <Loader2 className="h-6 w-6 animate-spin" />
      case 'complete':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <a className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 mr-2 text-gradient" />
          <span className="font-bold">AgentForge</span>
        </a>
      </header>
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your AI Agent</CardTitle>
            <CardDescription className="text-gray-400">
              Describe your ideal AI agent in natural language. Our system will automatically generate
              the necessary tools and train the model based on your description.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="description">
                  Agent Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Example: I need an agent that can analyze financial data, identify market trends, and generate trading recommendations based on technical analysis..."
                  className="h-32 bg-gray-800 border-gray-700 text-white resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={status.step !== 'idle' && status.step !== 'error'}
                />
              </div>

              {status.step !== 'idle' && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/50">
                  {renderStatusIcon()}
                  <span className="text-sm">{status.message}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient hover:opacity-90 transition-opacity"
                disabled={status.step !== 'idle' && status.step !== 'error'}
              >
                {status.step === 'idle' || status.step === 'error' ? (
                  'Create Agent'
                ) : (
                  'Creating Agent...'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
