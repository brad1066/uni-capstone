/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createStudentAddress, createTeacherAddress, updateAddress, updateAddresses } from '@/actions/addressActions'
import { addStudentCourse, addStudentModule, getStudent, removeStudentCourse, removeStudentModule } from '@/actions/studentActions'
import { getTeacher } from '@/actions/teacherActions'
import { getUser, updateUser } from '@/actions/userActions'
import NoAccessNotice from '@/components/NoAccessNotice'
import ResourcesAuthoredCard from '@/components/ResourcesAuthoredCard'
import AdminCourseItem from '@/components/admin/AdminCourseItem'
import AdminModuleItem from '@/components/admin/AdminModuleItem'
import { AssignStudentCourseForm } from '@/components/forms/AssignStudentCourseForm'
import { AssignStudentModuleForm } from '@/components/forms/AssignStudentModuleForm'
import EditAddressForm from '@/components/forms/EditAddressForm'
import EditStudentAddressForm from '@/components/forms/EditStudentAddressForm'
import EditUserForm from '@/components/forms/EditUserForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { EMPTY_ADDRESS } from '@/lib/utils'
import { Address, Contact, Course, Module, Student, Teacher, User } from '@prisma/client'
import { ToastAction } from '@radix-ui/react-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type UserAdminPageProps = {
  params: { username: string }
}

