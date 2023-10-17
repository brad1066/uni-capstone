'use client'

import NewUserForm from "@/components/forms/NewUserForm"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { newUser } from "@/dummy-api/user"
import { useAuth } from "@/hooks/useAuth"
import { TUser } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NewUsersPage = () => {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formDisabled, setFormDisabled] = useState(false)

  useEffect(() => {
    if (!user) validateLoggedIn?.().then(({ loggedIn }) => {
      if (!loggedIn) router.push('/login')
      setLoading(false)
    })
  }, [])
  return (<>
  {loading && <Skeleton className="h-[10rem] w-[10rem] rounded-full mt-[10rem]" />}
    {
      !loading && !(user?.role == 'admin') && <>
        <h1 className="text-center my-10">You do not have the access rights to be here</h1>
        <Button onClick={router.back}>Go Back</Button>
      </>
    }

    {!loading && user && (
      <>
        <h1 className="mb-[2rem]">Create a User</h1>
        <NewUserForm disabled={loading || formDisabled} submitUser={(user: TUser) => {
          setFormDisabled(true)
          console.log(newUser(user))
          setFormDisabled(false)
        }} />
      </>
    )}
  </>)
}

export default NewUsersPage