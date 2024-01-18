
'use client'

import TeacherDashboard from '@/components/TeacherDashboard'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user)
        await validateLoggedIn?.().then(({ loggedIn }) => {
          if (!loggedIn) router.replace('/login')
        })
      setLoading(false)
    })()
  }, [])

  return <>
    {!loading && user?.role === 'admin' && <h1>Admin Dashboard</h1>}
    {!loading && user?.role === 'teacher' && <TeacherDashboard user={user} />}
    {!loading && user?.role === 'student' && <h1>Student Dashboard</h1>}
  </>
}
