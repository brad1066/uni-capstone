'use client'


import { createCourse, deleteCourse, getCourses } from "@/actions/courseActions";
import AdminCourseItem from "@/components/admin/AdminCourseItem";
import NewCourseForm from "@/components/forms/NewCourseForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { Course } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesAdminPage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })

      const courses = await getCourses();
      if (courses) setCourses(courses)
      setLoading(false)
    })()
  }, [])

  return (
    <>
      {(!loading && user?.role != 'admin') && <>
        Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
      </>}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem] flex gap-[1rem] items-center">All Courses
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button variant="secondary">New<PlusIcon className="ml-1" /></Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Course</DialogTitle></DialogHeader>
              <NewCourseForm submitCourse={async course => {
                await createCourse(course)
                setDialogOpen(false)
                router.refresh()
              }} />
            </DialogContent>
          </Dialog>
        </h1>
        {courses?.length > 0 && <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full gap-5">
          {courses.map(course => (
            <AdminCourseItem course={course} key={course.id} onDelete={async () => { deleteCourse(course.id); router.refresh() }} />
          ))}
        </div>}
      </>}
    </>
  )
}
