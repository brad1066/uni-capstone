'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/providers/AuthProvider'
import { SupabaseProvider } from '@/providers/SupabaseProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ReactNode } from 'react'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
  ><AuthProvider>
      <SupabaseProvider>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </SupabaseProvider>
    </AuthProvider>
  </ThemeProvider>
}
