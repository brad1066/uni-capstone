'use client'

import { getCourse } from "@/actions/courseActions"
import { useAuth } from "@/hooks/useAuth"
import { Course } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


type SingleCourseAdminPageProps = {
  params: { course_id: string }
}

export default function SingleCourseAdminPage({params: {course_id}}:SingleCourseAdminPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course>()

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    if (user && course_id) {
      const course = await getCourse(parseInt(course_id))
      if (course) {
        setCourse(course);
      }
    }
      setLoading(false)
    })()
  }, [])

  return (<>
  {course && <span>{course.title}</span>}
  </>)
}