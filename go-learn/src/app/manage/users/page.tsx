/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import AdminUserItem from '@/components/admin/AdminUserItem'
import NewUserForm from '@/components/forms/NewUserForm'
import NoAccessNotice from '@/components/NoAccessNotice'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createUser as createUser, deleteUser, getUsersByRole } from '@/actions/userActions'
import { Contact, User } from '@prisma/client'
import { AlertDialog, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogCancel, AlertDialogContent, AlertDialogAction } from '@/components/ui/alert-dialog'

export default function UsersAdminPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, validateLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filter, setFilter] = useState<string | undefined>()
  const [users, setUsers] = useState<User[]>()
  const [userToDelete, setUserToDelete] = useState<User>()
  const [userDeleteConfirmOpen, setUserDeleteConfirmOpen] = useState<boolean>(false)

  const confirmUserDelete = (user: User) => {
    setUserToDelete(user)
    setUserDeleteConfirmOpen(true)
  }

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
            <DialogTrigger asChild><Button variant="outline" className="bg-accent">New<PlusIcon className="ml-1" /></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New User</DialogTitle></DialogHeader>
              <NewUserForm disabled={loading || formDisabled} submitUser={async (user: User & {contactDetails: Contact}) => {
                setFormDisabled(true)
                const createdUser = await createUser(user)
                setFormDisabled(false)
                router.push(`/profile/${createdUser.username}`)
                setDialogOpen(false)
              }} />
            </DialogContent>
          </Dialog>
        </h1>
        {users ? <div className={cn('w-full', !filter ? 'grid md:grid-cols-2 gap-[1rem]' : '')}>
          {(!filter || filter == 'teachers') && <Card>
            <CardHeader>Teachers</CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-[1rem]">
                {
                  users.filter(user => user.role == 'teacher').map((user: User) => (
                    <AdminUserItem user={user} key={user.username} onDelete={async () => { confirmUserDelete(user) }} />
                  ))
                }
                {
                  users.filter(user => user.role == 'teacher').length == 0 && 'No teachers found'
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
                      <AdminUserItem user={user} key={user.username} onDelete={async () => { confirmUserDelete(user) }} />
                    ))
                  }
                  {
                    users.filter(user => user.role == 'student').length == 0 && 'No students found'
                  }
                </ul>
              </CardContent>
            </Card>
          }
        </div> : 'No users found'
        }
      </>
      }
      {
        userToDelete && <AlertDialog open={userDeleteConfirmOpen} onOpenChange={setUserDeleteConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogHeader>Confirm user deletion</AlertDialogHeader>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the account
                and remove their data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={async () => { await deleteUser(userToDelete); router.replace('/manage/users') }}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </>
  )
}
