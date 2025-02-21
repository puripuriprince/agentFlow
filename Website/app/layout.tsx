import type React from "react"
import "@/styles/globals.css"
import { JetBrains_Mono } from "next/font/google"

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
