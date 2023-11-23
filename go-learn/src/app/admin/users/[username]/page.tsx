'use client'

import { createTeacherAddress, getTeacherAddress, updateAddress } from "@/actions/addressActions"
import { createContactForUser, getContact, updateContact } from "@/actions/contactActions"
import { getStudent } from "@/actions/studentActions"
import { getTeacher } from "@/actions/teacherActions"
import { getUser, updateUser } from "@/actions/userActions"
import NoAccessNotice from "@/components/NoAccessNotice"
import ResourcesAuthoredCard from "@/components/ResourcesAuthoredCard"
import EditAddressForm from "@/components/forms/EditAddressForm"
import UserEditForm from "@/components/forms/UserEditForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { EMPTY_ADDRESS, EMPTY_CONTACT } from "@/lib/utils"
import { Address, Contact, Student, Teacher, User } from "@prisma/client"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserAdminPageProps = {
  params: { username: string }
}

export default function UserAdminPage({ params: { username } }: UserAdminPageProps) {

  const { toast } = useToast()

  const { user: loggedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const urlParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS)
  const [teacher, setTeacher] = useState<Teacher>()
  const [student, setStudent] = useState<Student>()
  const [initialUser, setInitialUser] = useState<User | undefined>()

  const [addressEntryOpen, setAddressEntryOpen] = useState<boolean>(false)
  const [newAddress, setNewAddress] = useState<boolean>(false)

  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT)

  const userUpdateSuccess = () => toast({ title: "Updated", description: "Your details have been updated" })
  const userUpdateFailed = () => toast({
    title: "Not updated",
    description: "There was an issue updating your account details",
    variant: "destructive",
    action: <ToastAction altText="Try again" onClick={() => user && updateUser(user)}>Try again</ToastAction>
  })

  useEffect(() => {
    (async () => {
      if (!loggedInUser) await validateLoggedIn?.().then(async ({ loggedIn, user }) => {
        if (!loggedIn) router.replace('/login')
      })

      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const user = await getUser(username)
      // Use of initialUser state allows stops the initial definition of user at runtime on client
      await setUser(() => { setInitialUser(user); return user })
      if (user) setContact(await getContact(user.contactId ?? -1) ?? EMPTY_CONTACT)
      if (user?.role == 'teacher') {
        const teacher = await getTeacher(username)
        await setTeacher(teacher)

        const address = await getTeacherAddress(teacher?.addressId ?? -1)
        if (!address) setNewAddress(true)
        setAddress(address ?? EMPTY_ADDRESS)
      }
      if (user?.role == 'student') {
        await setStudent(await getStudent(username))
      }
    })()

  }, [urlParams])

  return (<>
    {!loading && !(loggedInUser?.role == 'admin') && <>
      <NoAccessNotice />
    </>}
    {!loading && loggedInUser?.role == 'admin' && <>
      {!user && <>
        {username} could not be found in the database. <Button variant={"secondary"} onClick={router?.back}>Go Back</Button>
      </>}
      {user && <>
        <h1 className="mb-[2rem]">{initialUser?.title} {initialUser?.forename} {initialUser?.surname}</h1>
        <div className="flex gap-[2rem] w-full flex-col xl:flex-row">
          {/* User Data Card */}
          <UserEditForm user={user} setUser={setUser} contact={contact} setContact={setContact} onUpdateSave={async (user) => {
            updateUser(user).then(async (user) => {
              if (user?.contactId == null) {
                const newContact = await createContactForUser(contact, user?.username)
                if (newContact?.id && user) await setUser(user => ({...(user as User), contactId: newContact.id}))
              }
              else if (user?.contactId) await updateContact(contact)
            })
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
                  <EditAddressForm address={address} setAddress={setAddress} />
                  <DialogFooter>
                    <Button onClick={async () => {
                      if (teacher && newAddress) { await createTeacherAddress(teacher.id, address) }
                      if (teacher && !newAddress) { await updateAddress(address) }

                      setAddressEntryOpen(false)
                    }}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">
              <ResourcesAuthoredCard author={user} className="border-none shadow-none"/>
            </CardContent>
          </Card>}

          {/* Student Info Card */}
          {student && <Card className="flex-1">
            <CardHeader><CardTitle>Student data</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}
        </div>
      </>}
    </>}

  </>)
}