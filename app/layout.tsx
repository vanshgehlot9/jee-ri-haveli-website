import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "@/components/layout-wrapper"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jee Ri Haveli - Heritage Hotel",
  description: "Experience the grandeur of Rajasthani heritage with modern luxury and comfort at Jee Ri Haveli",
      generator: 'v0.dev',
  verification: {
    google: 'google0b7391e86ddbcffe',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" async />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
