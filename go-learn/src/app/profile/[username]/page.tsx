'use client'

import { updateUser } from "@/actions/userActions"
import UserEditForm from "@/components/forms/UserEditForm"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { User } from "@prisma/client"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProfilePage = () => {

  const { toast } = useToast()

  const { user: signedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(signedInUser)
  const [updated, setUpdated] = useState(false)

  const userUpdateSuccess = () => toast({ title: "Updated", description: "Your details have been updated"})
  const userUpdateFailed = () => toast({
    title: "Not updated",
    description: "There was an issue updating your account details",
    variant: "destructive",
    action: <ToastAction altText="Try again" onClick={() => user && updateUser(user)}>Try again</ToastAction>
  })

  useEffect(() => {
    (async () => {
      if (!signedInUser) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    setUser(signedInUser)
  }, [signedInUser])

  useEffect(() => {
    if (!updated && !loading && user != signedInUser) setUpdated(true)
  }, [user])

  return <>
    <h1 className="mb-[2rem]">Hi {signedInUser?.forename} {signedInUser?.surname}</h1>
    <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
      <UserEditForm user={user as User} setUser={setUser} onUpdateSave={(user) => {
        if (updated) updateUser(user).then(validateLoggedIn).then(userUpdateSuccess).then(() => { setUpdated(false) }).catch(userUpdateFailed)
      }} />
    </div>
  </>
}

export default ProfilePage