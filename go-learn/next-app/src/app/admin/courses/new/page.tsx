'use client'

import NewCourseForm from "@/components/forms/NewCourseForm"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminNewCoursePage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
  }, [])

  return (<>
    {!loading && <>
      <NewCourseForm className="w-[30rem]" submitCourse={async course => {
        console.log(course)
      }}/>
    </>}
  </>)
}