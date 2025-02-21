import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import Image from "next/image"
import { TestimonialScroller } from "@/components/testimonial-scroller"

const companies = [
  {
    name: "Rizzify",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "ClosedAI",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "Skibidi",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "Best",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "Mid",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "Mosaic",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "InstaCode",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
  {
    name: "Ramp",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com//placeholder.svg",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-white/10 bg-black/50 backdrop-blur-md fixed w-full z-[100]">
        <a className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 mr-2 text-gradient" />
          <span className="font-bold font-mono">AgentForge</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/features" className="text-sm font-medium hover:text-gradient">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-gradient">
            Pricing
          </Link>
          <Link
            href="https://lucass-organization-91.gitbook.io/agentforge/"
            className="text-sm font-medium hover:text-gradient"
          >
            Docs
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative flex flex-col justify-start mx-auto gap-6 pt-12 h-[80vh] max-w-[1808px] overflow-hidden rounded-2xl text-center md:justify-between md:gap-12 md:px-6 md:pt-20">
          {/* Gradient Background */}
          <div
            className="pointer-events-none absolute left-0 top-0 bg-cover bg-center w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom right, 
                rgba(76, 29, 149, 0.8),
                rgba(124, 58, 237, 0.8),
                rgba(236, 72, 153, 0.8),
                rgba(234, 179, 8, 0.8)
              )`,
            }}
          />

          {/* Noise Overlay */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50"
            style={{
              backgroundImage: `url('/noise.png')`,
              backgroundSize: "125px 125px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-4 md:px-0 mt-20">
            <h1 className="text-[clamp(3.625rem,1.6250rem+8.3333vw,9.625rem)] font-semibold leading-[0.85] md:leading-[clamp(4.563rem,3.0289rem+5.1136vw,7.938rem)] -tracking-[0.04em] text-balance">
              The AI
              <br className="md:hidden" /> Agent Builder
            </h1>
            <p className="font-mono text-base/[1.25rem] md:text-[1.5rem]/[1.6875rem] text-balance whitespace-pre-line mt-6">
              Built to make you extraordinarily productive, AgentForge is the best way to create agents.
            </p>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-80 w-full bg-gradient-to-b from-transparent to-black" />
        </div>

        {/* Trusted By Section */}
        <section className="relative z-10 w-full py-20 -mt-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-white/80 font-mono text-xl mb-16">TRUSTED BY ENGINEERS AT</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
              {companies.map((company, i) => (
                <div key={i} className="h-12 w-32 relative grayscale opacity-70 hover:opacity-100 transition-opacity">
                  <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Build agents faster</h2>
                <p className="text-white/60 font-mono">
                  Intelligent, fast, and familiar, AgentForge is the best way to create AI agents.
                </p>
              </div>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                See more features
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Frontier Intelligence</h3>
                <p className="text-white/60 font-mono relative z-10">
                  Powered by a mix of purpose-built and frontier models, AgentForge is smart and fast.
                </p>
              </div>
              <div className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Natural Language Control</h3>
                <p className="text-white/60 font-mono relative z-10">
                  Edit and control your agents using simple natural language commands.
                </p>
              </div>
              <div className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Privacy First</h3>
                <p className="text-white/60 font-mono relative z-10">
                  Your data stays private. AgentForge is SOC 2 certified.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialScroller />

        <section className="w-full py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-5xl font-bold mb-8">Try AgentForge Now</h2>
            <Link href="/create">
              <Button
                size="lg"
                className="bg-gradient text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg"
              >
                Download for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-mono text-sm mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-white/60 hover:text-white text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/60 hover:text-white text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-white/60 hover:text-white text-sm">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://lucass-organization-91.gitbook.io/agentforge/"
                    className="text-white/60 hover:text-white text-sm"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-white/60 hover:text-white text-sm">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-white text-sm">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/60 hover:text-white text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-white/60 hover:text-white text-sm">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/60 hover:text-white text-sm">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-white/60 hover:text-white text-sm">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-white/60 text-sm">© 2024 AgentForge. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                GitHub
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

