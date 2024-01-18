'use client'

import { getCourse } from '@/actions/courseActions'
import NotFoundPage from '@/app/not-found'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Course, Module } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type ViewCoursePageProps = {
  params: {
    course_id: string
  }
}

export default function ViewCoursePage({ params: { course_id } }: ViewCoursePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [course, setCourse] = useState<Course & {modules: Module[] | null}>()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      await getCourse(course_id, ['modules']).then(course => setCourse(course))
    })().finally(() => setLoading(false))
  }, [])

  return (
    <>
      {!loading && !course && <>
        <NotFoundPage />
      </>}
      {!loading && course && <>
        <h1 className="mb-4">{course?.title}</h1>
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Description Card */}
          <Card className="">
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>{course.description
              ? course.description
              : 'No description'
            }</CardContent>
          </Card>

          {/* Course Modules Card */}
          <Card className="xl:col-span-2">
            <CardHeader><CardTitle>Course Modules</CardTitle></CardHeader>
            <CardContent>
              <ul className="">
                {course?.modules?.map(module => <li key={module.id}>{module.title}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}