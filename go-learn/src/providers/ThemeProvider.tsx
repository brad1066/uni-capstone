'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import React, { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [mounted])
  // if (!mounted) return null
  // return <p>{mounted ? 'mounted' : 'not mounted'}</p>
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}