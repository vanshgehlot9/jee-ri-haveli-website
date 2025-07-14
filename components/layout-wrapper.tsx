"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer";


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
    <HeaderWrapper>
      <div className="pt-20 md:pt-24">{children}</div>
      <Footer />
    </HeaderWrapper>
  );
} 