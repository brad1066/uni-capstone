import { SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export const SupabaseContext = createContext<{
    supabase: SupabaseClient
}>({
  supabase: new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')
})

export const useSupabase = () => {
  return useContext(SupabaseContext)
}