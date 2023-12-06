'use client'

import { getCourse, removeCourseModule } from "@/actions/courseActions"
import AdminCourseItem from "@/components/admin/AdminCourseItem"
import AdminModuleItem from "@/components/admin/AdminModuleItem"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useAuth } from "@/hooks/useAuth"
import prisma from "@/lib/db"
import { Course, Module } from "@prisma/client"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


type SingleCourseAdminPageProps = {
  params: { course_id: string }
}

export default function SingleCourseAdminPage({ params: { course_id } }: SingleCourseAdminPageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course & {
    modules: Module[] | null
  }>()

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
        const course = await getCourse(parseInt(course_id), ['modules'])
        console.log(course)
        if (course) {
          setCourse(course);
        }
      }
      setLoading(false)
    })()
  }, [user, course_id])

  return (<>
    {!loading && course && <>
      <h1 className="mb-[2rem]">{course.title}</h1>
      <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
        <Card className="w-full xl:w-1/2">
          <CardHeader>Course Details</CardHeader>
          <CardContent>
            Description: <p className="inline-block">`{course.description}`</p>
          </CardContent>
        </Card>
        <Card className="w-full xl:w-1/2">
          <CardHeader className="flex flex-row items-center gap-2; space-y-0">Modules
            <Dialog>
              <DialogTrigger asChild><Button className="ml-auto">Add</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add existing Module</DialogTitle></DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button>New</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Module</DialogTitle></DialogHeader>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ul>
              {course?.modules?.map(module => <AdminModuleItem module={module} onDelete={async () => {
                const resp = await removeCourseModule(course.id, module.id)
                if (resp) {
                  setCourse(await getCourse(course.id, ['modules']))
                }
              }} />)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}
