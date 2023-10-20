'use client'


import AdminCourseItem from "@/components/admin/AdminCourseItem";
import courses from "@/dummy-data/courses";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursesAdminPage() {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
    setLoading(false)
  }, [])

  return (
    <>
      {(!loading && user?.role != 'admin') && <>
        Sorry, but you cannot access this resource. <Link href='/'>Go Home</Link>
      </>}
      {!loading && user?.role == 'admin' && <>
        <h1 className="mb-[1rem]">All Courses</h1>
        {courses?.length > 0 && <div className="grid grid-cols-3 w-full gap-5">
          {courses.map(course => (
            <AdminCourseItem course={course} key={course.id} onDelete={async () => { }} />
          ))}
        </div>}
      </>}
    </>
  )
}
