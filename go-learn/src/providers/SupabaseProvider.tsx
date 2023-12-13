// SupabaseProvider.tsx
import { SupabaseContext } from '@/hooks/useSupabase'
import { ReactNode, useContext } from 'react'

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {

  const context = useContext(SupabaseContext)
  const supabase = context.supabase

  return <SupabaseContext.Provider value={{ supabase }}>{children}</SupabaseContext.Provider>
}