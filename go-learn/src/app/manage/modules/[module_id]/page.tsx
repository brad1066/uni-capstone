
'use client'

import { removeCourseModule } from '@/actions/courseActions'
import { getModule, removeModuleTeacher, addModuleTeacher, updateModule } from '@/actions/moduleActions'
import { removeStudentModule } from '@/actions/studentActions'
import { createUnit, deleteUnit } from '@/actions/unitActions'
import { CoursesSelectCombobox } from '@/components/forms/CoursesSelectCombobox'
import NoAccessNotice from '@/components/ui/NoAccessNotice'
import CourseItem from '@/components/item-cards/CourseItem'
import StudentItem from '@/components/item-cards/StudentItem'
import UnitListItem from '@/components/item-cards/UnitItem'
import UserItem from '@/components/item-cards/UserItem'
import { AssignTeacherModuleForm } from '@/components/forms/AssignTeacherModuleForm'
import EditModuleForm from '@/components/forms/EditModuleForm'
import NewUnitForm from '@/components/forms/NewUnitForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { Assignment, Course, Module, Student, Teacher, Unit, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AssignmentItem from '@/components/item-cards/AssignmentItem'
import { deleteAssignment } from '@/actions/assignmentActions'

type SingleModuleManagePageProps = {
  params: { module_id: string }
}

export default function SingleModuleManagePage({ params: { module_id } }: SingleModuleManagePageProps) {

  const { user, validateLoggedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [module, setModule] = useState<Module & {
    course: Course | null
    students: Student[] | null
    units: Unit[] | null
    teachers: (Teacher & { user?: User | null })[] | null
    assignments: Assignment[] | null
  }>()

  const [editModuleDetailsDialogOpen, setEditModuleDetailsDialogOpen] = useState(false)
  const [assigningCourse, setAssigningCourse] = useState<boolean>(false)
  const [creatingUnit, setCreatingUnit] = useState<boolean>(false)
  const [addingTeacher, setAddingTeacher] = useState<boolean>(false)

  const [courseSelection, setCourseSelection] = useState<string>('')

  const refreshModuleData = async () => {
    if (user && module_id) {
      const _module = await getModule(module_id, ['course', 'students', 'students.user', 'student.contactDetails', 'units', 'teachers', 'teachers.user', 'assignments'])
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
    {!loading && !(user?.role == 'admin' || user?.role == 'teacher') && <>
      <NoAccessNotice />
    </>}
    {!loading && module && <>
      <h1 className="mb-[2rem]">{module.title}</h1>
      <div className="grid gap-[2rem] w-full xl:grid-cols-2">

        {/* Module Details Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <CardTitle>Module Details</CardTitle>

            {/* Edit Module Dialog */}
            <Dialog open={editModuleDetailsDialogOpen} onOpenChange={setEditModuleDetailsDialogOpen}>
              <DialogTrigger asChild><Button className="ml-auto">Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Module</DialogTitle></DialogHeader>
                <EditModuleForm module={module} onUpdateSave={updatedModule => {
                  updateModule({ id: module.id, ...updatedModule }).then(async () => {
                    await refreshModuleData()
                    setEditModuleDetailsDialogOpen(false)
                  })
                }} />
              </DialogContent>
            </Dialog>

            {/* Enrolled Students Dialog */}
            <Dialog>
              <DialogTrigger asChild><Button>Enrolled Students</Button></DialogTrigger>
              <DialogContent className="md:min-w-[50%]">
                <DialogHeader><DialogTitle>Enrolled Students</DialogTitle></DialogHeader>
                {module?.students?.length ? <ul className="max-h-[25rem] overflow-auto flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                  {module.students?.map(student => <StudentItem editable key={student.id} student={student} onDelete={async () => {
                    await removeStudentModule(student.id, module.id)
                    await refreshModuleData()
                  }} />)}
                </ul>
                  : <>No students enrolled</>
                }
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>

            {/* Module Description */}
            <pre className="inline-block font-[inherit] whitespace-pre-wrap mb-4">{module.description || 'No Description'}</pre>

            {/* Course Information */}
            <div>
              <h2 className='flex flex-row justify-between mb-2'>Course
                {user?.role == 'admin' && <Dialog open={assigningCourse} onOpenChange={setAssigningCourse}>
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
                }
              </h2>

              {module.course?.id ? <CourseItem editable course={module.course} onDelete={async () => {
                module.course && await removeCourseModule(module.course.id, module.id)
                await refreshModuleData()
              }} /> : <p>No Course</p>
              }
            </div>
          </CardContent>
        </Card>

        {/* Teachers Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 justify-between">
            <CardTitle>Teachers</CardTitle>
            {user?.role == 'admin' && <Dialog open={addingTeacher} onOpenChange={setAddingTeacher}>
              <DialogTrigger><Button>Add Teacher</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Teacher</DialogTitle></DialogHeader>
                <AssignTeacherModuleForm onSave={async ({ id: teacherId }) => {
                  await addModuleTeacher(module.id, teacherId)
                  await refreshModuleData()
                  setAddingTeacher(false)
                }} exclude={module.teachers?.map(teacher => teacher.id)} />
              </DialogContent>
            </Dialog>}
          </CardHeader>
          <CardContent>
            {
              module?.teachers?.length ? <ul className='flex gap-2'>
                {module.teachers?.map?.(teacher => <UserItem editable key={teacher.id} user={teacher?.user as User} onDelete={async () => {
                  await removeModuleTeacher(module.id, teacher.id)
                  await refreshModuleData()
                }} />)}
              </ul>
                : <>No teachers assigned</>
            }
          </CardContent>
        </Card>

        {/* Units Card */}
        <Card className="w-full">
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
            {module.units?.length ? <ul className="flex gap-2">
              {module.units.map(unit => <>
                <UnitListItem editable key={unit.id} unit={unit} onDelete={async () => {
                  const result = await deleteUnit(unit.id)
                  if (result) await refreshModuleData()
                }} />
              </>)}
            </ul>
              : 'No Units'}
          </CardContent>
        </Card>

        {/* Assignments Card */}
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 justify-between">
            <CardTitle>Assignments</CardTitle>
            {/* Add Assignment Dialog */}
            <Dialog>
              <DialogTrigger asChild><Button>Add Assignment</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Assignment</DialogTitle></DialogHeader>
                <p>Not implemented yet</p>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {module.assignments?.length ? <ul className="flex gap-2">
              {module.assignments.map(assignment => (
                <AssignmentItem
                  key={assignment.id}
                  assignment={assignment}
                  editable={user?.role == 'admin' || user?.role == 'teacher'}
                  onDelete={async () => {
                    await deleteAssignment(assignment.id)
                    await refreshModuleData()
                  }}
                />
              ))}
            </ul>
              : 'No Assignments'}
          </CardContent>
        </Card>
      </div>
    </>}
  </>
  )
}