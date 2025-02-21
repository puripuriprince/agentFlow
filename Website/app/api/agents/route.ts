import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { description } = body

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with backend service
    // For now, return a mock response
    return NextResponse.json({
      id: 'agent_' + Date.now(),
      status: 'creating',
      description
    })

  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // TODO: Implement get all agents
  return NextResponse.json({ agents: [] })
}
