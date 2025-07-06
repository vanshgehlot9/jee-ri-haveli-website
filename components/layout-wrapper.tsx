"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"



function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show header on admin pages
  const showHeader = !pathname?.startsWith('/admin')

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  )
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <HeaderWrapper>{children}</HeaderWrapper>
  )
} 