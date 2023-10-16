'use client'

import { AuthProvider } from "@/providers/AuthProvider"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { ReactNode } from "react"

export default ({ children }: { children: ReactNode }) => {
  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
  ><AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
}
