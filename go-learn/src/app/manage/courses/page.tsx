'use client'

import { createCourse, deleteCourse, getCourses } from '@/actions/courseActions'
import NoAccessNotice from '@/components/ui/NoAccessNotice'
import CourseItem from '@/components/item-cards/CourseItem'
import NewCourseForm from '@/components/forms/NewCourseForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Course, UserRole } from '~/prisma/generated/client'
import { PlusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function CoursesManagePage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])

  const refreshCourses = async () => {
    setLoading(true)
    getCourses()
      .then(courses => courses && setCourses(courses))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user) { refreshCourses() }
    else validateLoggedIn?.()
      .then(({ loggedIn }) => !loggedIn && router.replace('/login'))
      .then(refreshCourses)
  }, [])

  return (
    <>
      <h1 className="mb-[1rem] flex gap-4 items-center">All Courses
        {!loading && <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button variant="secondary" className='bg-card border shadow'>New<PlusIcon className="ml-1" /></Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Course</DialogTitle></DialogHeader>
            <NewCourseForm submitCourse={async course => {
              course && createCourse(course)
                .then(() => setDialogOpen(false))
                .then(refreshCourses)
            }} />
          </DialogContent>
        </Dialog>}
      </h1>
      {loading && <InfinitySpin color='red'/>}
      {(!loading && user?.role != UserRole.admin) && <NoAccessNotice />}
      {!loading && user?.role == UserRole.admin && <>
        {courses?.length > 0 && <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full gap-5">
          {courses.map(course => (
            <CourseItem
              key={course.id}
              course={course}
              className='bg-card'
              editable
              onDelete={async () => { deleteCourse(course.id).then(refreshCourses) }} />
          ))}
        </div>}
      </>}
    </>
  )
}
