"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Started using AgentForge yesterday & I'm blown away. It's how AI agents should feel. I'm completely hooked now.",
    author: "Sam Whitmore",
    role: "New Computer",
    avatar: "/placeholder.svg",
  },
  {
    quote: "The most useful AI tool that I currently use. It's fast, intuitive, and incredibly powerful.",
    author: "Josh Miller",
    role: "The Browser Company",
    avatar: "/placeholder.svg",
  },
  {
    quote: "AgentForge is hands down my biggest workflow improvement in years.",
    author: "Ben Bernard",
    role: "Instapass",
    avatar: "/placeholder.svg",
  },
  {
    quote: "After many recommendations, I finally switched to AgentForge and... wow!",
    author: "Kent C. Dodds",
    role: "Catlovers",
    avatar: "/placeholder.svg",
  },
  // Add more testimonials...
]

export function TestimonialScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const container = containerRef.current
    if (!scroller || !container) return

    let scrollInterval: NodeJS.Timeout
    let isPaused = false

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused) {
          scroller.scrollTop += 1
          if (scroller.scrollTop >= container.scrollHeight / 2) {
            scroller.scrollTop = 0
          }
        }
      }, 30)
    }

    const handleMouseEnter = () => {
      isPaused = true
    }

    const handleMouseLeave = () => {
      isPaused = false
    }

    scroller.addEventListener("mouseenter", handleMouseEnter)
    scroller.addEventListener("mouseleave", handleMouseLeave)

    startScroll()

    return () => {
      clearInterval(scrollInterval)
      scroller.removeEventListener("mouseenter", handleMouseEnter)
      scroller.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const allTestimonials = [...testimonials, ...testimonials] // Duplicate for seamless scroll

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      <div className="container px-4 md:px-6 text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Loved by world-class devs</h2>
      </div>

      <div ref={scrollerRef} className="relative h-[800px] overflow-hidden">
        <div ref={containerRef} className="absolute w-full grid grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-6">
          {allTestimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              style={{
                transform: `translateY(${Math.random() * 20}px)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="flex items-start gap-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 text-left">
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-mono text-white/80">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 h-40 w-full bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 h-40 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

