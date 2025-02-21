import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Zap, Code, Cog } from "lucide-react"

export default function CreatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <a className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 mr-2 text-gradient" />
          <span className="font-bold">AgentForge</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-gradient" href="#">
            Features
          </a>
          <a className="text-sm font-medium hover:text-gradient" href="#">
            Pricing
          </a>
          <a className="text-sm font-medium hover:text-gradient" href="#">
            Docs
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Forge Your <span className="text-gradient">AI Agent</span> with Natural Language
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Describe your ideal AI agent, and we'll build it for you. From data to deployment, we handle it all.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-gray-900 border-gray-700 text-white"
                    placeholder="Describe your AI agent..."
                    type="text"
                  />
                  <Button type="submit" className="bg-gradient hover:opacity-80 transition-opacity">
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2023 AgentForge. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:text-gradient" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:text-gradient" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}

