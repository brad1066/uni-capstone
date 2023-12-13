'use client'

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
        {children}
      </SupabaseProvider>
    </AuthProvider>
  </ThemeProvider>
}
