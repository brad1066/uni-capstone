import { TUser } from "@/lib/types"
import { createContext, useContext } from "react"

export const AuthContext = createContext<{
    user?: TUser,
    login?: (username: string, password: string, rememberMe: boolean) => Promise<{ user?: TUser, success: boolean, message?: string }>,
    logout?: () => Promise<void>,
    validateLoggedIn?: () => Promise<{loggedIn: Boolean, user?: TUser}>
}>({})

export const useAuth = () => {
    return useContext(AuthContext)
}