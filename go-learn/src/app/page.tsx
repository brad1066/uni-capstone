
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserRole } from '~/prisma/generated/client'
import TeacherDashboard from './(dashboard)/TeacherDashboard'
import StudentDashboard from './(dashboard)/StudentDashboard'

export default function Dashboard() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) { setLoading(false); return }
    validateLoggedIn?.()
      .then(({ loggedIn }) => { if (!loggedIn) { router.replace('/login') } })
      .finally(() => setLoading(false))
  }, [])

  return <>

    {!loading && user?.role === UserRole.admin && <h1>Admin Dashboard</h1>}
    {!loading && user?.role === UserRole.teacher && <TeacherDashboard user={user} />}
    {!loading && user?.role === UserRole.student && <StudentDashboard user={user} />}
  </>
}
