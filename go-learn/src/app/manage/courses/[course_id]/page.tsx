
'use client'

import { addCourseModule, getCourse, removeCourseModule, updateCourse } from '@/actions/courseActions'
import { createModule } from '@/actions/moduleActions'
import { removeStudentCourse } from '@/actions/studentActions'
import { ModulesSelectCombobox } from '@/components/forms/ModulesSelectCombobox'
import NoAccessNotice from '@/components/ui/NoAccessNotice'
import ModuleItem from '@/components/item-cards/ModuleItem'
import StudentItem from '@/components/item-cards/StudentItem'
import EditCourseForm from '@/components/forms/EditCourseForm'
import NewModuleForm from '@/components/forms/NewModuleForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Course, Module, Student } from '@prisma/client'
import { DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


type SingleCourseManagePageProps = {
  params: { course_id: string }
}

export default function SingleCourseManagePage({ params: { course_id } }: SingleCourseManagePageProps) {
  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState<Course & {
    modules: Module[] | null
    students: Student[] | null
  }>()
  const [editCourseDialogOpen, setEditCourseDialogOpen] = useState(false)
  const [addingModuleDialogOpen, setAddingModuleDialogOpen] = useState(false)
  const [newModuleDialogOpen, setNewModuleDialogOpen] = useState(false)

  const [newModuleId, setNewModuleId] = useState<string>('')

  const refreshCourseData = async () => {
    if (user && course_id) {
      const course = await getCourse(course_id, ['modules', 'students', 'students.user', 'student.contactDetails'])
      if (course) setCourse(course)
    }
  }

  useEffect(() => {
    (async () => {
      if (!user) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
    })()
  }, [])

  useEffect(() => {
    (async () => {
      if (user?.role != 'admin') router.replace(`/view/courses/${course_id}`)
      refreshCourseData()
      setLoading(false)
    })()
  }, [user, course_id])

  return (<>
    {!loading && !(user?.role == 'admin') && <>
      <NoAccessNotice />
    </>}
    {!loading && (user?.role == 'admin') && course && <>
      <h1 className="mb-[2rem]">{course.title}</h1>
      <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
        <Card className="w-full xl:w-1/2">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Course Details</CardTitle>
            <Dialog open={editCourseDialogOpen} onOpenChange={setEditCourseDialogOpen}>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Course</DialogTitle></DialogHeader>
                <EditCourseForm course={course} onUpdateSave={updatedCourse => {
                  updateCourse({ id: course.id, ...updatedCourse }).then(async () => {
                    await refreshCourseData()
                    setEditCourseDialogOpen(false)
                  })
                }} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button>Enrolled Students</Button></DialogTrigger>
              <DialogContent className="md:min-w-[50%]">
                <DialogHeader><DialogTitle>Enrolled Students</DialogTitle></DialogHeader>
                {
                  course?.students?.length ? (
                    <ul className="max-h-[25rem] overflow-auto flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                      {course.students?.map(student => <StudentItem editable key={student.id} student={student} onDelete={async () => {
                        await removeStudentCourse(student.id)
                        await refreshCourseData()
                      }} />)}
                    </ul>
                  ) : <>No students enrolled</>
                }
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <pre className="inline-block font-[inherit] whitespace-pre-line">{course.description || 'No Description'}</pre>
          </CardContent>
        </Card>
        <Card className="w-full xl:w-1/2">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Modules</CardTitle>

            {/* Add Existing Module */}
            <Dialog open={addingModuleDialogOpen} onOpenChange={setAddingModuleDialogOpen}>
              <DialogTrigger asChild><Button className="ml-auto">Add</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add existing Module</DialogTitle></DialogHeader>
                Pick a module to add to this course:
                <ModulesSelectCombobox unassignedOnly value={newModuleId} setValue={setNewModuleId} exclusions={course.modules?.map(mod => mod.id)} />
                <DialogFooter>
                  <Button className="ml-auto" onClick={async () => {
                    if (newModuleId !== '') {
                      await addCourseModule(course.id, newModuleId)
                      await refreshCourseData()
                      setNewModuleId('')
                      setAddingModuleDialogOpen(false)
                    }
                  }}>Add</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Create new Module for course */}
            <Dialog open={newModuleDialogOpen} onOpenChange={setNewModuleDialogOpen}>
              <DialogTrigger asChild><Button>New</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Module</DialogTitle></DialogHeader>
                <NewModuleForm courseId={course.id} submitModule={async (module) => {
                  await createModule(module, course.id)
                  await refreshCourseData()
                  setNewModuleDialogOpen(false)
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <ul>
              {course?.modules?.map(module => <ModuleItem editable key={module.id} module={module} onDelete={async () => {
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
