import { User } from './../../prisma/generated/client'
import { createContext, useContext } from 'react'

export const AuthContext = createContext<{
    user?: User,
    login?: (username: string, password: string, rememberMe: boolean) => Promise<{ user?: User, success: boolean, message?: string }>,
    logout?: () => Promise<void>,
    validateLoggedIn?: () => Promise<{ loggedIn: boolean, user?: User }>
      }>({})

export const useAuth = () => {
  return useContext(AuthContext)
}