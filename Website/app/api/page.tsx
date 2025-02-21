export default function APIPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8">API Documentation</h1>
          <p className="mb-4">
            AgentForge provides a powerful API for integrating AI agents into your applications. Our API allows you to
            create, manage, and interact with AI agents programmatically.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
          <p className="mb-4">
            To get started with the AgentForge API, you'll need to sign up for an API key. Once you have your key, you
            can start making requests to our endpoints.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">API Endpoints</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>POST /agents - Create a new AI agent</li>
            <li>GET /agents - List all your AI agents</li>
            <li>GET /agents/:id - Get details of a specific agent</li>
            <li>PUT /agents/:id - Update an existing agent</li>
            <li>DELETE /agents/:id - Delete an agent</li>
            <li>POST /agents/:id/interact - Interact with an agent</li>
          </ul>
          <p className="mt-8">
            For detailed documentation and examples, please refer to our
            <a href="https://lucass-organization-91.gitbook.io/agentforge/" className="text-blue-400 hover:underline">
              {" "}
              GitBook documentation
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  )
}

