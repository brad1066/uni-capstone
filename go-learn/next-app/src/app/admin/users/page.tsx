'use client'


import AdminUserItem from "@/components/admin/AdminUserItem";
import NewUserForm from "@/components/forms/NewUserForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { newUser } from "@/dummy-api/user";
import users from "@/dummy-data/users";
import { useAuth } from "@/hooks/useAuth";
import { TUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, validateLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filter, setFilter] = useState<string | undefined>()

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
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
        <h1 className="mb-[1rem] flex gap-[1rem] items-center">Users
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="secondary">New<PlusIcon className="ml-1"/></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New User</DialogTitle></DialogHeader>
              <NewUserForm disabled={loading || formDisabled} submitUser={async (user: TUser) => {
                setFormDisabled(true)
                const createdUser = await newUser(user)
                console.log(createdUser)
                setFormDisabled(false)
                router.push(`/users/${createdUser.username}`)
                setDialogOpen(false)
              }} />
            </DialogContent>
          </Dialog>
        </h1>
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
