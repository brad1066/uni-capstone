'use client'

import { getCourse } from "@/actions/courseActions"
import { useAuth } from "@/hooks/useAuth"
import { Course } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


type SingleCourseAdminPageProps = {
  params: { course_id: string }
}

export default function SingleCourseAdminPage({ params: { course_id } }: SingleCourseAdminPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course>()

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      console.log(user, course_id)
      if (user && course_id) {
        const course = await getCourse(parseInt(course_id))
        console.log(course)
        if (course) {
          setCourse(course);
        }
      }
      setLoading(false)
    })()
  }, [user, course_id])

  return (<>
    {!loading && course && <h1>{course.title}</h1>}
  </>)
}