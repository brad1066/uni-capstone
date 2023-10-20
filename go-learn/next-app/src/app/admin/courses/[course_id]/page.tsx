'use client'

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function CoursesAdminPage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
    setLoading(false)
  }, [])
}