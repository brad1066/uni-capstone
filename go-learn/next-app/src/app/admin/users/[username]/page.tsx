'use client'

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserAdminPage () {

    const {user, validateLoggedIn} = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (!user) validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
        setLoading(false)
      })
    }, [])
    return (<>
    </>)
}