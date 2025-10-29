import React from "react"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
