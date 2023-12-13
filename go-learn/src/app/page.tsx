/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user)
        await validateLoggedIn?.().then(({ loggedIn }) => {
          if (!loggedIn) router.replace('/login')
        })
      setLoading(false)
    })()
  }, [])

  return <></>
}
