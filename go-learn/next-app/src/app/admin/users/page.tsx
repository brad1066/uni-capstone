'use client'


import AdminUserItem from "@/components/admin/AdminUserItem";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import users from "@/dummy-data/users";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, validateLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string | undefined>()

  useEffect(() => {
    if (!user) validateLoggedIn?.().then(({ loggedIn }) => {
      if (!loggedIn) router.replace('/login')
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    setFilter(searchParams?.get('filter') as string)
    setLoading(false)
  }, [searchParams])

  return (
    <>
      {(!loading && user?.role != 'admin') && <>
        Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
      </>}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem]">Users</h1>
        <div className={cn('w-full', !filter ? `grid grid-cols-2 gap-x-[1rem]` : '')}>
          {(!filter || filter == 'teachers') && <Card>
            <CardHeader>Teachers</CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-[1rem]">
                {
                  users.filter(user => user.role == 'teacher').map(user => (
                    <AdminUserItem user={user} key={user.username} onDelete={async () => { }} />
                  ))
                }
              </ul>
            </CardContent>
          </Card>
          }
          {(!filter || filter == 'students') &&
            <Card>
              <CardHeader>Students</CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-[1rem]">
                  {
                    users.filter(user => user.role == 'student').map(user => (
                      <AdminUserItem user={user} key={user.username} onDelete={async () => { }} />
                    ))
                  }
                </ul>
              </CardContent>
            </Card>
          }
        </div>

      </>
      }
    </>
  )
}
