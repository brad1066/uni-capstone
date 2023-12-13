/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { removeCourseModule } from '@/actions/courseActions'
import { getModule, updateModule } from '@/actions/moduleActions'
import { removeStudentModule } from '@/actions/studentActions'
import { createUnit, deleteUnit } from '@/actions/unitActions'
import { CoursesSelectCombobox } from '@/components/CoursesSelectCombobox'
import AdminCourseItem from '@/components/admin/AdminCourseItem'
import AdminStudentListItem from '@/components/admin/AdminStudentListItem'
import AdminUnitListItem from '@/components/admin/AdminUnitListItem'
import EditModuleForm from '@/components/forms/EditModuleForm'
import NewUnitForm from '@/components/forms/NewUnitForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Course, Module, Student, Unit } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type SingleModuleAdminPageProps = {
  params: { module_id: string }
}

export default function SingleModuleAdminPage({ params: { module_id } }: SingleModuleAdminPageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [module, setModule] = useState<Module & {
    course: Course | null
    students: Student[] | null
    units: Unit[] | null
  }>()

  const [assigningCourse, setAssigningCourse] = useState<boolean>(false)
  const [courseSelection, setCourseSelection] = useState<number>(-1)

  const [creatingUnit, setCreatingUnit] = useState<boolean>(false)

  const refreshModuleData = async () => {
    if (user && module_id) {
      const _module = await getModule(parseInt(module_id), ['course', 'students', 'students.user', 'student.contactDetails', 'units'])
      if (_module) {
        setModule(_module)
      }
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
      refreshModuleData()
      setLoading(false)
    })()
  }, [user, module_id])

  return (<>
    {!loading && module && <>
      <h1 className="mb-[2rem]">{module.title}</h1>
      <div className="grid gap-[2rem] w-full xl:grid-cols-2">

        {/* Module Details Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Module Details</CardTitle>
            <Dialog>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Module</DialogTitle></DialogHeader>
                <EditModuleForm module={module} onUpdateSave={updatedModule => {
                  updateModule({ id: module.id, ...updatedModule }).then(async () => {
                    await refreshModuleData()
                  })
                }} />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild><Button>Enrolled Students</Button></DialogTrigger>
              <DialogContent className="md:min-w-[50%]">
                <DialogHeader><DialogTitle>Enrolled Students</DialogTitle></DialogHeader>
                <ul className="max-h-[25rem] overflow-auto flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                  {module.students?.map(student => <AdminStudentListItem key={student.id} student={student} onDelete={async () => {
                    await removeStudentModule(student.id, module.id)
                    await refreshModuleData()
                  }} />)}
                </ul>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <pre className="inline-block font-[inherit] whitespace-pre">{module.description || 'No Description'}</pre>
          </CardContent>
        </Card>

        {/* Course Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Course</CardTitle>
            <Dialog open={assigningCourse} onOpenChange={setAssigningCourse}>
              <DialogTrigger asChild><Button className="ml-auto">{module.course?.id ? 'Reassign' : 'Assign'}</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Assign Course</DialogTitle></DialogHeader>
                Pick a course to assign this module to:
                <CoursesSelectCombobox value={courseSelection} setValue={setCourseSelection} />
                <DialogFooter>
                  <Button className="ml-auto" onClick={async () => {
                    if (module.course?.id == courseSelection) return
                    module?.courseId && await removeCourseModule(module.courseId, module.id)
                    const newModule: Module = {
                      id: module.id,
                      title: module.title,
                      description: module.description,
                      websiteURL: module.description,
                      courseId: courseSelection,
                    }
                    await updateModule(newModule)
                    await refreshModuleData()
                    setAssigningCourse(false)
                  }}>Assign</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {module.course?.id ? <AdminCourseItem course={module.course} onDelete={async () => {
              module.course && await removeCourseModule(module.course.id, module.id)
              await refreshModuleData()
            }} /> : <p>No Course</p>
            }
          </CardContent>
        </Card>

        {/* Units Card */}
        <Card className="w-full xl:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Units</CardTitle>
            {/* Add Unit Dialog */}
            <Dialog open={creatingUnit} onOpenChange={setCreatingUnit}>
              <DialogTrigger asChild><Button className="ml-auto">Add Unit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Unit</DialogTitle></DialogHeader>
                <NewUnitForm moduleId={module.id} onSubmit={async (unit) => {
                  if (unit) {
                    await createUnit(unit)
                    await refreshModuleData()
                  }
                  setCreatingUnit(false)
                }} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {module.units?.length ? <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
              {module.units.map(unit => <>
                <AdminUnitListItem key={unit.id} unit={unit} onDelete={async () => {
                  const result = await deleteUnit(unit.id)
                  if (result) await refreshModuleData()
                }} />
              </>)}
            </ul>
              : 'No Units'}
          </CardContent>
        </Card>
      </div>
    </>}
  </>)
}