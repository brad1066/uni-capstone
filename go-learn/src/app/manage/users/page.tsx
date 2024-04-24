'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import UserItem from '@/components/item-cards/UserItem'
import NewUserForm from '@/components/forms/NewUserForm'
import NoAccessNotice from '@/components/ui/NoAccessNotice'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createUser as createUser, deleteUser, getUsersByRole } from '@/actions/userActions'
import { Contact, User, UserRole } from '~/prisma/generated/client'
import { AlertDialog, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogCancel, AlertDialogContent, AlertDialogAction } from '@/components/ui/alert-dialog'
import { InfinitySpin } from 'react-loader-spinner'

export default function UsersManagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, validateLoggedIn } = useAuth()
  const [loading, setLoading] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [filter, setFilter] = useState<UserRole>(UserRole.unassigned)
  const [users, setUsers] = useState<User[]>()
  const [userToDelete, setUserToDelete] = useState<User>()
  const [userDeleteConfirmOpen, setUserDeleteConfirmOpen] = useState<boolean>(false)

  const confirmUserDelete = (user: User) => {
    setUserToDelete(user)
    setUserDeleteConfirmOpen(true)
  }

  // When the search params is changed, check auth and get users
  useEffect(() => {
    setLoading(true)
    !user && validateLoggedIn?.()
      .then(({ loggedIn }) => !loggedIn && router.replace('/login'))

    // Get users by role (all if no filter), set the filter state and stop loading
    getUsersByRole(filter != UserRole.unassigned ? [filter] as UserRole[] : undefined)
      .then((allUsers) => { allUsers && setUsers([...allUsers]) })
      .then(() => setFilter(searchParams?.get('filter') as UserRole || UserRole.unassigned))
      .finally(() => setLoading(false))
  }, [searchParams])

  return (
    <>
      {loading && <InfinitySpin color='primary'/>}
      {(!loading && user?.role != UserRole.admin) && <NoAccessNotice />}
      {!loading && user?.role == UserRole.admin && <>
        <h1 className="mb-[1rem] flex gap-4 items-center">Users
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="outline" className="bg-card border shadow">New<PlusIcon className="ml-1" /></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New User</DialogTitle></DialogHeader>
              <NewUserForm
                disabled={loading || formDisabled}
                submitUser={async (user: User & { contactDetails: Contact }) => {
                  setFormDisabled(true)
                  createUser(user)
                    .then(createdUser => {
                      setFormDisabled(false)
                      if (createdUser) { router.push(`/manage/users/${createdUser.username}`) }
                      setDialogOpen(false)
                    })
                }} />
            </DialogContent>
          </Dialog>
        </h1>
        {users ? <div className={cn('w-full', filter == UserRole.unassigned ? 'grid md:grid-cols-2 gap-4' : '')}>
          {(filter == UserRole.unassigned || filter == UserRole.teacher) && <Card>
            <CardHeader>Teachers</CardHeader>
            <CardContent>
              <ul className={cn('grid grid-cols-1 gap-4', filter != UserRole.teacher ? 'flex flex-wrap flex-row' : '')}>
                {
                  users.filter(user => user.role == UserRole.teacher).map((user: User) => (
                    <UserItem
                      key={user.username}
                      user={user}
                      editable
                      onDelete={async () => { confirmUserDelete(user) }} />
                  ))
                }
                {
                  users.filter(user => user.role == UserRole.teacher).length == 0 && 'No teachers found'
                }
              </ul>
            </CardContent>
          </Card>
          }
          {(filter == UserRole.unassigned || filter == UserRole.student) &&
            <Card>
              <CardHeader>Students</CardHeader>
              <CardContent>
                <ul className={cn('grid grid-cols-1 gap-4', filter == UserRole.student ? 'flex flex-wrap flex-row' : '')}>
                  {
                    users && users.filter(user => user.role == UserRole.student).map(user => (
                      <UserItem
                        key={user.username}
                        user={user}
                        editable
                        onDelete={async () => { confirmUserDelete(user) }} />
                    ))
                  }
                  {
                    users.filter(user => user.role == UserRole.student).length == 0 && 'No students found'
                  }
                </ul>
              </CardContent>
            </Card>
          }
          {(filter == UserRole.unassigned || filter == UserRole.admin) &&
            <Card>
              <CardHeader>Admin</CardHeader>
              <CardContent>
                <ul className={cn('grid grid-cols-1 gap-4', filter == UserRole.admin ? 'flex flex-wrap flex-row' : '')}>
                  {
                    users && users.filter(user => user.role == UserRole.admin).map(user => (
                      <UserItem
                        key={user.username}
                        user={user}
                        editable
                        onDelete={async () => { confirmUserDelete(user) }} />
                    ))
                  }
                  {
                    users.filter(user => user.role == UserRole.admin).length == 0 && 'No admin found'
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
              <AlertDialogAction onClick={async () => {
                deleteUser(userToDelete.username)
                  .then(() => setUsers(users => users?.filter(user => user.username != userToDelete.username)))
              }}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    </>
  )
}
