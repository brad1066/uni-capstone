'use client'

import { getStudent } from "@/actions/studentActions"
import { getTeacher } from "@/actions/teacherActions"
import { changePassword, getUser, updateUser } from "@/actions/userActions"
import NoAccessNotice from "@/components/NoAccessNotice"
import UserEditForm from "@/components/forms/UserEditForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { TStudent, TTeacher, TUser } from "@/lib/types"
import { User } from "@prisma/client"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserAdminPageProps = {
  params: { username: string }
}

export default function UserAdminPage({ params: { username } }: UserAdminPageProps) {

  const { toast } = useToast()

  const { user: loggedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const urlParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const [teacher, setTeacher] = useState<TTeacher>()
  const [student, setStudent] = useState<TStudent>()
  const [initialUser, setInitialUser] = useState<User | undefined>()

  const [userUpdated, setUserUpdated] = useState(false)

  const userUpdateSuccess = () => toast({ title: "Updated", description: "Your details have been updated" })
  const userUpdateFailed = () => toast({
    title: "Not updated",
    description: "There was an issue updating your account details",
    variant: "destructive",
    action: <ToastAction altText="Try again" onClick={() => user && updateUser(user)}>Try again</ToastAction>
  })

  useEffect(() => {
    (async () => {
      if (!loggedInUser) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const user = await getUser(username)
      // Use of initialUser state allows stops the initial definition of user at runtime on client
      setUser(() => { setInitialUser(user); return user })

      console.log
      if (user?.role == 'teacher') {
        setTeacher(await getTeacher(username))
      }
      if (user?.role == 'student') {
        setStudent(await getStudent(username))
      }
    })()

  }, [urlParams])

  useEffect(() => {
    if (!userUpdated && !loading && user != initialUser) setUserUpdated(true)
  }, [user])

  return (<>
    {!loading && !(loggedInUser?.role == 'admin') && <>
      <NoAccessNotice />
    </>}
    {!loading && loggedInUser?.role == 'admin' && <>
      {!user && <>
        {username} could not be found in the database. <Button variant={"secondary"} onClick={router?.back}>Go Back</Button>
      </>}
      {user && <>
        <h1 className="mb-[2rem]">{user?.title} {user.forename} {user.surname}</h1>
        <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
          {/* User Data Card */}
          <UserEditForm user={user as User} setUser={setUser} onUpdateSave={(user) => {
            if (userUpdated) updateUser(user).then(validateLoggedIn).then(userUpdateSuccess).then(() => { setUserUpdated(false) }).catch(userUpdateFailed)
          }} />

          {user.role == 'admin' && <Card className="flex-1">
            <CardHeader><CardTitle>Admin actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}

          {/* Teacher Info Card */}
          {user.role == 'teacher' && <Card className="flex-1">
            <CardHeader><CardTitle>Teacher data</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}

          {/* Student Info Card */}
          {student && <Card className="flex-1">
            <CardHeader><CardTitle>Student data</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}
        </div>
      </>}
    </>}

  </>)
}