'use client'

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, validateLoggedIn, logout } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) validateLoggedIn?.().then(({loggedIn}) => {
      if (!loggedIn) router.push('/login')
    })
  setLoading(false)
  }, [])
  return (
    <>
    </>
  )
}
