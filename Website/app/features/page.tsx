import { Brain, Zap, Code, Lock, Rocket, Cpu } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8">Features</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Brain}
              title="Frontier Intelligence"
              description="Powered by a mix of purpose-built and frontier models, AgentForge is smart and fast."
            />
            <FeatureCard
              icon={Zap}
              title="Natural Language Control"
              description="Edit and control your agents using simple natural language commands."
            />
            <FeatureCard
              icon={Lock}
              title="Privacy First"
              description="Your data stays private. AgentForge is SOC 2 certified."
            />
            <FeatureCard
              icon={Code}
              title="Customizable Agents"
              description="Build and customize AI agents for your specific needs and use cases."
            />
            <FeatureCard
              icon={Rocket}
              title="Rapid Deployment"
              description="Deploy your AI agents quickly and easily with our streamlined process."
            />
            <FeatureCard
              icon={Cpu}
              title="Advanced Learning Capabilities"
              description="Our agents continuously learn and improve based on your interactions and feedback."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
      <Icon className="h-8 w-8 mb-4 text-gradient" />
      <h3 className="text-xl font-bold mb-2 relative z-10">{title}</h3>
      <p className="text-white/60 font-mono relative z-10">{description}</p>
    </div>
  )
}

