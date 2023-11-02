'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";import AdminUserItem from "@/components/admin/AdminUserItem";
import NewUserForm from "@/components/forms/NewUserForm";
import NoAccessNotice from "@/components/NoAccessNotice";
import { useAuth } from "@/hooks/useAuth";
import { TUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CreateUser as createUser, getUsers, getUsersByRole } from "@/actions/userActions";
import { User } from "@prisma/client";

export default function UsersAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, validateLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filter, setFilter] = useState<string | undefined>()
  const [users, setUsers] = useState<User[]>()

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    const allUsers = await getUsersByRole() as User[]
      await setUsers([...allUsers])
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
      {(!loading && user?.role != 'admin') && <NoAccessNotice />}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem] flex gap-[1rem] items-center">Users
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="secondary">New<PlusIcon className="ml-1" /></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New User</DialogTitle></DialogHeader>
              <NewUserForm disabled={loading || formDisabled} submitUser={async (user: TUser) => {
                setFormDisabled(true)
                const createdUser = await createUser(user)
                setFormDisabled(false)
                router.push(`/profile/${createdUser.username}`)
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
                  users && users.filter(user => user.role == 'teacher').map(user => (
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
                    users && users.filter(user => user.role == 'student').map(user => (
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
