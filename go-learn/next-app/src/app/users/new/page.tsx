'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NewUsersPage = () => {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) validateLoggedIn?.().then(({ loggedIn }) => {
      if (!loggedIn) router.push('/login')
    })
    setLoading(false)
  }, [])
  return (<>
    {
      !loading && !(user?.role == 'admin') && <>
        <h1 className="text-center my-10">You do not have the access rights to be here</h1>
        <Button onClick={router.back}>Go Back</Button>
      </>
    }

    {!loading && user && (
      <></>
    )}
  </>)
}

export default NewUsersPage