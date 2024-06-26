'use client'

import { getCourse } from '@/actions/courseActions'
import NotFoundPage from '@/app/not-found'
import ModuleItem from '@/components/item-cards/ModuleItem'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Course, Module, UserRole } from '~/prisma/generated/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

type ViewCoursePageProps = {
  params: {
    course_id: string
  }
}

export default function ViewCoursePage({ params: { course_id } }: ViewCoursePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [course, setCourse] = useState<Course & { modules: Module[] | null }>()
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
      {loading && <InfinitySpin color='red' />}
      {!loading && !course && <>
        <NotFoundPage />
      </>}
      {!loading && course && <>
        <h1 className="mb-4 text-center">{course?.title}</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-col gap-4">
          {/* Description Card */}
          <Card className="">
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>{course.description
              ? course.description
              : 'No description'
            }</CardContent>
          </Card>

          {/* Course Modules Card */}
          <Card className='col-span-2'>
            <CardHeader><CardTitle>Course Modules</CardTitle></CardHeader>
            <CardContent>
              {course.modules?.length ? <ul className="flex flex-row flex-wrap">
                {course?.modules?.map(module => (
                  <ModuleItem
                    key={module.id}
                    module={module}
                    className='max-w-fit min-w-sm'
                    editable={user?.role == UserRole.admin || user?.role == UserRole.teacher}
                    onClick={() => { router.push(`/view/modules/${module.id}`) }} />
                ))}
              </ul>
                : <p>This course has no modules.</p>}
            </CardContent>
          </Card>
        </div>
      </>}
    </>
  )
}