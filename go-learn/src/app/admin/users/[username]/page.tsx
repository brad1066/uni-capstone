'use client'

import NoAccessNotice from "@/components/NoAccessNotice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getTeacher } from "@/dummy-api/teachers"
import { getUser } from "@/dummy-api/user"
import { useAuth } from "@/hooks/useAuth"
import { TTeacher, TUser } from "@/lib/types"
import { ChevronDownIcon, ChevronUpIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type UserAdminPageProps = {
  params: { username: string }
}

export default function UserAdminPage({ params: { username } }: UserAdminPageProps) {

  const { user: loggedInUser, validateLoggedIn } = useAuth()
  const router = useRouter()
  const urlParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<TUser>()
  const [teacher, setTeacher] = useState<TTeacher>()

  const [nameEntryOpen, setNameEntryOpen] = useState(false)
  const [addressEntryOpen, setAddressEntryOpen] = useState(false)

  useEffect(() => {
    (async () => {
      if (!loggedInUser) await validateLoggedIn?.().then(({ loggedIn }) => {
        if (!loggedIn) router.replace('/login')
      })
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const user = await getUser(username)
      setUser(user)
      if (user?.role === 'teacher') {
        setTeacher(await getTeacher(username))
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
        <h1 className="mb-[2rem]">{user.username}</h1>
        <div className="flex gap-[2rem] w-full">
          {/* User Data Card */}
          <Card className="flex-1">
            <CardHeader><CardTitle>User data</CardTitle></CardHeader>
            <CardContent>
              <ul>
                <li className="hover:bg-accent">Username <span>{user.username}</span></li>
                <li className="hover:bg-accent">Password <Button>Change Password <Pencil2Icon className="ml-1" /></Button></li>
                <li className="flex-col items-start">
                  Name
                  <Collapsible
                    open={nameEntryOpen}
                    onOpenChange={setNameEntryOpen}
                    className="newUserNameEntries space-y-4"
                  >
                    <div className="alwaysShown">
                      {/* Name's 'title' input */}
                      <Input placeholder="title" value={user.title} onChange={({ target: { value: title } }) => (setUser(user => ({ ...user, title })))} />

                      {/* Name's 'forename' input */}
                      <Input placeholder="forename" value={user.forename} onChange={({ target: { value: forename } }) => (setUser(user => ({ ...user, forename })))} />

                      {/* Name's 'surname' input */}
                      <Input placeholder="surname" value={user.surname} onChange={({ target: { value: surname } }) => (setUser(user => ({ ...user, surname })))} />

                      {/* The trigger to show/hide the extra fields */}
                      <CollapsibleTrigger asChild>
                        <Button type="button" aria-label="edit toggle for middle names and end of name letters">
                          {nameEntryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    {/* Name's 'middleNames' and 'letters' inputs */}
                    <CollapsibleContent className="grid grid-cols-2 gap-x-4">
                      {/* Name's 'middleNames' input */}
                      <Label className="flex flex-col gap-4">Middle names
                        <Input placeholder="middle names" value={user.middleNames} onChange={({ target: { value: middleNames } }) => (setUser(user => ({ ...user, middleNames })))} />
                      </Label>

                      {/* Name's 'letters' input */}
                      <Label className="flex flex-col gap-4">Letters
                        <Input placeholder="letters" value={user.letters} onChange={({ target: { value: letters } }) => (setUser(user => ({ ...user, letters })))} />
                      </Label>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
                <li>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Contact's 'email' input */}
                    <Label className="flex-1 flex flex-col gap-4">Email
                      <Input type="email" placeholder="email" />
                    </Label>

                    {/* Contact's 'mobile' input */}
                    <Label className="flex-1 flex flex-col gap-4">Mobile
                      <Input placeholder="mobile" />
                    </Label>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Teacher Info Card */}
          {teacher && <Card className="flex-1">
            <CardHeader><CardTitle>Teacher data</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-[1rem]">

            </CardContent>
          </Card>}
        </div>
      </>}
    </>}

  </>)
}