import axios from 'axios'

interface Tool {
  name: string
  description: string
  code: string
}

interface OpenRouterResponse {
  choices: {
    message: {
      content: string
    }
  }[]
}

export async function generateAgentTools(description: string): Promise<Tool[]> {
  try {
    const prompt = `
You are an expert AI developer. Generate the necessary tools and code for an AI agent based on this description:

${description}

Provide your response in the following JSON format:
{
  "tools": [
    {
      "name": "tool_name",
      "description": "What this tool does",
      "code": "The actual implementation"
    }
  ]
}

Make sure the code is complete, properly formatted, and ready to use.
`

    const response = await axios.post<OpenRouterResponse>(
      process.env.OPENROUTER_URL!,
      {
        model: "deepseek-ai/deepseek-coder-33b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://agentforge.ai",
          "X-Title": "AgentForge"
        }
      }
    )

    const content = response.data.choices[0].message.content
    const parsedTools = JSON.parse(content)

    return parsedTools.tools
  } catch (error) {
    console.error('Error generating tools:', error)
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data)
    }
    throw new Error('Failed to generate agent tools')
  }
}

// Helper function to validate generated code
export function validateGeneratedCode(code: string): boolean {
  try {
    // Basic validation - check if it's valid JavaScript/TypeScript
    new Function(code)
    return true
  } catch (error) {
    console.error('Invalid generated code:', error)
    return false
  }
}

// Function to enhance the prompt based on specific requirements
export function enhancePrompt(description: string): string {
  return `
Create an AI agent with the following capabilities:
${description}

Requirements:
1. Code should be in TypeScript
2. Include proper error handling
3. Follow best practices for async operations
4. Include JSDoc documentation
5. Implement logging for debugging

Please provide implementation details and any necessary setup instructions.
`
}