import { ReactNode, useState } from 'react'
import { AuthContext } from '@/hooks/useAuth'
import { User } from '~/prisma/generated/client'

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<User>()

  const login = async (username: string, password: string, rememberMe: boolean) => {
    return await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password, rememberMe
      })
    })
      .then(res => res.json())
      .then(result => {
        if (result.user) setUser(result.user)
        return result
      })
  }

  const logout = async () => {
    fetch('/api/auth', {
      method: 'DELETE'
    })
    setUser(undefined)
  }

  const validateLoggedIn = async () => {
    return fetch('/api/auth', {
      method: 'GET'
    })
      .then(async (response) => {
        const returnVal = (await response.json())
        if (returnVal.loggedIn) setUser(returnVal.user)
        return returnVal
      })
  }

  return <AuthContext.Provider value={{ user, login, logout, validateLoggedIn }}>{children}</AuthContext.Provider>
}