export default function UserAdminPage({ params: { username } }: UserAdminPageProps) {

  const { toast } = useToast()

  const { user: loggedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const urlParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User & {contactDetails?: Contact | null}>()
  const [homeAddress, setHomeAddress] = useState<Address>(EMPTY_ADDRESS)
  const [termAddress, setTermAddress] = useState<Address>(EMPTY_ADDRESS)
  const [teacher, setTeacher] = useState<Teacher & { address: Address | null } | undefined>()
  const [student, setStudent] = useState<(Student & {
    modules?: Module[] | null,
    enrolledCourse?: Course | null,
    homeAddress?: Address | null,
    termAddress?: Address | null
  }) | undefined>()
  const [initialUser, setInitialUser] = useState<User & {contactDetails?: Contact | null}>()

  const [addressEntryOpen, setAddressEntryOpen] = useState<boolean>(false)

  const [addingCourse, setAddingCourse] = useState<boolean>(false)
  const [addingModule, setAddingModule] = useState<boolean>(false)

  const userUpdateSuccess = () => toast({ title: 'Updated', description: 'Your details have been updated' })
  const userUpdateFailed = () => toast({
    title: 'Not updated',
    description: 'There was an issue updating your account details',
    variant: 'destructive',
    action: <ToastAction altText="Try again" onClick={() => user && updateUser(user)}>Try again</ToastAction>
  })

  useEffect(() => {
    (async () => {
      if (!loggedInUser) await validateLoggedIn?.().then(async ({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })

      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const user = await getUser(username, ['contactDetails'])
      setUser(user as User & {contactDetails?: Contact | null})
      // Use of initialUser state allows stops the initial definition of user at runtime on client
      await setUser(user => { setInitialUser(user); return user })
      if (user?.role == 'teacher') {
        const teacher = await getTeacher(username, ['address'])
        await setTeacher(teacher)
        setHomeAddress(teacher?.address ?? EMPTY_ADDRESS)
      }
      if (user?.role == 'student') {
        const student = await getStudent(username, ['homeAddress', 'termAddress', 'enrolledCourse', 'modules'])
        setHomeAddress(student?.homeAddress ?? EMPTY_ADDRESS)
        setTermAddress(student?.termAddress ?? EMPTY_ADDRESS)
        await setStudent(student)
      }
    })()

  }, [urlParams])

  return (<>
    {!loading && !(loggedInUser?.role == 'admin') && <>
      <NoAccessNotice />
    </>}
    {!loading && loggedInUser?.role == 'admin' && <>
      {!user && <>
        {username} could not be found in the database. <Button variant={'secondary'} onClick={router?.back}>Go Back</Button>
      </>}
      {user && <>
        <h1 className="mb-[2rem]">{initialUser?.title} {initialUser?.forename} {initialUser?.surname}</h1>
        <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
          {/* User Data Card */}
          <EditUserForm user={user} setUser={setUser} onUpdateSave={async (user) => {
            if (!user) return
            console.log(user)
            updateUser(user as User)
              .then(validateLoggedIn)
              .then(userUpdateSuccess)
              .then(() => { setInitialUser(user) })
              .catch(userUpdateFailed)

          }} canEdit />

          {user.role == 'admin' && <Card className="flex-1">
            <CardHeader><CardTitle>Admin actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}

          {/* Teacher Info Card */}
          {user.role == 'teacher' && <Card className="flex-1">
            <CardHeader><CardTitle>
              <Dialog open={addressEntryOpen} onOpenChange={setAddressEntryOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Edit Address</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Edit Address</DialogTitle></DialogHeader>
                  <EditAddressForm address={homeAddress} setAddress={setHomeAddress} />
                  <DialogFooter>
                    <Button onClick={async () => {
                      if (!teacher) return
                      if (!teacher.addressId) { await createTeacherAddress(teacher.id, homeAddress) }
                      else { await updateAddress(homeAddress) }

                      setAddressEntryOpen(false)
                    }}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">
              <ResourcesAuthoredCard author={user} className="border-none shadow-none" />
            </CardContent>
          </Card>}

          {/* Student Info Card */}
          {student && <Card className="flex flex-col flex-1">
            <CardHeader><CardTitle>
              <Dialog open={addressEntryOpen} onOpenChange={setAddressEntryOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Edit Address</Button></DialogTrigger>
                <DialogContent className="md:min-w-[45rem]">
                  <DialogHeader><DialogTitle>Edit Address</DialogTitle></DialogHeader>
                  <EditStudentAddressForm homeAddress={homeAddress} setHomeAddress={setHomeAddress} termAddress={termAddress} setTermAddress={setTermAddress} />
                  <DialogFooter>
                    <Button onClick={async () => {
                      if (!student) return
                      if (!student.homeAddressId) { await createStudentAddress(student.id, homeAddress, true) }
                      if (!student.termAddressId) { await createStudentAddress(student.id, termAddress, false) }

                      let updatedAddresses: Address[] = []
                      if (student.homeAddressId) updatedAddresses = [...updatedAddresses, homeAddress]
                      if (student.termAddressId) updatedAddresses = [...updatedAddresses, termAddress]
                      updateAddresses(updatedAddresses)

                      setAddressEntryOpen(false)
                    }}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">
              {
                student?.enrolledCourse
                  ? <AdminCourseItem course={student.enrolledCourse} onDelete={async () => {
                    const updatedStudent = await removeStudentCourse(student.id)
                    if (updatedStudent) setStudent({ ...student, ...updatedStudent })
                  }} />
                  : <span className="flex flex-row items-center justify-center">
                    This student is not enrolled on a course
                    <Dialog open={addingCourse} onOpenChange={setAddingCourse}>
                      <DialogTrigger asChild>
                        <Button className="ml-auto">Enrol on Course</Button></DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Enrol on Course</DialogTitle></DialogHeader>
                        <AssignStudentCourseForm student={student} onSave={async (course: Course) => {
                          const updatedStudent = await addStudentCourse(student.id, course.id)
                          if (updatedStudent) setStudent({ ...student, ...updatedStudent })
                          setAddingCourse(false)
                        }} />
                      </DialogContent>
                    </Dialog>
                  </span>
              }
              {student?.modules?.length == 0 && <p>This student is not enrolled on any modules</p>}
              {student?.modules && student.modules.length > 0 && <>
                <h3>Modules</h3>
                <div className="flex flex-col gap-2">
                  {student.modules.map((module) => {
                    return <>
                      <AdminModuleItem module={module} onDelete={async () => {
                        const updatedStudent = await removeStudentModule(student.id, module.id)
                        if (updatedStudent) setStudent({ ...student, ...updatedStudent })
                      }} />
                    </>
                  })}
                </div>
              </>}
            </CardContent>

            <CardFooter className="mt-auto">
              <Dialog open={addingModule} onOpenChange={setAddingModule}>
                <DialogTrigger asChild>
                  <Button className="ml-auto w-full">Add module</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Module</DialogTitle></DialogHeader>
                  <AssignStudentModuleForm student={student} exclude={student.modules?.map?.(module=> module.id)} onSave={async (module: Module) => {
                    const updatedStudent = await addStudentModule(student.id, module.id)
                    if (updatedStudent) setStudent({ ...student, ...updatedStudent })
                    setAddingModule(false)
                  }} />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>}
        </div>
      </>}
    </>}

  </>)
}