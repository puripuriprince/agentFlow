export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8">About AgentForge</h1>
          <p className="mb-4">
            AgentForge was created by a passionate Computer Science student with a vision to democratize AI agent
            creation. Our platform empowers developers and businesses to build, customize, and deploy AI agents with
            ease.
          </p>
          <p className="mb-4">
            We believe in the power of AI to transform industries and improve lives. Our mission is to make AI agent
            technology accessible to everyone, from individual developers to large enterprises.
          </p>
          <p>
            AgentForge is constantly evolving, driven by the latest advancements in AI and machine learning. We're
            committed to providing cutting-edge tools and features to our users, ensuring they stay at the forefront of
            AI technology.
          </p>
        </div>
      </main>
    </div>
  )
}

